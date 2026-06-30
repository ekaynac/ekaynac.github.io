import { useEffect, useRef } from "react";

/**
 * Living ink — an ambient WebGL flowing-ink field rendered behind all content.
 * Drifts on its own; the cursor stirs and blooms it. Graceful fallbacks:
 * no-WebGL → static dark background; prefers-reduced-motion → one static frame;
 * pauses when the tab is hidden; cleans up on unmount.
 */
const VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }";

const FRAG = [
  "precision highp float;",
  "uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uAmt;",
  "float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }",
  "float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);",
  "  float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));",
  "  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }",
  "float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.03; a*=.5; } return v; }",
  "void main(){",
  "  vec2 uv = gl_FragCoord.xy/uRes; vec2 p = uv; p.x *= uRes.x/uRes.y;",
  "  float t = uTime*0.058;",
  "  vec2 m = uMouse; m.x *= uRes.x/uRes.y;",
  "  vec2 toM = p - m; float md = dot(toM,toM);",
  "  vec2 stir = toM/(md+0.045) * uAmt * 0.22;",
  "  vec2 q = vec2(fbm(p*1.6 + t + stir), fbm(p*1.6 + vec2(5.2,1.3) - t + stir));",
  "  vec2 r = vec2(fbm(p*1.6 + 2.0*q + vec2(1.7,9.2) + 0.12*t), fbm(p*1.6 + 2.0*q + vec2(8.3,2.8) - 0.10*t));",
  "  float f = fbm(p*1.6 + 2.4*r);",
  "  float bloom = exp(-md*3.6) * uAmt * 1.6;",
  "  float ink = smoothstep(0.33,0.76,f) + bloom*0.9;",
  "  vec3 bg = vec3(0.024,0.028,0.039);",
  "  vec3 inkc = mix(vec3(0.12,0.155,0.24), vec3(0.25,0.20,0.15), r.x);",
  "  vec3 col = mix(bg, inkc, clamp(ink,0.,1.)*1.08);",
  "  col += vec3(0.11,0.12,0.17)*pow(max(f-0.56,0.0),2.0);",
  "  col += vec3(0.18,0.14,0.07)*bloom*1.2;",
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
    if (!gl) return; // CSS background remains as the fallback

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
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uAmt = gl.getUniformLocation(prog, "uAmt");

    const DPR = Math.min(window.devicePixelRatio || 1, 1.6);
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = (w * DPR) | 0;
      canvas.height = (h * DPR) | 0;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    let mx = 0.5, my = 0.55, tmx = 0.5, tmy = 0.55, amt = 0, tAmt = 0;
    const move = (x: number, y: number, kick = 1.0) => {
      tmx = x / window.innerWidth;
      tmy = 1.0 - y / window.innerHeight;
      tAmt = kick;
    };
    const onMove = (e: PointerEvent) => move(e.clientX, e.clientY, 1.0);
    const onDown = (e: PointerEvent) => move(e.clientX, e.clientY, 1.4);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    let raf = 0;
    let running = true;
    const start = performance.now();
    const frame = (now: number) => {
      if (!running) return;
      const time = (now - start) / 1000;
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      tAmt *= 0.975;
      amt += (tAmt - amt) * 0.12;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uAmt, Math.max(0.32, amt));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduce) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      gl.uniform1f(uTime, 8.0);
      gl.uniform2f(uMouse, 0.5, 0.55);
      gl.uniform1f(uAmt, 0.32);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
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
