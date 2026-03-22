import Link from "next/link";
import { ArrowUpRight, MessageCircle, Zap, BarChart2, Users, Play } from "lucide-react";
import FeatureCard from "@/components/ui/feature-card";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-stone-50 text-black">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Hero */}
          <section className="space-y-4">
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl" />
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              BB-Bot
            </h1>
            <p className="max-w-3xl text-lg text-stone-700">
              Your basketball playbook, With certain knowledge of the developer.</p>
            <p className="max-w-md text-sm text-stone-600">
              Ask about plays, drills, stats, and more. Answers are concise and prioritize Varun&apos;s dataset when relevant.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
              >
                <MessageCircle className="h-4 w-4" />
                Start chatting
              </Link>

              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-stone-100"
              >
                Learn features
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

          </section>

          {/* Visual / product card */}
          <aside className="relative">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl" />
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src="/logo.svg" alt="BB-Bot" className="h-10 w-10" />
                  <div>
                    <p className="text-sm font-medium">Basketball Assistant</p>
                    <p className="text-xs text-stone-500">Concise answers, play diagrams, and drill suggestions</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-black">Free</div>
              </div>

              <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-white/6 backdrop-blur-sm">
                <div className="flex h-full w-full items-center justify-center text-stone-400">
                  <img src="/image.png" alt="BB-Bot preview" />
                </div>
              </div>
            </div>
          </aside>
        </div>
        {/* Features section */}
        <div id="features" className="mx-auto mt-12 max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-semibold">What BB‑Bot does</h2>
            <p className="mt-2 text-sm text-stone-600">Sleek, practice-ready answers — drills, plays, and quick stats with coach-friendly output.</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Play className="h-5 w-5" />}
              iconClass="bg-amber-50 text-amber-600"
              title="Playbook Explanations"
              description="Step-by-step breakdowns, recommended reads, and diagrams you can share with the team."
              badge={<div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-100/40 blur-2xl opacity-30 group-hover:opacity-40" />}
            />

            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              iconClass="bg-cyan-50 text-cyan-600"
              title="Training Drills"
              description="Drills with reps, cues, and progressions tailored for the skill level you describe."
              badge={<div className="pointer-events-none absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-cyan-100/30 blur-2xl opacity-30 group-hover:opacity-40" />}
            />

            <FeatureCard
              icon={<BarChart2 className="h-5 w-5" />}
              iconClass="bg-violet-50 text-violet-600"
              title="Stats & Insights"
              description="Quick comparisons, trends, and scouting highlights pulled into concise summaries."
            />

            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              iconClass="bg-emerald-50 text-emerald-600"
              title="Coach Tools"
              description="Shareable snippets and practice plans — export-friendly and concise for in-session use."
            />

            <FeatureCard
              icon={<ArrowUpRight className="h-5 w-5" />}
              iconClass="bg-rose-50 text-rose-600"
              title="Varun Context"
              description="When asked, BB‑Bot can reference Varun's work profile — kept separate and clearly indicated in answers."
            />

            <FeatureCard
              icon={<MessageCircle className="h-5 w-5" />}
              iconClass="bg-stone-50 text-stone-700"
              title="Fast Chat"
              description="Real-time answers with clear source labeling — ideal for quick practice-room decisions."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
