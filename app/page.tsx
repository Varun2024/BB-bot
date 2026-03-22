/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { 
  ArrowUpRight, MessageCircle, Zap, BarChart2, 
  Users, Play, Target, ShieldCheck, 
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcfaf7] text-stone-900 selection:bg-orange-200 selection:text-orange-900 font-sans">
      {/* Dynamic Court Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        {/* The Key / Paint */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 border-b-4 border-x-4 border-orange-500/10 rounded-b-[100px]" />
        {/* Center Court Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 border-4 border-orange-500/5 rounded-full flex items-center justify-center">
             <div className="w-30 h-30 border-2 border-orange-500/5 rounded-full" />
        </div>
        {/* Hardwood Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-8 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Hero Section */}
          <section className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400 border border-stone-800 shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Season 2026 // Live Connection
            </div>
            
            <div className="space-y-6">
              <h1 className="text-7xl font-black leading-[0.85] tracking-tighter sm:text-9xl uppercase italic">
                CLUTCH <br />
                <span className="text-orange-600 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">LOGIC.</span>
              </h1>
              <p className="max-w-xl text-2xl font-semibold leading-tight text-stone-800">
                Your digital assistant for the hardwood. Built for the <span className="bg-orange-100 px-1 italic">win-condition</span>.
              </p>
              <p className="max-w-md text-stone-500 font-medium leading-relaxed">
                BB-Bot processes custom playbook data to automate drill planning, scouting reports, and real-time team strategy.Also trained On <b>Varun&apos;s work profile</b> so ask away. 
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Link
                href="/chat"
                className="group w-full sm:w-auto text-center inline-flex items-center justify-center gap-3 rounded-sm bg-orange-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-[8px_8px_0px_0px_rgba(234,88,12,0.2)] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                Enter Locker Room
              </Link>

              <a
                href="#features"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-sm border-2 border-stone-900 bg-transparent px-8 py-4.5 text-sm font-black uppercase tracking-widest text-stone-900 transition-all hover:bg-stone-900 hover:text-white"
              >
                Playbook
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* Visual Preview - Now showing Chat UI Screenshot */}
          <aside className="relative">
            {/* Decorative "Shot Clock" */}
            <div className="absolute -top-6 -right-6 z-20 bg-stone-900 border-2 border-stone-800 p-4 rounded-lg shadow-2xl rotate-12 hidden md:block">
                <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">Shot Clock</p>
                <p className="text-4xl font-mono text-orange-500 leading-none">24</p>
            </div>

            <div className="relative rounded-3xl border-8 border-stone-900 bg-stone-900 p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden">
              <div className="rounded-2xl bg-white p-2 min-h-100 flex flex-col justify-between overflow-hidden relative">
                
                {/* Header for context */}
                <div className="flex items-center justify-between p-4 border-b border-stone-100 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-black italic shadow-lg shadow-orange-600/20">BB</div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">Interface Preview</p>
                      <p className="text-base font-bold text-stone-900">Locker Room Chat</p>
                    </div>
                  </div>
                </div>

                {/* --- CHAT UI SCREENSHOT START --- */}

                <div className="flex-1 rounded-xl bg-stone-50 border border-stone-100 overflow-hidden relative group">

                  <img 
                    src="/image.png" 
                    alt="Screenshot of the BB-Bot Chat Interface"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Faint court line overlay for thematic consistency */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                </div>
                {/* --- CHAT UI SCREENSHOT END --- */}

              </div>
            </div>
          </aside>
        </div>

        {/* Features Grid - Unchanged */}
        <div id="features" className="mt-40">
          <div className="relative mb-16">
            <h2 className="text-5xl font-black uppercase italic text-stone-900">The Gameplan</h2>
            <div className="h-2 w-32 bg-orange-600 mt-2" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<Play />}
              title="Tactical Breakdowns"
              desc="Convert raw concepts into step-by-step offensive sets with coach-ready terminology."
              highlight={false}
            />
            <FeatureCard 
              icon={<Zap />}
              title="Rapid Drill-Fire"
              desc="Generate practice rotations based on player counts and available court time."
              highlight={false}
            />
            <FeatureCard 
              icon={<BarChart2 />}
              title="Advanced Scouting"
              desc="Parse opponent box scores to find defensive weaknesses and rotation gaps."
              highlight={false}
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Varun's work profile"
              desc=" Trained on Varun's work profile, so you can ask BB-Bot about basketball and Varun's dataset."
              highlight
            />
             <FeatureCard 
              icon={<Users />}
              title="Team Sync"
              desc="One-click formatting for WhatsApp groups and Slack channels. Keep the squad aligned."
              highlight={false}
            />
            <FeatureCard 
              icon={<Target />}
              title="Live Stat Tracker"
              desc="Interactive modules to track plus/minus and efficiency ratings during scrimmages."
              highlight={false}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// Unchanged FeatureCard
function FeatureCard({ icon, title, desc, highlight = false }: any) {
  return (
    <div className={`group relative p-8 transition-all duration-300 ${
        highlight 
        ? 'bg-stone-900 text-white border-none shadow-2xl' 
        : 'bg-white border-2 border-stone-200 hover:border-orange-500'
    }`}>
      <div className={`mb-6 inline-block transition-transform group-hover:scale-110 group-hover:-rotate-6 ${highlight ? 'text-orange-500' : 'text-orange-600'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase italic mb-3 tracking-tight transition-colors group-hover:text-orange-600">
        {title}
      </h3>
      <p className={`text-sm leading-relaxed font-medium ${highlight ? 'text-stone-400' : 'text-stone-500'}`}>
        {desc}
      </p>
      
      {/* Corner Accent */}
      <div className={`absolute bottom-0 right-0 w-8 h-8 transition-opacity opacity-0 group-hover:opacity-100 ${highlight ? 'bg-orange-600' : 'bg-stone-900'}`} 
           style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
    </div>
  );
}