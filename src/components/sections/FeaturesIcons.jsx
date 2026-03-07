import React from 'react';
import { Zap, Shield, Globe, Sparkles } from 'lucide-react';

const iconMap = { Zap, Shield, Globe, Sparkles };

export default function FeaturesIcons({ props }) {
  const { headline, subtitle, features, columns = 2, paddingY, paddingX } = props;
  const gridCols = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' };
  return (
    <section
      className="relative bg-slate-900/50"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid ${gridCols[columns] || gridCols[2]} gap-8`}>
          {features?.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Zap;
            return (
              <div key={i} className="flex gap-5 p-5 rounded-xl hover:bg-slate-800/40 transition-all">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
