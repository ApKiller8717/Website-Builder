import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function PricingCards({ props }) {
  const { headline, plans, paddingY, paddingX } = props;
  return (
    <section
      className="relative bg-slate-900/50"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans?.map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30'
                  : 'bg-slate-800/30 border-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-slate-400">{plan.desc}</p>
                </div>
                <div className="text-3xl font-extrabold text-white">${plan.price}<span className="text-base font-normal text-slate-400">/mo</span></div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features?.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                plan.highlighted
                  ? 'bg-white text-slate-900 hover:bg-slate-100'
                  : 'bg-slate-700/50 text-white hover:bg-slate-700 border border-slate-600'
              }`}>
                {plan.cta} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
