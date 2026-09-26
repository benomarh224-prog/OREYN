/* A modeled bottle rendered with signed-distance surfaces in WebGL.
   No remote runtime, models, or textures. The label is drawn locally. */
(() => {
  'use strict';
  const host = document.getElementById('product-scene');
  const canvas = document.getElementById('sculpture');
  const api = window.OreynViewer, state = api.create();
  const controls = document.getElementById('viewer-controls');
  const status = document.getElementById('viewer-status');
  const capButton = document.getElementById('viewer-cap');
  const zoomOutput = document.getElementById('viewer-zoom-value');
  let themeId = document.querySelector('.hero').dataset.active;
  let gl, program, buffer, texture, uniforms;
  let ready = false, visible = true, frame = null, previous = 0, elapsed = 0;
  let cap = 0, yaw = state.yaw, pitch = state.pitch, magnification = state.zoom;
  let tint = [...api.themes[themeId].tint], dark = api.themes[themeId].dark;
  let dragging = null;
  const vertex = 'attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}';
  const fragment = `precision highp float;
uniform vec2 resolution;uniform float yaw,pitch,zoom,capLift,time,dark;uniform vec3 tint;uniform sampler2D label;
mat2 rotation(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
vec3 local(vec3 p){p.y-=sin(time*.65)*.035;p.xy=rotation(-.10)*p.xy;p.yz=rotation(pitch)*p.yz;p.xz=rotation(yaw)*p.xz;return p;}
float box(vec3 p,vec3 b,float r){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r;}
float cylinder(vec3 p,float r,float h){vec2 d=abs(vec2(length(p.xz),p.y))-vec2(r,h);return min(max(d.x,d.y),0.)+length(max(d,0.));}
vec2 model(vec3 q){
 vec2 hit=vec2(box(q-vec3(0.,-.30,0.),vec3(.65,.88,.28),.13),1.);
 float d=cylinder(q-vec3(0.,1.12+capLift*.66,0.),.355,.34)-.025;
 if(d<hit.x)hit=vec2(d,2.);
 d=cylinder(q-vec3(0.,.78,0.),.19,.13);if(d<hit.x)hit=vec2(d,2.);
 d=cylinder(q-vec3(0.,.96,0.),.12,.09);if(d<hit.x)hit=vec2(d,3.);
 d=box(q-vec3(0.,-.30,.413),vec3(.576,.464,.002),.008);if(d<hit.x)hit=vec2(d,4.);
 return hit;
}
vec2 map(vec3 p){return model(local(p));}
vec3 normal(vec3 p){vec2 e=vec2(.0025,0.);return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x));}
vec3 environment(vec3 r){
 vec3 c=mix(vec3(.60,.63,.53),vec3(.98,.96,.86),smoothstep(-.7,.8,r.y));
 c=mix(c,mix(vec3(.075,.085,.14),vec3(.62,.66,.78),smoothstep(-.6,.8,r.y)),dark);
 float stripe=smoothstep(.87,.93,abs(sin(r.x*3.2+r.z*1.7)));
 c=mix(c,vec3(1.,.98,.93),stripe*.75);
 c+=tint*pow(max(0.,dot(r,normalize(vec3(-1.,.4,1.)))),8.)*.3;
 return c;
}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*resolution)/resolution.y;
 vec3 ro=vec3(0.,.15+capLift*.28,5.4/zoom+capLift*.7);vec3 rd=normalize(vec3(uv*2.50,-3.));
 float t=0.;vec2 hit=vec2(1.,0.);
 for(int i=0;i<88;i++){hit=map(ro+rd*t);if(hit.x<.0015||t>9.)break;t+=hit.x*.88;}
 if(t>9.||hit.x>.006){gl_FragColor=vec4(0.);return;}
 vec3 p=ro+rd*t,q=local(p),n=normal(p),r=reflect(rd,n);
 float light=max(dot(n,normalize(vec3(-.7,1.4,2.))),0.);
 float fresnel=pow(1.-max(dot(n,-rd),0.),3.);
 vec3 c;
 if(hit.y<1.5){
   float liquid=1.-smoothstep(.18,.24,q.y);
   float edge=smoothstep(.51,.76,abs(q.x))+smoothstep(.99,1.18,abs(q.y+.30));
   vec3 glass=mix(vec3(.86,.90,.79),mix(vec3(.94,.91,.68),tint,.38),liquid*.75);
   glass=mix(glass,vec3(.47,.54,.58),dark*.5);
   c=mix(glass*(.67+light*.33),environment(r),.19+fresnel*.66);
   c+=pow(max(dot(r,normalize(vec3(-1.,1.,2.))),0.),34.)*.48;
   c+=clamp(edge,0.,1.)*.10;
   float rim=1.-smoothstep(.015,.028,abs(q.y-.21));c+=rim*.10;
   float tube=(1.-smoothstep(.009,.023,abs(q.x)))*step(-1.12,q.y)*step(q.y,.73);c=mix(c,c*.72,tube*.35);
 }else if(hit.y<3.5){
   c=environment(r)*(.63+light*.37);
   float grain=sin(q.y*550.)*.012;c+=grain;
   c=mix(c,vec3(.13,.16,.17),step(2.5,hit.y)*.3);
   c+=pow(max(dot(r,normalize(vec3(-.5,1.,2.))),0.),50.)*.7;
 }else{
   vec2 st=vec2(q.x/1.152+.5,(q.y+.30)/.928+.5);
   c=texture2D(label,clamp(st,0.,1.)).rgb*(.80+light*.20);
 }
 gl_FragColor=vec4(c,1.);
}`;

  function updateControls(message) {
    zoomOutput.textContent = `${Math.round(state.zoom * 100)}%`;
    capButton.setAttribute('aria-pressed', String(state.capOpen));
    capButton.textContent = state.capOpen ? 'Replace cap ↙' : 'Lift cap ↗';
    document.getElementById('viewer-zoom-out').disabled = state.zoom <= .8;
    document.getElementById('viewer-zoom-in').disabled = state.zoom >= 1.4;
    host.dataset.rotation = String(Math.round(state.yaw * 180 / Math.PI));
    host.dataset.zoom = String(state.zoom); host.dataset.cap = state.capOpen ? 'open' : 'closed';
    if (message) status.textContent = message;
  }
  function updateTheme() {
    themeId = document.querySelector('.hero').dataset.active;
    const theme = api.themes[themeId];
    document.getElementById('scene-atmosphere').textContent = theme.atmosphere;
    document.getElementById('scene-caption').textContent = theme.description;
    canvas.setAttribute('aria-label', `${theme.name} 3D bottle. Drag horizontally to rotate. Use arrow keys to rotate, plus or minus to zoom, C to lift the cap, and Home to reset.`);
    if (ready) { paintLabel(); requestRender(); }
    status.textContent = `${theme.name}. ${theme.description}`;
  }
  function paintLabel() {
    if (!ready) return;
    const theme = api.themes[themeId];
    const art = document.createElement('canvas'); art.width = 768; art.height = 512;
    const ctx = art.getContext('2d');
    ctx.fillStyle = '#f2f0e5'; ctx.fillRect(0, 0, 768, 512);
    ctx.fillStyle = '#282c23'; ctx.font = '18px Arial';
    ctx.fillText(`EAU DE PARFUM   /   ${theme.number}`, 48, 65);
    ctx.font = '800 185px Manrope, Arial'; ctx.fillText('oreyn', 43, 253);
    ctx.font = '25px Arial'; ctx.fillText('®', 620, 137);
    ctx.font = '24px Arial'; ctx.fillText(theme.name.toUpperCase().split('').join(' '), 51, 320);
    ctx.strokeStyle = '#b5b8a9'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(48, 382); ctx.lineTo(718, 382); ctx.stroke();
    ctx.font = '24px Arial'; ctx.fillText('slice of life.', 48, 445);
    ctx.font = '15px Arial'; ctx.fillText('50 ML / 1.7 FL.OZ.', 555, 445);
    gl.bindTexture(gl.TEXTURE_2D, texture); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, art);
  }
  function compile(type, source) {
    const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; } return shader;
  }
  function initialize() {
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power', premultipliedAlpha: false });
      if (!gl) return fallback();
      const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment);
      if (!vs || !fs) return fallback();
      program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
      gl.deleteShader(vs); gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return fallback();
      gl.useProgram(program); buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      const attr = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(attr); gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(['resolution','yaw','pitch','zoom','capLift','time','tint','dark','label'].map(name => [name, gl.getUniformLocation(program, name)]));
      texture = gl.createTexture(); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      ready = true; host.classList.add('bottle-3d-ready'); controls.hidden = false; canvas.tabIndex = 0;
      document.getElementById('viewer-help').textContent = 'DRAG TO ROTATE · + / − TO ZOOM';
      paintLabel(); resize(); updateControls(); requestRender();
      if (document.fonts) document.fonts.ready.then(() => { if (ready) { paintLabel(); draw(0); } });
    } catch { fallback(); }
  }
  function fallback() {
    ready = false; host.classList.remove('bottle-3d-ready'); controls.hidden = true; canvas.tabIndex = -1;
    document.getElementById('viewer-help').textContent = 'SCENT PORTRAIT · 3D IS UNAVAILABLE ON THIS DEVICE';
    status.textContent = 'Showing the perfume illustration. You can still explore all three scent atmospheres.';
    if (frame !== null) cancelAnimationFrame(frame); frame = null;
  }
  function resize() {
    if (!ready) return;
    const bounds = canvas.getBoundingClientRect(); const ratio = Math.min(devicePixelRatio || 1, 1.5, 900 / Math.max(bounds.width, 1));
    canvas.width = Math.max(1, Math.round(bounds.width * ratio)); canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height); draw(0);
  }
  function draw(delta) {
    if (!ready) return;
    const paused = window.oreynMotionPaused;
    const blend = paused || !delta ? 1 : 1 - Math.exp(-delta * 12);
    if (!paused) elapsed += delta;
    // Follow the nearest equivalent angle, so crossing 0° never spins backward.
    const difference = Math.atan2(Math.sin(state.yaw - yaw), Math.cos(state.yaw - yaw));
    yaw += difference * blend; pitch += (state.pitch - pitch) * blend;
    cap += ((state.capOpen ? 1 : 0) - cap) * blend; magnification += (state.zoom - magnification) * blend;
    const target = api.themes[themeId]; dark += (target.dark - dark) * blend;
    tint = tint.map((channel, i) => channel + (target.tint[i] - channel) * blend);
    gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.yaw, yaw); gl.uniform1f(uniforms.pitch, pitch); gl.uniform1f(uniforms.zoom, magnification);
    gl.uniform1f(uniforms.capLift, cap); gl.uniform1f(uniforms.time, elapsed); gl.uniform1f(uniforms.dark, dark);
    gl.uniform3fv(uniforms.tint, tint); gl.uniform1i(uniforms.label, 0); gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function tick(now) {
    frame = null;
    if (!ready || !visible || document.hidden || window.oreynModalOpen) return;
    if (window.oreynMotionPaused) { draw(0); return; }
    if (!previous || now - previous >= 33) { draw(previous ? Math.min((now - previous) / 1000, .08) : .033); previous = now; }
    frame = requestAnimationFrame(tick);
  }
  function requestRender() {
    if (!ready) return;
    if (window.oreynMotionPaused) { draw(0); return; }
    if (frame === null && visible && !document.hidden && !window.oreynModalOpen) { previous = 0; frame = requestAnimationFrame(tick); }
  }
  function interact(message) { updateControls(message); requestRender(); }
  function rotate(x, y = 0) { api.rotate(state, x, y); interact(`Bottle rotated to ${Math.round(state.yaw * 180 / Math.PI)} degrees.`); }
  function zoomBy(delta) { api.zoom(state, delta); interact(`Zoom ${Math.round(state.zoom * 100)} percent.`); }
  function toggleCap() { state.capOpen = !state.capOpen; interact(state.capOpen ? 'Cap lifted. The spray nozzle is visible.' : 'Cap replaced.'); }
  function reset() { api.reset(state); interact('Bottle view reset.'); }
  controls.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.id === 'viewer-left') rotate(-Math.PI / 4);
    if (button.id === 'viewer-right') rotate(Math.PI / 4);
    if (button.id === 'viewer-zoom-in') zoomBy(.1);
    if (button.id === 'viewer-zoom-out') zoomBy(-.1);
    if (button.id === 'viewer-cap') toggleCap();
    if (button.id === 'viewer-reset') reset();
  });
  canvas.addEventListener('pointerdown', event => {
    if (!ready || !event.isPrimary || event.button !== 0) return;
    dragging = { id: event.pointerId, x: event.clientX, y: event.clientY }; canvas.setPointerCapture(event.pointerId);
    canvas.classList.add('dragging'); canvas.focus({ preventScroll: true });
  });
  canvas.addEventListener('pointermove', event => {
    if (!dragging || event.pointerId !== dragging.id) return;
    api.rotate(state, (event.clientX - dragging.x) * .014, (event.clientY - dragging.y) * .007);
    dragging.x = event.clientX; dragging.y = event.clientY; updateControls(); requestRender();
  });
  function release() { if (dragging) status.textContent = `Bottle rotated to ${Math.round(state.yaw * 180 / Math.PI)} degrees.`; dragging = null; canvas.classList.remove('dragging'); }
  canvas.addEventListener('pointerup', release); canvas.addEventListener('pointercancel', release); canvas.addEventListener('lostpointercapture', release);
  canvas.addEventListener('keydown', event => {
    const actions = { ArrowLeft: () => rotate(-Math.PI / 8), ArrowRight: () => rotate(Math.PI / 8), ArrowUp: () => rotate(0,-.1), ArrowDown: () => rotate(0,.1), '+': () => zoomBy(.1), '=': () => zoomBy(.1), '-': () => zoomBy(-.1), c: toggleCap, C: toggleCap, Home: reset };
    if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
  });
  new MutationObserver(updateTheme).observe(document.querySelector('.hero'), { attributes: true, attributeFilter: ['data-active'] });
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); fallback(); });
  canvas.addEventListener('webglcontextrestored', initialize);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; requestRender(); }).observe(host);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas); else window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', requestRender); window.addEventListener('oreyn-motion', requestRender);
  updateTheme(); initialize();
})();
