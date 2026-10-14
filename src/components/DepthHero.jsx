import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl'

// Fenrir in 3D from a single photo: a depth map drives a gentle parallax
// as the pointer moves (or slowly on its own on touch screens).
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
  uniform float uScroll;   // 0..1 as the hero scrolls away
  uniform float uIntro;    // 0..1 on load
  varying vec2 vUv;

  vec2 cover(vec2 uv) {
    float rs = uRes.x / uRes.y, ri = uImg.x / uImg.y;
    vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
    return (uv - 0.5) * s + 0.5;
  }

  void main() {
    float zoom = 1.06 - 0.06 * uIntro + 0.08 * uScroll;
    vec2 uv = cover((vUv - 0.5) / zoom + 0.5);
    float d = texture2D(tDepth, uv).r;
    vec2 m = (uMouse - 0.5) * vec2(1.0, -1.0);
    vec3 col = texture2D(tImage, uv - m * (d - 0.35) * 0.035).rgb;
    col *= mix(0.55, 1.0, uIntro);
    col = mix(col, col * 0.35, smoothstep(0.0, 1.0, uScroll));
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

    const state = { mouse: [0.5, 0.5], target: [0.5, 0.5], active: false, start: performance.now(), scroll: 0, raf: 0 }
    const uniforms = {
      tImage: { value: new Texture(gl) }, tDepth: { value: new Texture(gl) },
      uRes: { value: [1, 1] }, uImg: { value: [1200, 904] },
      uMouse: { value: state.mouse }, uScroll: { value: 0 }, uIntro: { value: reduce ? 1 : 0 },
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
      state.target = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]
      state.active = true
    }
    const onLeave = () => { state.active = false; state.target = [0.5, 0.5] }
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
        if (!state.active && !reduce) state.target = [0.5 + Math.sin(t * 0.3) * 0.25, 0.5 + Math.sin(t * 0.21) * 0.12]
        state.mouse = [state.mouse[0] + (state.target[0] - state.mouse[0]) * 0.05, state.mouse[1] + (state.target[1] - state.mouse[1]) * 0.05]
        uniforms.uMouse.value = state.mouse
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
