"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uEnergy;
  uniform float uMode;
  uniform float uShellOpacity;
  uniform vec2 uPointer;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vWave;

  void main() {
    float slowTime = uTime * 0.42;
    float waveA = sin(position.y * 5.0 + slowTime * 1.2 + uPointer.x);
    float waveB = sin(position.x * 7.0 - slowTime + position.z * 3.0);
    float waveC = cos((position.x + position.y) * 4.2 + slowTime * 0.7 + uPointer.y);
    float wave = (waveA + waveB * 0.55 + waveC * 0.35) / 2.0;
    float displacement = wave * (0.024 + uMode * 0.024) * uEnergy;
    vec3 transformed = position + normal * displacement;

    vec4 world = modelMatrix * vec4(transformed, 1.0);
    vWorldPosition = world.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vWave = wave;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uEnergy;
  uniform float uMode;
  uniform float uShellOpacity;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vWave;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 2.35);
    float contour = smoothstep(0.2, 0.92, sin(vWave * 8.0 + uTime * 0.2) * 0.5 + 0.5);
    vec3 shadow = vec3(0.018, 0.014, 0.042);
    vec3 violet = vec3(0.31, 0.23, 0.78);
    vec3 pearl = vec3(0.79, 0.75, 1.0);
    vec3 color = mix(shadow, violet, fresnel * 0.82 + contour * (0.045 + uMode * 0.035));
    color = mix(color, pearl, pow(fresnel, 5.0) * (0.4 + uMode * 0.055));
    color *= 0.82 + uEnergy * 0.24;
    float alpha = (0.72 + fresnel * 0.25) * uShellOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;

const innerVertexShader = /* glsl */ `
  varying vec3 vLocalPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vLocalPosition = position;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const innerFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uEnergy;
  uniform float uLightStrength;
  uniform float uOpacity;

  varying vec3 vLocalPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 normalDirection = normalize(vWorldNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 lightDirection = normalize(vec3(-0.42, 0.38, 0.82));

    float lightFacing = max(dot(normalDirection, lightDirection), 0.0);
    float viewFacing = max(dot(normalDirection, viewDirection), 0.0);
    float rim = pow(1.0 - viewFacing, 2.7);
    float halo = pow(lightFacing, 6.0);
    float hotSpot = pow(lightFacing, 28.0);
    float textureWave = sin(vLocalPosition.y * 11.0 + uTime * 0.22)
      * sin(vLocalPosition.x * 9.0 - uTime * 0.16)
      * sin(vLocalPosition.z * 13.0 + uTime * 0.11);
    float pulse = 0.96 + sin(uTime * 0.72) * 0.04;

    vec3 shadow = vec3(0.043, 0.031, 0.094);
    vec3 body = vec3(0.247, 0.180, 0.510);
    vec3 energy = vec3(0.545, 0.470, 0.965);
    vec3 lavender = vec3(0.835, 0.800, 1.0);
    vec3 pearl = vec3(0.980, 0.973, 1.0);

    float bodyLight = smoothstep(0.05, 0.88, lightFacing);
    vec3 color = mix(shadow, body, bodyLight * 0.9);
    color = mix(color, energy, (halo * 0.42 + rim * 0.24) * uEnergy);
    color += energy * textureWave * 0.025;
    color += energy * halo * (0.035 + uLightStrength * 0.16);
    color = mix(color, lavender, halo * uLightStrength * 1.9);
    color = mix(color, pearl, hotSpot * min(uLightStrength * 4.2, 0.76));
    color *= pulse * (0.98 + uEnergy * 0.08);

    gl_FragColor = vec4(color, uOpacity);
  }
`;

const ORBIT_RADIUS = 1.48;
const ORBIT_ARC = Math.PI * 1.55;

const routeModes: Record<string, number> = {
  home: 0.25,
  about: 0,
  portfolio: 2.4,
  stack: 3.2,
  contact: 1.1,
};

const routeVisuals: Record<string, {
  coreScale: number;
  coreLight: number;
  coreOpacity: number;
  shellOpacity: number;
  particleOpacity: number;
  particleScale: number;
  particleSize: number;
  ringOpacity: number;
  networkOpacity: number;
  wireOpacity: number;
}> = {
  home: { coreScale: 0.76, coreLight: 0.27, coreOpacity: 0.96, shellOpacity: 0.88, particleOpacity: 0.1, particleScale: 1, particleSize: 0.012, ringOpacity: 0.1, networkOpacity: 0.01, wireOpacity: 0.035 },
  about: { coreScale: 0.5, coreLight: 0.13, coreOpacity: 0.74, shellOpacity: 0.36, particleOpacity: 0.025, particleScale: 0.88, particleSize: 0.009, ringOpacity: 0.025, networkOpacity: 0, wireOpacity: 0.015 },
  portfolio: { coreScale: 0.34, coreLight: 0.1, coreOpacity: 0.66, shellOpacity: 0.56, particleOpacity: 0.95, particleScale: 1.22, particleSize: 0.02, ringOpacity: 0.08, networkOpacity: 0.2, wireOpacity: 0.15 },
  stack: { coreScale: 0.46, coreLight: 0.17, coreOpacity: 0.83, shellOpacity: 0.48, particleOpacity: 0.12, particleScale: 1.04, particleSize: 0.011, ringOpacity: 0.34, networkOpacity: 0.055, wireOpacity: 0.25 },
  contact: { coreScale: 0.68, coreLight: 0.24, coreOpacity: 0.9, shellOpacity: 0.72, particleOpacity: 0.16, particleScale: 1.06, particleSize: 0.014, ringOpacity: 0.12, networkOpacity: 0.025, wireOpacity: 0.06 },
};

class CoreErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function StaticSystemCore() {
  return (
    <div className="system-core-static" aria-hidden="true">
      <div className="core-atmosphere" />
      <div className="core-orbit core-orbit-a" />
      <div className="core-shell" />
      <div className="core-light" />
      <div className="core-noise" />
    </div>
  );
}

function CoreObject({
  route,
  transitioning,
  reduced,
  pointer,
  quality,
}: {
  route: string;
  transitioning: boolean;
  reduced: boolean;
  pointer: React.RefObject<[number, number]>;
  quality: "high" | "low";
}) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.ShaderMaterial>(null);
  const innerCore = useRef<THREE.Mesh>(null);
  const innerMaterial = useRef<THREE.ShaderMaterial>(null);
  const particleField = useRef<THREE.Points>(null);
  const particles = useRef<THREE.PointsMaterial>(null);
  const network = useRef<THREE.LineBasicMaterial>(null);
  const wire = useRef<THREE.MeshBasicMaterial>(null);
  const orbit = useRef<THREE.Group>(null);
  const orbitMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const orbitNodes = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
  const mode = routeModes[route] ?? 1;
  const visual = routeVisuals[route] ?? routeVisuals.home;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uEnergy: { value: 1 },
    uMode: { value: 0 },
    uShellOpacity: { value: routeVisuals.home.shellOpacity },
    uPointer: { value: new THREE.Vector2() },
  }), []);

  const innerUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uEnergy: { value: 1 },
    uLightStrength: { value: routeVisuals.home.coreLight },
    uOpacity: { value: routeVisuals.home.coreOpacity },
  }), []);

  const particlePositions = useMemo(() => {
    const count = quality === "low" ? 440 : 900;
    const positions = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;
      const variance = 1.31 + ((index * 17) % 19) * 0.003;
      positions[index * 3] = Math.cos(theta) * radius * variance;
      positions[index * 3 + 1] = y * variance;
      positions[index * 3 + 2] = Math.sin(theta) * radius * variance;
    }

    return positions;
  }, [quality]);

  const networkPositions = useMemo(() => {
    const segmentCount = quality === "low" ? 44 : 82;
    const positions = new Float32Array(segmentCount * 6);
    const pointCount = particlePositions.length / 3;

    for (let index = 0; index < segmentCount; index += 1) {
      const from = (index * 29) % pointCount;
      const to = (from + 17 + (index % 7) * 11) % pointCount;
      positions.set(particlePositions.subarray(from * 3, from * 3 + 3), index * 6);
      positions.set(particlePositions.subarray(to * 3, to * 3 + 3), index * 6 + 3);
    }

    return positions;
  }, [particlePositions, quality]);

  useFrame((state, delta) => {
    if (
      !group.current || !shell.current || !innerCore.current || !innerMaterial.current ||
      !particleField.current || !particles.current || !network.current || !wire.current ||
      !orbit.current || !orbitMaterial.current
    ) return;

    const time = reduced ? 1.4 : state.clock.elapsedTime;
    const targetEnergy = transitioning ? 1.85 : route === "contact" ? 1.22 : 1;
    const targetScale = transitioning ? 1.13 : route === "stack" ? 0.92 : 1;

    shell.current.uniforms.uTime.value = time;
    shell.current.uniforms.uEnergy.value = THREE.MathUtils.damp(shell.current.uniforms.uEnergy.value, targetEnergy, 4.5, delta);
    shell.current.uniforms.uMode.value = THREE.MathUtils.damp(shell.current.uniforms.uMode.value, mode, 3.5, delta);
    shell.current.uniforms.uShellOpacity.value = THREE.MathUtils.damp(shell.current.uniforms.uShellOpacity.value, visual.shellOpacity, 4, delta);
    shell.current.uniforms.uPointer.value.x = THREE.MathUtils.damp(shell.current.uniforms.uPointer.value.x, pointer.current[0], 3, delta);
    shell.current.uniforms.uPointer.value.y = THREE.MathUtils.damp(shell.current.uniforms.uPointer.value.y, pointer.current[1], 3, delta);
    innerCore.current.scale.setScalar(THREE.MathUtils.damp(innerCore.current.scale.x, visual.coreScale, 4, delta));
    innerMaterial.current.uniforms.uTime.value = time;
    innerMaterial.current.uniforms.uEnergy.value = THREE.MathUtils.damp(innerMaterial.current.uniforms.uEnergy.value, targetEnergy, 4.5, delta);
    innerMaterial.current.uniforms.uLightStrength.value = THREE.MathUtils.damp(innerMaterial.current.uniforms.uLightStrength.value, visual.coreLight, 4, delta);
    innerMaterial.current.uniforms.uOpacity.value = THREE.MathUtils.damp(innerMaterial.current.uniforms.uOpacity.value, visual.coreOpacity, 4, delta);
    particleField.current.scale.setScalar(THREE.MathUtils.damp(particleField.current.scale.x, visual.particleScale, 4, delta));
    particles.current.opacity = THREE.MathUtils.damp(particles.current.opacity, visual.particleOpacity, 4, delta);
    particles.current.size = THREE.MathUtils.damp(particles.current.size, visual.particleSize, 4, delta);
    network.current.opacity = THREE.MathUtils.damp(network.current.opacity, visual.networkOpacity, 4, delta);
    wire.current.opacity = THREE.MathUtils.damp(wire.current.opacity, visual.wireOpacity, 4, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 4.5, delta));

    orbitMaterial.current.opacity = THREE.MathUtils.damp(orbitMaterial.current.opacity, visual.ringOpacity, 4, delta);
    orbitNodes.current.forEach((material) => {
      if (!material) return;
      material.opacity = THREE.MathUtils.damp(material.opacity, visual.ringOpacity * 1.35, 4, delta);
    });
    if (!reduced) orbit.current.rotation.z += delta * 0.055;

    if (!reduced) {
      group.current.rotation.y += delta * (route === "portfolio" ? 0.045 : 0.075);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.current[1] * -0.08, 2.4, delta);
      group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, pointer.current[0] * 0.055, 2.4, delta);
    }
  });

  return (
    <group ref={group} rotation={[0.04, -0.2, 0]}>
      <mesh ref={innerCore}>
        <sphereGeometry args={[0.69, 64, 64]} />
        <shaderMaterial
          ref={innerMaterial}
          vertexShader={innerVertexShader}
          fragmentShader={innerFragmentShader}
          uniforms={innerUniforms}
          toneMapped={false}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.02}>
        <sphereGeometry args={[1.18, quality === "low" ? 36 : 56, quality === "low" ? 36 : 56]} />
        <shaderMaterial
          ref={shell}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      <points ref={particleField} rotation={[0.14, 0.2, -0.08]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={particles} color="#c8beff" size={0.012} sizeAttenuation transparent opacity={0.1} depthWrite={false} />
      </points>
      <lineSegments rotation={[0.14, 0.2, -0.08]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[networkPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={network} color="#b9adff" transparent opacity={0.01} depthWrite={false} />
      </lineSegments>
      <group ref={orbit} rotation={[1.22, 0.18, -0.25]}>
        <mesh>
          <torusGeometry args={[ORBIT_RADIUS, 0.0035, 6, 128, ORBIT_ARC]} />
          <meshBasicMaterial ref={orbitMaterial} color="#7565d5" transparent opacity={0.1} depthWrite={false} />
        </mesh>
        <mesh position={[ORBIT_RADIUS, 0, 0]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial ref={(node) => { orbitNodes.current[0] = node; }} color="#c7beff" transparent opacity={0.135} depthWrite={false} />
        </mesh>
        <mesh position={[ORBIT_RADIUS * Math.cos(ORBIT_ARC), ORBIT_RADIUS * Math.sin(ORBIT_ARC), 0]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshBasicMaterial ref={(node) => { orbitNodes.current[1] = node; }} color="#c7beff" transparent opacity={0.135} depthWrite={false} />
        </mesh>
      </group>
      <mesh scale={1.012}>
        <icosahedronGeometry args={[1.19, 3]} />
        <meshBasicMaterial ref={wire} color="#7565d5" wireframe transparent opacity={0.035} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function SystemCore({ route, transitioning }: { route: string; transitioning: boolean }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [quality, setQuality] = useState<"high" | "low">("high");
  const pointer = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        setSupported(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
      } catch {
        setSupported(false);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 720px)");
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const updateQuality = () => {
      const constrained = compact.matches || navigator.hardwareConcurrency <= 4 ||
        (device.deviceMemory !== undefined && device.deviceMemory <= 4) || Boolean(device.connection?.saveData);
      setQuality(constrained ? "low" : "high");
    };
    updateQuality();
    compact.addEventListener("change", updateQuality);
    return () => compact.removeEventListener("change", updateQuality);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setVisible(document.visibilityState === "visible");
    const updatePointer = (event: PointerEvent) => {
      if (reduced) return;
      pointer.current = [event.clientX / window.innerWidth * 2 - 1, event.clientY / window.innerHeight * 2 - 1];
    };
    document.addEventListener("visibilitychange", updateVisibility);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [reduced]);

  return (
    <div
      className="system-core-visual"
      data-state={route}
      data-quality={quality}
      data-renderer={supported ? "webgl" : "css"}
      aria-hidden="true"
    >
      {supported ? (
        <CoreErrorBoundary onError={() => setSupported(false)}>
          <Canvas
            dpr={quality === "low" ? [1, 1.1] : [1, 1.35]}
            camera={{ position: [0, 0, 4.35], fov: 44 }}
            frameloop={visible && !reduced ? "always" : "demand"}
            gl={{ alpha: true, antialias: quality === "high", powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener("webglcontextlost", (event) => {
                event.preventDefault();
                setSupported(false);
              }, { once: true });
            }}
          >
            <CoreObject
              route={route}
              transitioning={transitioning}
              reduced={reduced}
              pointer={pointer}
              quality={quality}
            />
          </Canvas>
        </CoreErrorBoundary>
      ) : (
        <StaticSystemCore />
      )}
      <div className="core-reflection" aria-hidden="true"><span /></div>
    </div>
  );
}
