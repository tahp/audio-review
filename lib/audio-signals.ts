export type Channel = "left" | "center" | "right";
let context: AudioContext | null = null;
let active: AudioNode[] = [];

function ctx() {
  if (!context) context = new AudioContext();
  return context;
}
export function stopSignal() {
  for (const node of active) {
    try {
      if (node instanceof OscillatorNode) node.stop();
      node.disconnect();
    } catch {}
  }
  active = [];
}
export async function playTone(frequency:number, duration=1.5, channel:Channel="center", level=0.08) {
  stopSignal();
  const c=ctx(); await c.resume();
  const o=c.createOscillator(), g=c.createGain(), p=c.createStereoPanner();
  o.type="sine"; o.frequency.value=frequency;
  p.pan.value=channel==="left"?-1:channel==="right"?1:0;
  const n=c.currentTime;
  g.gain.setValueAtTime(0.0001,n);
  g.gain.exponentialRampToValueAtTime(level,n+0.03);
  g.gain.setValueAtTime(level,n+Math.max(0.04,duration-0.08));
  g.gain.exponentialRampToValueAtTime(0.0001,n+duration);
  o.connect(g).connect(p).connect(c.destination);
  o.start(n); o.stop(n+duration+0.02);
  active=[o,g,p];
}
export async function playSweep(start=20,end=20000,duration=12,level=0.045) {
  stopSignal();
  const c=ctx(); await c.resume();
  const o=c.createOscillator(),g=c.createGain(),n=c.currentTime;
  o.type="sine";
  o.frequency.setValueAtTime(start,n);
  o.frequency.exponentialRampToValueAtTime(end,n+duration);
  g.gain.setValueAtTime(0.0001,n);
  g.gain.exponentialRampToValueAtTime(level,n+0.08);
  g.gain.setValueAtTime(level,n+duration-0.15);
  g.gain.exponentialRampToValueAtTime(0.0001,n+duration);
  o.connect(g).connect(c.destination); o.start(n); o.stop(n+duration+0.02);
  active=[o,g];
}
export async function playPinkNoise(duration=5,level=0.035) {
  stopSignal();
  const c=ctx(); await c.resume();
  const frames=Math.floor(c.sampleRate*duration);
  const buffer=c.createBuffer(2,frames,c.sampleRate);
  for(let ch=0;ch<2;ch++){
    const out=buffer.getChannelData(ch);
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for(let i=0;i<frames;i++){
      const w=Math.random()*2-1;
      b0=.99886*b0+w*.0555179; b1=.99332*b1+w*.0750759;
      b2=.969*b2+w*.153852; b3=.8665*b3+w*.3104856;
      b4=.55*b4+w*.5329522; b5=-.7616*b5-w*.016898;
      const pink=b0+b1+b2+b3+b4+b5+b6+w*.5362;
      b6=w*.115926; out[i]=pink*.11;
    }
  }
  const s=c.createBufferSource(),g=c.createGain();
  s.buffer=buffer; g.gain.value=level;
  s.connect(g).connect(c.destination); s.start();
  active=[s,g];
}
