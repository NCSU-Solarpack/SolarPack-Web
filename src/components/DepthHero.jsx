import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl'

// Fenrir in 3D from a single photo: a depth map drives parallax, and a lens that
// follows the pointer shows an engineering X-ray (edge-detected) of the same frame.
const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tImage;
  uniform sampler2D tDepth;
  uniform vec2 uRes;
  uniform vec2 uImg;
  uniform vec2 uMouse;     // 0..1, smoothed
  uniform vec2 uLens;      // lens centre, 0..1
  uniform float uLensR;    // lens radius in px
  uniform float uTime;
  uniform float uScroll;   // 0..1 as the hero scrolls away
  uniform float uIntro;    // 0..1 on load
  varying vec2 vUv;

  vec2 cover(vec2 uv) {
    float rs = uRes.x / uRes.y, ri = uImg.x / uImg.y;
    vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
    return (uv - 0.5) * s + 0.5;
  }
  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    float zoom = 1.06 - 0.06 * uIntro + 0.08 * uScroll;
    vec2 uv = cover((vUv - 0.5) / zoom + 0.5);
    float d = texture2D(tDepth, uv).r;
    vec2 m = (uMouse - 0.5) * vec2(1.0, -1.0);
    vec2 puv = uv - m * (d - 0.35) * 0.035;
    vec3 col = texture2D(tImage, puv).rgb;

    // X-ray: Sobel edges of the photo, drawn in red over near-black
    vec2 px = 1.4 / uImg;
    float tl = luma(texture2D(tImage, puv + px * vec2(-1, 1)).rgb);
    float  t = luma(texture2D(tImage, puv + px * vec2( 0, 1)).rgb);
    float tr = luma(texture2D(tImage, puv + px * vec2( 1, 1)).rgb);
    float  l = luma(texture2D(tImage, puv + px * vec2(-1, 0)).rgb);
    float  r = luma(texture2D(tImage, puv + px * vec2( 1, 0)).rgb);
    float bl = luma(texture2D(tImage, puv + px * vec2(-1,-1)).rgb);
    float  b = luma(texture2D(tImage, puv + px * vec2( 0,-1)).rgb);
    float br = luma(texture2D(tImage, puv + px * vec2( 1,-1)).rgb);
    float gx = -tl - 2.0 * l - bl + tr + 2.0 * r + br;
    float gy = -tl - 2.0 * t - tr + bl + 2.0 * b + br;
    float edge = smoothstep(0.12, 0.5, length(vec2(gx, gy)));
    float grid = step(0.985, fract(puv.x * 60.0)) + step(0.985, fract(puv.y * 45.0));
    vec3 xray = vec3(0.035) + vec3(1.0, 0.13, 0.08) * edge + vec3(0.25, 0.02, 0.02) * grid * 0.35 + vec3(0.18, 0.0, 0.0) * d * 0.4;

    // Lens with a wobbling, livery-like edge
    vec2 p = vUv * uRes;
    vec2 c = uLens * uRes;
    float ang = atan(p.y - c.y, p.x - c.x);
    float wob = noise(vec2(ang * 1.6, uTime * 0.6)) * 0.28 * uLensR;
    float mask = 1.0 - smoothstep(uLensR + wob - 2.0, uLensR + wob + 2.0, distance(p, c));

    col = mix(col, xray, mask);
    col *= mix(0.55, 1.0, uIntro);                      // fade up from dark
    col = mix(col, col * 0.35, smoothstep(0.0, 1.0, uScroll)); // darken as it leaves
    float vig = smoothstep(1.25, 0.35, length(vUv - 0.5));
    gl_FragColor = vec4(col * mix(0.7, 1.0, vig), 1.0);
  }
`

export default function DepthHero({ image, depth, fallback, alt }) {
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer
    try {
      renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: false, antialias: false })
    } catch {
      return // no WebGL: the <img> fallback stays visible
    }
    const gl = renderer.gl
    gl.canvas.setAttribute('aria-hidden', 'true')
    el.appendChild(gl.canvas)

    const load = (src) => new Promise((res, rej) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => res(img)
      img.onerror = rej
      img.src = src
    })

    const state = {
      mouse: [0.5, 0.5], target: [0.5, 0.5],
      lens: [0.62, 0.55], lensTarget: [0.62, 0.55],
      lensR: 0, lensRTarget: 0, start: performance.now(), scroll: 0, raf: 0, active: false, touched: false,
    }
    const uniforms = {
      tImage: { value: new Texture(gl) }, tDepth: { value: new Texture(gl) },
      uRes: { value: [1, 1] }, uImg: { value: [1200, 904] },
      uMouse: { value: state.mouse }, uLens: { value: state.lens }, uLensR: { value: 0 },
      uTime: { value: 0 }, uScroll: { value: 0 }, uIntro: { value: reduce ? 1 : 0 },
    }
    const program = new Program(gl, { vertex, fragment, uniforms })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      renderer.setSize(width, height)
      uniforms.uRes.value = [width * renderer.dpr, height * renderer.dpr]
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
      state.target = [x, y]
      state.lensTarget = [x, 1 - y]
      state.active = true
      state.lensRTarget = Math.min(r.width, r.height) * 0.19 * renderer.dpr
    }
    const onLeave = () => { state.active = false; state.lensRTarget = 0; state.target = [0.5, 0.5] }
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      state.scroll = Math.min(1, Math.max(0, -r.top / r.height))
    }

    Promise.all([load(image), load(depth)]).then(([img, dep]) => {
      uniforms.tImage.value.image = img
      uniforms.tDepth.value.image = dep
      uniforms.uImg.value = [img.naturalWidth, img.naturalHeight]
      el.classList.add('is-live')
      resize()
      const tick = (now) => {
        const t = (now - state.start) / 1000
        const lerp = (a, b, k) => a + (b - a) * k
        state.mouse = [lerp(state.mouse[0], state.target[0], 0.06), lerp(state.mouse[1], state.target[1], 0.06)]
        // No pointer (phones): the lens drifts slowly along the car on its own
        if (!state.active && !reduce) {
          state.lensTarget = [0.55 + Math.sin(t * 0.35) * 0.22, 0.42 + Math.sin(t * 0.5) * 0.08]
          state.lensRTarget = (window.matchMedia('(hover: none)').matches ? 0.16 : 0) * Math.min(uniforms.uRes.value[0], uniforms.uRes.value[1])
        }
        state.lens = [lerp(state.lens[0], state.lensTarget[0], 0.12), lerp(state.lens[1], state.lensTarget[1], 0.12)]
        state.lensR = lerp(state.lensR, state.lensRTarget, 0.1)
        uniforms.uMouse.value = state.mouse
        uniforms.uLens.value = state.lens
        uniforms.uLensR.value = state.lensR
        uniforms.uTime.value = t
        uniforms.uScroll.value = state.scroll
        if (!reduce) uniforms.uIntro.value = Math.min(1, uniforms.uIntro.value + 0.012)
        renderer.render({ scene: mesh })
        if (!reduce) state.raf = requestAnimationFrame(tick)
      }
      state.raf = requestAnimationFrame(tick)
    }).catch(() => {})

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(state.raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      gl.canvas.remove()
    }
  }, [image, depth])

  return (
    <div ref={wrap} className="depth-hero">
      <img className="depth-fallback" src={fallback || image} alt={alt} />
    </div>
  )
}
