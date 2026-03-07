import React from 'react';

export default function HeroCentered({ props }) {
  const { badge, headline, subtitle, ctaPrimary, ctaSecondary, paddingY, paddingX, maxWidth } = props;
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900 to-indigo-900/40" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />

      <div className={`relative max-w-${maxWidth || '4xl'} mx-auto text-center`}>
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8 animate-float">
            {badge}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-xl shadow-purple-900/40 text-lg">
            {ctaPrimary}
          </button>
          {ctaSecondary && (
            <button className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-white/5 hover:border-slate-500 transition-all text-lg">
              {ctaSecondary}
            </button>
          )}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex items-center justify-center gap-8 opacity-40">
          {['Google', 'Microsoft', 'Spotify', 'Slack'].map((b, i) => (
            <span key={i} className="text-sm font-semibold text-slate-400 tracking-wider uppercase">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
