"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function RMark({ target, reduced }: { target: React.RefObject<[number, number]>; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.15, -1.8);
    shape.lineTo(-1.15, 1.8);
    shape.lineTo(0.26, 1.8);
    shape.bezierCurveTo(1.08, 1.8, 1.42, 1.25, 1.42, 0.64);
    shape.bezierCurveTo(1.42, 0.07, 1.11, -0.28, 0.62, -0.45);
    shape.lineTo(1.48, -1.8);
    shape.lineTo(0.46, -1.8);
    shape.lineTo(-0.2, -0.58);
    shape.lineTo(-0.35, -0.58);
    shape.lineTo(-0.35, -1.8);
    shape.closePath();

    const hole = new THREE.Path();
    hole.moveTo(-0.35, 1.07);
    hole.lineTo(0.15, 1.07);
    hole.bezierCurveTo(0.48, 1.07, 0.62, 0.9, 0.62, 0.64);
    hole.bezierCurveTo(0.62, 0.38, 0.48, 0.2, 0.15, 0.2);
    hole.lineTo(-0.35, 0.2);
    hole.closePath();
    shape.holes.push(hole);

    const result = new THREE.ExtrudeGeometry(shape, {
      depth: 0.48,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
      curveSegments: 14,
    });
    result.center();
    return result;
  }, []);

  const seam = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.72, 1.48, 0.38),
      new THREE.Vector3(-0.72, 0.48, 0.39),
      new THREE.Vector3(-0.18, -0.42, 0.4),
      new THREE.Vector3(0.78, -1.42, 0.42),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.025, 8, false);
  }, []);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    const max = THREE.MathUtils.degToRad(10);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, target.current[0] * max, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -target.current[1] * max, 4, delta);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.025;
  });

  return (
    <group ref={group} rotation={[0.04, -0.12, -0.06]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#20222b" roughness={0.38} metalness={0.72} />
        <Edges threshold={26} color="#747789" opacity={0.7} transparent />
      </mesh>
      <mesh geometry={seam}>
        <meshBasicMaterial color="#9b90ff" toneMapped={false} />
      </mesh>
    </group>
  );
}

function StaticR() {
  return (
    <svg className="static-r" viewBox="0 0 220 300" role="img" aria-label="Ricky monogram">
      <path
        d="M38 20h80c48 0 72 27 72 67 0 29-13 49-39 59l42 134h-57l-35-119H88v119H38V20Zm50 45v55h28c17 0 25-10 25-28 0-18-8-27-25-27H88Z"
        fill="#15161c"
        stroke="#5e6070"
        strokeWidth="2"
      />
      <path d="m69 50 45 85 47 122" fill="none" stroke="#9b90ff" strokeWidth="4" />
    </svg>
  );
}

export function KineticR() {
  const target = useRef<[number, number]>([0, 0]);
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState(true);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

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
    if (!root.current) return;
    let intersecting = true;
    const update = () => setVisible(intersecting && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      update();
    }, { threshold: 0.05 });
    observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  function updateTarget(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    target.current = [
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      ((event.clientY - rect.top) / rect.height) * 2 - 1,
    ];
  }

  return (
    <div
      className="kinetic-r"
      ref={root}
      onPointerMove={updateTarget}
      onPointerLeave={() => { target.current = [0, 0]; }}
      aria-hidden="true"
    >
      {!supported ? (
        <StaticR />
      ) : (
        <Canvas
          dpr={[1, 1.65]}
          camera={{ position: [0, 0, 5.7], fov: 38 }}
          frameloop={visible && !reduced ? "always" : "demand"}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[3, 4, 5]} intensity={3.2} color="#d8d5ff" />
          <directionalLight position={[-3, -2, 2]} intensity={1.1} color="#6b5cff" />
          <RMark target={target} reduced={reduced} />
        </Canvas>
      )}
    </div>
  );
}
