import React from 'react';
import { Check } from 'lucide-react';

export default function PricingTable({ props }) {
  const { headline, subtitle, plans, paddingY, paddingX } = props;
  return (
    <section
      className="relative"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans?.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-2xl border transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-purple-900/30 to-slate-800/60 border-purple-500/40 shadow-xl shadow-purple-900/20 scale-105'
                  : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                <span className="text-slate-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features?.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-purple-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30'
                    : 'bg-slate-700/50 text-white hover:bg-slate-700/80 border border-slate-600'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
