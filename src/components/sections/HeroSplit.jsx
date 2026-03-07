import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSplit({ props }) {
  const { headline, subtitle, ctaPrimary, ctaSecondary, paddingY, paddingX } = props;
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {headline}
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex items-center gap-4">
            <button className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30 flex items-center gap-2">
              {ctaPrimary} <ArrowRight size={18} />
            </button>
            {ctaSecondary && (
              <button className="px-7 py-3.5 text-slate-300 font-medium hover:text-white transition">
                {ctaSecondary}
              </button>
            )}
          </div>
          {/* Avatar stack */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-3">
              {[0,1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-white" style={{ background: `hsl(${260 + i * 30}, 60%, ${45 + i * 5}%)` }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-slate-400">Trusted by <strong className="text-purple-400">10,000+</strong> developers</span>
          </div>
        </div>

        {/* Right: Mock UI card */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-3xl blur-2xl" />
          <div className="relative bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            {/* Window dots */}
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            {/* Mock content */}
            <div className="space-y-3">
              <div className="h-4 bg-slate-700/60 rounded w-3/4" />
              <div className="h-4 bg-slate-700/60 rounded w-1/2" />
              <div className="h-24 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg mt-4 flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
                  <span className="text-purple-300 text-xl">⚡</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-slate-700/40 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
