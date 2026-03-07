import React from 'react';

export default function HeroGradient({ props }) {
  const { headline, subtitle, ctaPrimary, stats, paddingY, paddingX } = props;
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-slate-900 to-indigo-900/60" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(147,51,234,0.15),_transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.15),_transparent_50%)]" />

      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-purple-500/10 rounded-2xl rotate-12 animate-float" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-indigo-500/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-xl shadow-purple-900/40 text-lg mb-16">
          {ctaPrimary}
        </button>

        {/* Stats row */}
        {stats && stats.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
