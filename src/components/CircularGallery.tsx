'use client';

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import type { GalleryItem } from '@/data/galleryItems';
import styles from './CircularGallery.module.css';

type GL = Renderer['gl'];

type CircularGalleryProps = {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const debounce = <T extends (...args: unknown[]) => void>(fn: T, wait: number) => {
  let timeout: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => fn(...args), wait);
  };
};

const fontSizeFromFontString = (font: string) => {
  const match = font.match(/(\d+)px/);
  return match ? Number(match[1]) : 30;
};

const createTextTexture = (
  gl: GL,
  text: string,
  font: string,
  color: string,
) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to create 2d context');
  }

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontPx = fontSizeFromFontString(font);
  const textHeight = Math.ceil(fontPx * 1.2);

  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;

  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
};

type TitleProps = {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  placement?: "top" | "bottom";
};

class Title {
  private gl: GL;
  private plane: Mesh;
  private renderer: Renderer;
  private text: string;
  private textColor: string;
  private font: string;
  private placement: "top" | "bottom";
  mesh!: Mesh;

  constructor({ gl, plane, renderer, text, textColor, font, placement = "bottom" }: TitleProps) {
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.placement = placement;
    this.createMesh();
  }

  private createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.15;
    const textWidthScaled = textHeightScaled * aspect;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    const offset = this.plane.scale.y * 0.5 + textHeightScaled * 0.5 + 0.05;
    this.mesh.position.y = this.placement === "top" ? offset : -offset;
    this.mesh.setParent(this.plane);
  }
}

type ScreenSize = { width: number; height: number };
type Viewport = { width: number; height: number };

type MediaProps = {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  labelPlacement?: "top" | "bottom";
};

class Media {
  private geometry: Plane;
  private gl: GL;
  private image: string;
  private index: number;
  private length: number;
  private renderer: Renderer;
  private scene: Transform;
  private screen: ScreenSize;
  private text: string;
  private viewport: Viewport;
  private bend: number;
  private textColor: string;
  private borderRadius: number;
  private font: string;
  private labelPlacement: "top" | "bottom";
  plane!: Mesh;
  program!: Program;
  title!: Title;
  extra = 0;
  scale = 1;
  padding = 2;
  width = 0;
  widthTotal = 0;
  x = 0;
  speed = 0;
  isBefore = false;
  isAfter = false;

  constructor(props: MediaProps) {
    this.geometry = props.geometry;
    this.gl = props.gl;
    this.image = props.image;
    this.index = props.index;
    this.length = props.length;
    this.renderer = props.renderer;
    this.scene = props.scene;
    this.screen = props.screen;
    this.text = props.text;
    this.viewport = props.viewport;
    this.bend = props.bend;
    this.textColor = props.textColor;
    this.borderRadius = props.borderRadius;
    this.font = props.font;
    this.labelPlacement = props.labelPlacement ?? "bottom";

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  private createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);

          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  private createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  private createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
      placement: this.labelPlacement,
    });
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }

  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const halfViewport = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(this.bend);
      const radius = (halfViewport * halfViewport + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfViewport);
      const arc = radius - Math.sqrt(Math.max(radius * radius - effectiveX * effectiveX, 0));
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(Math.min(effectiveX / radius, 1));
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(Math.min(effectiveX / radius, 1));
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    this.isBefore = this.plane.position.x + planeOffset < -halfViewport;
    this.isAfter = this.plane.position.x - planeOffset > halfViewport;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    } else if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
}

type AppConfig = {
  items: GalleryItem[];
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  scrollSpeed: number;
  scrollEase: number;
};

class GalleryApp {
  private container: HTMLDivElement;
  private renderer!: Renderer;
  private gl!: GL;
  private camera!: Camera;
  private scene!: Transform;
  private planeGeometry!: Plane;
  private medias: Media[] = [];
  private items: GalleryItem[];
  private itemsWithPlacement: (GalleryItem & { labelPosition: "top" | "bottom" })[] = [];
  private bend: number;
  private textColor: string;
  private borderRadius: number;
  private font: string;
  private scrollSpeed: number;
  private scrollEase: number;
  private screen!: ScreenSize;
  private viewport!: Viewport;
  private scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
  private raf = 0;
  private onCheckDebounce: () => void;
  private isDragging = false;
  private dragStart = 0;
  private dragStartScroll = 0;
  private isCoarsePointer = false;
  private dragMultiplier = 0.025;

  constructor(container: HTMLDivElement, config: AppConfig) {
    this.container = container;
    this.items = config.items;
    this.itemsWithPlacement = this.items.map((item, baseIndex) => ({
      ...item,
      labelPosition: item.labelPosition ?? (baseIndex % 2 === 0 ? "bottom" : "top"),
    }));
    this.bend = config.bend;
    this.textColor = config.textColor;
    this.borderRadius = config.borderRadius;
    this.font = config.font;
    this.scrollSpeed = config.scrollSpeed;
    this.scrollEase = config.scrollEase;
    this.scroll.ease = config.scrollEase;
    this.onCheckDebounce = debounce(this.snapToNearest, 200);
    this.updatePointerPreferences();

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGeometry();
    this.onResize();
    this.createMedias();
    this.addEventListeners();
    this.update();
  }

  private createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  private createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  private createScene() {
    this.scene = new Transform();
  }

  private createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }

  private createMedias() {
    const doubled = this.itemsWithPlacement.concat(this.itemsWithPlacement);
    this.medias = doubled.map((item, index) =>
      new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: item.image,
        index,
        length: doubled.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: item.text,
        viewport: this.viewport,
        bend: this.bend,
        textColor: this.textColor,
        borderRadius: this.borderRadius,
        font: this.font,
        labelPlacement: item.labelPosition,
      }),
    );
  }

  private handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1;
    this.scroll.target += direction * this.scrollSpeed * 0.2;
    this.onCheckDebounce();
  };

  private handlePointerDown = (event: PointerEvent) => {
    if (event.pointerType === "touch") {
      event.preventDefault();
    }
    this.isDragging = true;
    this.container.setPointerCapture(event.pointerId);
    this.dragStart = event.clientX;
    this.dragStartScroll = this.scroll.current;
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.isDragging) return;
    if (event.pointerType === "touch") {
      event.preventDefault();
    }
    const multiplier = this.dragMultiplier;
    const distance = (this.dragStart - event.clientX) * (this.scrollSpeed * multiplier);
    this.scroll.target = this.dragStartScroll + distance;
  };

  private handlePointerUp = (event: PointerEvent) => {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.container.hasPointerCapture?.(event.pointerId)) {
      this.container.releasePointerCapture(event.pointerId);
    }
    this.snapToNearest();
  };

  private snapToNearest = () => {
    if (!this.medias.length) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const snapped = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -snapped : snapped;
  };

  private handleResize = () => {
    this.updatePointerPreferences();
    this.onResize();
    this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
  };

  private addEventListeners() {
    this.container.addEventListener('wheel', this.handleWheel, { passive: false });
    this.container.addEventListener('pointerdown', this.handlePointerDown);
    this.container.addEventListener('pointermove', this.handlePointerMove);
    this.container.addEventListener('pointerup', this.handlePointerUp);
    this.container.addEventListener('pointerleave', this.handlePointerUp);
    this.container.addEventListener('pointercancel', this.handlePointerUp);
    window.addEventListener('resize', this.handleResize);
  }

  private removeEventListeners() {
    this.container.removeEventListener('wheel', this.handleWheel);
    this.container.removeEventListener('pointerdown', this.handlePointerDown);
    this.container.removeEventListener('pointermove', this.handlePointerMove);
    this.container.removeEventListener('pointerup', this.handlePointerUp);
    this.container.removeEventListener('pointerleave', this.handlePointerUp);
    this.container.removeEventListener('pointercancel', this.handlePointerUp);
    window.removeEventListener('resize', this.handleResize);
  }

  private onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
  }

  private updatePointerPreferences() {
    if (typeof window === "undefined") {
      return;
    }
    this.isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const width = window.innerWidth;
    if (this.isCoarsePointer && width < 1024) {
      this.dragMultiplier = 0.05;
    } else {
      this.dragMultiplier = 0.025;
    }
    if (this.isCoarsePointer) {
      this.container.style.setProperty("touch-action", "none");
    } else {
      this.container.style.removeProperty("touch-action");
    }
  }

  private update = () => {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias.forEach(media => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  };

  destroy() {
    window.cancelAnimationFrame(this.raf);
    this.removeEventListeners();
    this.medias = [];
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 28px "Geist", "Figtree", sans-serif',
  scrollSpeed = 2,
  scrollEase = 0.05,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const app = new GalleryApp(container, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    });

    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return (
    <div className="relative h-[420px] sm:h-[500px] md:h-[560px] lg:h-[620px]">
      <div ref={containerRef} className={`${styles.circularGallery} absolute inset-0`} />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5 bg-gradient-to-b from-white/8 via-transparent to-black/30" />
    </div>
  );
}
