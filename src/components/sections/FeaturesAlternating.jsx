import React from 'react';

export default function FeaturesAlternating({ props }) {
  const { features, paddingY, paddingX } = props;
  return (
    <section
      className="relative"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {features?.map((feat, i) => (
          <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}>
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{feat.title}</h3>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">{feat.desc}</p>
              <a className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition cursor-pointer">
                Learn more →
              </a>
            </div>
            <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl" />
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
                  <div className="p-8 space-y-3 w-full">
                    <div className="h-3 bg-slate-700/60 rounded w-4/5" />
                    <div className="h-3 bg-slate-700/60 rounded w-3/5" />
                    <div className="h-20 bg-purple-600/10 rounded-lg mt-4 border border-purple-500/10" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-14 bg-slate-700/30 rounded-lg" />
                      <div className="h-14 bg-slate-700/30 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
