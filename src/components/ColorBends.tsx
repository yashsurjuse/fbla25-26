'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type ColorBendsProps = {
  colors: string[];
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  transparent?: boolean;
  className?: string;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uFrequency;
  uniform float uWarpStrength;
  uniform float uNoise;
  uniform float uMouseInfluence;
  uniform vec3 uColors[3];
  uniform bool uTransparent;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 centered = (uv - 0.5) * 2.0 * aspect;

    vec2 mouseOffset = (uMouse - 0.5) * uMouseInfluence * 0.6;
    centered += mouseOffset;

    float waveA = sin((centered.x * uFrequency + uTime) + sin(centered.y * uWarpStrength)) * 0.5 + 0.5;
    float waveB = cos((centered.y * (uFrequency * 0.8) - uTime * 0.9) + cos(centered.x * (uWarpStrength * 0.85))) * 0.5 + 0.5;

    float mixFactor = clamp((waveA + waveB) * 0.5, 0.0, 1.0);

    float grain = noise(centered * (uFrequency * 2.8) + uTime * 0.35) * uNoise;

    vec3 color = mix(uColors[0], uColors[1], mixFactor);
    color = mix(color, uColors[2], smoothstep(0.12, 1.0, mixFactor + grain));
    color = pow(color, vec3(0.9));
    color = clamp(color * 1.6 + vec3(0.1, 0.05, 0.12), 0.0, 1.0);

    float alpha = uTransparent ? 0.85 : 1.0;

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function ColorBends({
  colors,
  rotation = 0,
  speed = 0.4,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 0.5,
  parallax = 0.4,
  noise = 0.05,
  transparent = false,
  className,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const sizeRef = useRef<{ width: number; height: number; aspect: number }>({
    width: 1,
    height: 1,
    aspect: 1,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: transparent });
    } catch (error) {
      console.error("ColorBends: WebGL renderer initialization failed", error);
      container.style.background =
        "radial-gradient(circle at top, rgba(43,118,255,0.55) 0%, transparent 55%), " +
        "radial-gradient(circle at bottom, rgba(255,92,122,0.6) 0%, transparent 60%), #02040a";
      return;
    }

    const initialWidth = Math.max(container.clientWidth, 1);
    const initialHeight = Math.max(container.clientHeight, 1);
    const initialAspect = initialWidth / initialHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(initialWidth, initialHeight, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.pointerEvents = "none";
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);
    console.log(
      "ColorBends: renderer initialized",
      `size=${container.clientWidth}x${container.clientHeight}`
    );

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-initialAspect, initialAspect, 1, -1, 0.1, 10);
    camera.position.set(0, 0, 1);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);

    const colorValues = colors
      .slice(0, 3)
      .map((color) => new THREE.Color(color));

    // Ensure we always have exactly 3 colors for the shader
    while (colorValues.length < 3) {
      colorValues.push(new THREE.Color("#ffffff"));
    }

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(mouseRef.current.x, mouseRef.current.y) },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uNoise: { value: noise },
        uMouseInfluence: { value: mouseInfluence },
        uColors: { value: colorValues },
        uTransparent: { value: transparent },
        uResolution: { value: new THREE.Vector2(initialWidth, initialHeight) },
      },
      vertexShader,
      fragmentShader,
      transparent,
    });
    material.depthWrite = false;
    material.side = THREE.DoubleSide;
    material.blending = THREE.NormalBlending;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.z = THREE.MathUtils.degToRad(rotation);
    mesh.scale.set(scale * initialAspect, scale, 1);
    mesh.position.z = 0;
    scene.add(mesh);

    materialRef.current = material;
    meshRef.current = mesh;

    sizeRef.current = { width: initialWidth, height: initialHeight, aspect: initialAspect };

    const handleResize = () => {
      if (!container) return;
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const aspect = width / height;
      sizeRef.current = { width, height, aspect };

      renderer.setSize(width, height, false);

      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();

      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(width, height);
      }

      if (meshRef.current) {
        meshRef.current.scale.set(scale * aspect, scale, 1);
      }
    };

    handleResize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    const onPointerLeave = () => {
      mouseRef.current = { x: 0.5, y: 0.5 };
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", handleResize);

    let last = performance.now();
    let time = 0;

    const renderLoop = () => {
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      time += delta * speed;

      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = time;
        materialRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
        materialRef.current.uniforms.uFrequency.value = frequency;
        materialRef.current.uniforms.uWarpStrength.value = warpStrength;
        materialRef.current.uniforms.uNoise.value = noise;
        materialRef.current.uniforms.uMouseInfluence.value = mouseInfluence;
        materialRef.current.uniforms.uTransparent.value = transparent;
        const { width, height } = sizeRef.current;
        materialRef.current.uniforms.uResolution.value.set(width, height);
      }

      if (meshRef.current) {
        const targetX = (mouseRef.current.x - 0.5) * parallax;
        const targetY = (mouseRef.current.y - 0.5) * parallax * -1;
        meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.08;
        meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.08;
        meshRef.current.scale.set(scale * sizeRef.current.aspect, scale, 1);
        meshRef.current.rotation.z = THREE.MathUtils.degToRad(rotation);
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
      materialRef.current = null;
      meshRef.current = null;
    };
  }, [colors, frequency, warpStrength, noise, mouseInfluence, rotation, scale, speed, parallax, transparent]);

  return <div ref={containerRef} className={cn("relative h-full w-full", className)} />;
}
