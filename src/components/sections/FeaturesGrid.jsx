import React from 'react';
import { Zap, Shield, Globe, Users, Sparkles, Heart } from 'lucide-react';

const iconMap = { Zap, Shield, Globe, Users, Sparkles, Heart };

export default function FeaturesGrid({ props }) {
  const { headline, subtitle, columns = 3, features, paddingY, paddingX } = props;
  const gridCols = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' };

  return (
    <section
      className="relative"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid ${gridCols[columns] || gridCols[3]} gap-6`}>
          {features?.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Zap;
            return (
              <div key={i} className="group p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-purple-500/30 hover:bg-slate-800/70 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:from-purple-600/30 group-hover:to-indigo-600/30 transition-all">
                  <Icon size={22} className="text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
