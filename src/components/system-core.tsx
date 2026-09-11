"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uEnergy;
  uniform float uMode;
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
    float displacement = wave * (0.035 + uMode * 0.008) * uEnergy;
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
    vec3 color = mix(shadow, violet, fresnel * 0.82 + contour * 0.055);
    color = mix(color, pearl, pow(fresnel, 5.0) * (0.44 + uMode * 0.04));
    color *= 0.82 + uEnergy * 0.24;
    float alpha = 0.72 + fresnel * 0.25;
    gl_FragColor = vec4(color, alpha);
  }
`;

const routeModes: Record<string, number> = {
  home: 0,
  about: 0.7,
  portfolio: 2,
  stack: 3,
  contact: 1.25,
};

function StaticSystemCore() {
  return (
    <div className="system-core-static" aria-hidden="true">
      <div className="core-atmosphere" />
      <div className="core-orbit core-orbit-a" />
      <div className="core-orbit core-orbit-b" />
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
}: {
  route: string;
  transitioning: boolean;
  reduced: boolean;
  pointer: React.RefObject<[number, number]>;
}) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.ShaderMaterial>(null);
  const particles = useRef<THREE.PointsMaterial>(null);
  const rings = useRef<Array<THREE.Mesh | null>>([]);
  const mode = routeModes[route] ?? 1;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uEnergy: { value: 1 },
    uMode: { value: 0 },
    uPointer: { value: new THREE.Vector2() },
  }), []);

  const particlePositions = useMemo(() => {
    const count = 900;
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
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !shell.current || !particles.current) return;

    const time = reduced ? 1.4 : state.clock.elapsedTime;
    const targetEnergy = transitioning ? 1.85 : route === "contact" ? 1.22 : 1;
    const targetParticleOpacity = route === "portfolio" ? 0.72 : route === "about" ? 0.22 : 0.1;
    const targetRingOpacity = route === "stack" ? 0.62 : route === "contact" ? 0.3 : 0.14;
    const targetScale = transitioning ? 1.13 : route === "stack" ? 0.92 : 1;

    shell.current.uniforms.uTime.value = time;
    shell.current.uniforms.uEnergy.value = THREE.MathUtils.damp(shell.current.uniforms.uEnergy.value, targetEnergy, 4.5, delta);
    shell.current.uniforms.uMode.value = THREE.MathUtils.damp(shell.current.uniforms.uMode.value, mode, 3.5, delta);
    shell.current.uniforms.uPointer.value.x = THREE.MathUtils.damp(shell.current.uniforms.uPointer.value.x, pointer.current[0], 3, delta);
    shell.current.uniforms.uPointer.value.y = THREE.MathUtils.damp(shell.current.uniforms.uPointer.value.y, pointer.current[1], 3, delta);
    particles.current.opacity = THREE.MathUtils.damp(particles.current.opacity, targetParticleOpacity, 4, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 4.5, delta));

    rings.current.forEach((ring, index) => {
      if (!ring) return;
      const material = ring.material as THREE.MeshBasicMaterial;
      material.opacity = THREE.MathUtils.damp(material.opacity, targetRingOpacity, 4, delta);
      if (!reduced) ring.rotation.z += delta * (index === 0 ? 0.055 : -0.035);
    });

    if (!reduced) {
      group.current.rotation.y += delta * (route === "portfolio" ? 0.045 : 0.075);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.current[1] * -0.08, 2.4, delta);
      group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, pointer.current[0] * 0.055, 2.4, delta);
    }
  });

  return (
    <group ref={group} rotation={[0.04, -0.2, 0]}>
      <mesh>
        <sphereGeometry args={[0.69, 64, 64]} />
        <meshBasicMaterial color="#dcd5ff" toneMapped={false} />
      </mesh>
      <mesh scale={1.02}>
        <sphereGeometry args={[1.18, 56, 56]} />
        <shaderMaterial
          ref={shell}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
      <points rotation={[0.14, 0.2, -0.08]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={particles} color="#c8beff" size={0.012} sizeAttenuation transparent opacity={0.1} depthWrite={false} />
      </points>
      <mesh ref={(node) => { rings.current[0] = node; }} rotation={[1.22, 0.18, -0.25]}>
        <torusGeometry args={[1.48, 0.0035, 6, 128]} />
        <meshBasicMaterial color="#9e8cff" transparent opacity={0.14} depthWrite={false} />
      </mesh>
      <mesh ref={(node) => { rings.current[1] = node; }} rotation={[0.28, 1.12, 0.58]}>
        <torusGeometry args={[1.37, 0.0025, 6, 128]} />
        <meshBasicMaterial color="#eeeaff" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <mesh scale={1.012}>
        <icosahedronGeometry args={[1.19, 3]} />
        <meshBasicMaterial color="#7565d5" wireframe transparent opacity={0.035} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function SystemCore({ route, transitioning }: { route: string; transitioning: boolean }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
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
    <div className="system-core-visual" aria-hidden="true">
      {supported ? (
        <Canvas
          dpr={[1, 1.35]}
          camera={{ position: [0, 0, 4.35], fov: 44 }}
          frameloop={visible && !reduced ? "always" : "demand"}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <CoreObject route={route} transitioning={transitioning} reduced={reduced} pointer={pointer} />
        </Canvas>
      ) : (
        <StaticSystemCore />
      )}
    </div>
  );
}
