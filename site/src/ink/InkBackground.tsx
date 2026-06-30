import { useEffect, useRef } from "react";

/**
 * Living ink — a playful, multi-color field that is mostly dark at rest and
 * REVEALS shifting colors along a smooth trail as the cursor moves. The trail
 * is a fading ribbon of recent positions, so motion feels fluid, not jittery.
 * Fallbacks: no-WebGL → static dark background; prefers-reduced-motion → one
 * faint static frame; pauses when hidden; cleans up on unmount.
 */
const TRAIL = 24; // ring buffer length of the reveal trail

const VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }";

const FRAG = [
  "precision highp float;",
  "uniform vec2 uRes; uniform float uTime; uniform vec3 uTrail[" + TRAIL + "];",
  "float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }",
  "float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);",
  "  float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));",
  "  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }",
  "float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=.5; } return v; }",
  // playful, gold-free palette (cyans, blues, violets, magentas, lime, pink)
  "vec3 pal(float t){ vec3 a=vec3(0.52,0.50,0.58), b=vec3(0.48,0.46,0.50),",
  "  c=vec3(1.0,1.0,1.0), d=vec3(0.30,0.55,0.85); return a + b*cos(6.28318*(c*t + d)); }",
  "void main(){",
  "  vec2 uv = gl_FragCoord.xy/uRes; vec2 p = uv; p.x *= uRes.x/uRes.y;",
  "  float t = uTime;",
  "  float reveal = 0.05;", // faint ambient so it is alive, not dead
  "  for(int i=0;i<" + TRAIL + ";i++){",
  "    vec2 d = p - uTrail[i].xy; reveal += uTrail[i].z * exp(-dot(d,d)*52.0);",
  "  }",
  "  reveal = clamp(reveal,0.0,1.0);",
  "  float n = fbm(p*2.2 + 0.09*t);",
  "  float hue = fract(0.55*n + 0.045*t + 0.22*p.x + 0.14*p.y);",
  "  vec3 colorBase = pal(hue) * (0.55 + 0.70*n);",
  "  vec3 dark = vec3(0.016,0.020,0.030);",
  "  float m = smoothstep(0.02,0.62,reveal);",
  "  vec3 col = mix(dark, colorBase, m);",
  "  col *= 1.0 - 0.22*dot(uv-0.5,uv-0.5);", // soft vignette
  "  gl_FragColor = vec4(col,1.0);",
  "}",
].join("\n");

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

export function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uTrail = gl.getUniformLocation(prog, "uTrail");

    let aspect = 1;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.6);
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = (w * DPR) | 0;
      canvas.height = (h * DPR) | 0;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      aspect = canvas.width / canvas.height;
    };
    window.addEventListener("resize", resize);
    resize();

    // smoothed pointer (eased) + a fading ring-buffer trail of recent positions
    const trail = new Float32Array(TRAIL * 3); // x (aspect-corrected), y, strength
    let head = 0;
    let sx = 0.5, sy = 0.55, tx = 0.5, ty = 0.55;
    let lastWx = 0.5 * aspect, lastWy = 0.55;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });

    let raf = 0;
    let running = true;
    const start = performance.now();

    const step = (time: number) => {
      // ease the pointer (smooth movement)
      sx += (tx - sx) * 0.14;
      sy += (ty - sy) * 0.14;
      const wx = sx * aspect, wy = sy;
      // strength from how far it moved this frame → strong trail when moving, faint at rest
      const moved = Math.hypot(wx - lastWx, wy - lastWy);
      const strength = Math.min(1.0, 0.18 + moved * 9.0);
      lastWx = wx; lastWy = wy;
      // decay the whole trail, then write the new head
      for (let i = 0; i < TRAIL; i++) trail[i * 3 + 2] *= 0.93;
      trail[head * 3] = wx;
      trail[head * 3 + 1] = wy;
      trail[head * 3 + 2] = strength;
      head = (head + 1) % TRAIL;
      gl.uniform1f(uTime, time);
      gl.uniform3fv(uTrail, trail);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      if (!running) return;
      step((now - start) / 1000);
      raf = requestAnimationFrame(frame);
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduce) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      gl.uniform1f(uTime, 6.0);
      gl.uniform3fv(uTrail, trail); // empty trail → faint ambient color only
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="ink" aria-hidden="true" />
      <div className="scrim" aria-hidden="true" />
    </>
  );
}
