import React from 'react';
import { Play } from 'lucide-react';

export default function HeroVideo({ props }) {
  const { headline, subtitle, ctaPrimary, paddingY, paddingX } = props;
  return (
    <section
      className="relative overflow-hidden bg-slate-950"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          {headline}
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Video play area */}
        <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-purple-900/20">
          <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-900/50 group-hover:scale-110 transition-transform">
              <Play size={32} className="text-white ml-1" fill="white" />
            </div>
          </div>
        </div>

        <button className="mt-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-xl shadow-purple-900/40 text-lg">
          {ctaPrimary}
        </button>
      </div>
    </section>
  );
}
