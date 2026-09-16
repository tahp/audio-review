"use client";
import { playPinkNoise, playSweep, playTone, stopSignal } from "@/lib/audio-signals";

const b="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm font-medium active:bg-zinc-800";

export default function SignalPanel({testId}:{testId:string}) {
  if(testId==="channels") return <Panel title="ARP CHANNEL SIGNAL" spec="440 Hz sine · 1.5 s · gain 0.08">
    <div className="grid grid-cols-3 gap-2">
      <button className={b} onClick={()=>playTone(440,1.5,"left")}>Left</button>
      <button className={b} onClick={()=>playTone(440,1.5,"center")}>Center</button>
      <button className={b} onClick={()=>playTone(440,1.5,"right")}>Right</button>
    </div>
  </Panel>;

  if(testId==="sound") return <Panel title="ARP REFERENCE SIGNALS" spec="Defined Web Audio signals · conservative gain">
    <p className="mb-3 text-xs leading-5 text-amber-200">Start with device volume low. Raise only to a comfortable level.</p>
    <div className="grid grid-cols-2 gap-2">
      <button className={b} onClick={()=>playTone(60,2)}>60 Hz bass</button>
      <button className={b} onClick={()=>playTone(250,2)}>250 Hz low-mid</button>
      <button className={b} onClick={()=>playTone(1000,2)}>1 kHz reference</button>
      <button className={b} onClick={()=>playTone(6000,2)}>6 kHz treble</button>
      <button className={b} onClick={()=>playSweep()}>20 Hz–20 kHz sweep</button>
      <button className={b} onClick={()=>playPinkNoise()}>Pink noise</button>
    </div>
  </Panel>;

  if(testId==="latency") return <Panel title="ARP TIMING PULSE" spec="1 kHz sine · 80 ms">
    <button className={`${b} w-full`} onClick={()=>playTone(1000,.08)}>Play timing click</button>
    <p className="mt-3 text-xs leading-5 text-zinc-500">Signal primitive only. Synchronized visual timing measurement comes in a later protocol revision.</p>
  </Panel>;

  return null;
}
function Panel({title,spec,children}:{title:string;spec:string;children:React.ReactNode}) {
  return <section className="mt-7 rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
    <div className="flex items-start justify-between gap-3">
      <p className="text-sm font-semibold">{title}</p>
      <button onClick={stopSignal} className="text-xs text-zinc-400">STOP</button>
    </div>
    <p className="mb-4 mt-1 text-xs text-zinc-500">{spec}</p>
    {children}
  </section>;
}
