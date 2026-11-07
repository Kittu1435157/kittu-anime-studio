import Link from "next/link";
import { Clapperboard, Layers3, Palette, Sparkles } from "lucide-react";

const features = [
  { icon: Clapperboard, title: "Episode production", description: "Organize stories into scenes, shots, and production-ready plans." },
  { icon: Layers3, title: "Character memory", description: "Keep character references, approved looks, and design versions together." },
  { icon: Palette, title: "Visual direction", description: "Build a consistent visual language for every world and sequence." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight"><span className="grid size-10 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Clapperboard size={21} /></span>Kittu Anime Studio</Link>
        <div className="flex items-center gap-3"><Link href="/login" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white">Sign in</Link><Link href="/register" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">Get started</Link></div>
      </nav>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:pt-24">
        <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm"><Sparkles size={14} /> A creative production workspace</div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">Your anime universe.<span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">One studio.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">Develop characters, shape episodes, organize storyboards, and bring original anime worlds into one carefully designed production space.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/register" className="rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5">Create your studio ↗</Link><a href="#features" className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Explore features</a></div>
          <p className="mt-5 text-xs text-slate-400">Plan first. Create deliberately. Keep every character consistent.</p></div>
        <div className="relative"><div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-100 via-violet-100 to-transparent blur-2xl" /><div className="relative rounded-[2rem] border border-white bg-white p-5 shadow-2xl shadow-slate-900/10"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><p className="text-xs font-semibold text-slate-400">YOUR WORKSPACE</p><p className="mt-1 font-semibold text-slate-900">Featured project</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Concept</span></div><div className="mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 p-7 text-white"><div className="flex min-h-64 flex-col justify-between"><div className="text-xs font-semibold tracking-[0.25em] text-blue-200">ORIGINAL ANIME PROJECT</div><div><p className="text-sm text-blue-200">A world waiting to be told</p><h2 className="mt-2 text-4xl font-semibold tracking-tight">Create beyond<br />the ordinary.</h2></div><div className="flex items-center justify-between text-xs text-blue-100"><span>Characters · Episodes · Storyboards</span><Sparkles size={17} /></div></div></div><div className="mt-5 grid grid-cols-3 gap-3">{["Projects", "Characters", "Episodes"].map((item, index) => <div key={item} className="rounded-xl bg-slate-50 p-3"><p className="text-xl font-semibold text-slate-900">0{index}</p><p className="mt-1 text-xs text-slate-500">{item}</p></div>)}</div></div></div>
      </section>
      <section id="features" className="border-t border-slate-200/70 bg-white py-20"><div className="mx-auto max-w-7xl px-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">The production workspace</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Everything starts with a strong foundation.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{features.map(({ icon: Icon, title, description }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon size={21} /></span><h3 className="mt-5 font-semibold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
      <footer className="border-t border-slate-200 px-6 py-8 text-center text-xs text-slate-400">© {new Date().getFullYear()} Kittu Anime Studio. Built for original creators.</footer>
    </main>
  );
}
