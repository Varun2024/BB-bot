"use client";

import { memo } from "react";
import Link from "next/link";
import { Dribbble } from "lucide-react";

export const Navigation = memo(() => {
  return (
    <nav 
      className="group flex justify-between items-center mx-auto w-full max-w-7xl px-4 py-6"
      aria-label="Main Navigation"
    >
      {/* Logo Section */}
      <Link 
        href="/" 
        className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg transition-all"
      >
        <div className="bg-orange-600 p-1.5 rounded-lg shadow-lg shadow-orange-600/20 rotate-3 group-hover:rotate-0 transition-transform duration-300">
          <Dribbble className="text-white h-6 w-6" aria-hidden="true" />
        </div>
        <span className="font-black text-2xl tracking-tighter italic uppercase text-stone-900">
          BB <span className="text-orange-600">Bot</span>
        </span>
      </Link>

      {/* Links Section */}
      <div className="flex items-center gap-8">
        <a 
          href="#features" 
          className="relative text-xs font-black uppercase tracking-[0.2em] text-stone-500 hover:text-orange-600 transition-colors duration-200
                     after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all hover:after:w-full"
        >
          Playbook
        </a>
        <a 
          href="/chat" 
          className="relative text-xs font-black uppercase tracking-[0.2em] text-stone-500 hover:text-orange-600 transition-colors duration-200
                     after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all hover:after:w-full"
        >
          Chat
        </a>
        
        {/* Subtle "Live" Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-600">v2.4 Online</span>
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = "Navigation";