// ============================================
// React + Tailwind Export Engine
// ============================================

export function generateReactExport(components) {
  const imports = new Set();
  imports.add("import React from 'react';");

  const sectionCodes = components.map((c, i) => generateReactSection(c, i, imports));

  const componentCode = `${Array.from(imports).join('\n')}

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
${sectionCodes.map(s => `      ${s}`).join('\n')}
    </div>
  );
}`;

  return componentCode;
}

function generateReactSection(component, index, imports) {
  const { type, props: p } = component;
  const py = p.paddingY ? `py-[${p.paddingY * 4}px]` : '';
  const px = p.paddingX ? `px-[${p.paddingX * 4}px]` : '';
  const spacing = `${py} ${px}`.trim();

  switch (type) {
    case 'nav-standard':
      return `<nav className="${spacing}">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-lg font-bold text-white">${p.brand}</span>
          <div className="hidden md:flex items-center gap-8">
            ${(p.links || []).map(l => `<a href="#" className="text-sm text-slate-300 hover:text-white transition">${l}</a>`).join('\n            ')}
          </div>
          <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all">${p.ctaText}</button>
        </div>
      </nav>`;

    case 'hero-centered':
      return `<section className="relative overflow-hidden ${spacing}">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900 to-indigo-900/40" />
        <div className="relative max-w-4xl mx-auto text-center">
          ${p.badge ? `<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8">${p.badge}</div>` : ''}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">${p.headline}</h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">${p.subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-xl text-lg">${p.ctaPrimary}</button>
            ${p.ctaSecondary ? `<button className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-white/5 transition-all text-lg">${p.ctaSecondary}</button>` : ''}
          </div>
        </div>
      </section>`;

    case 'hero-split':
      return `<section className="relative overflow-hidden ${spacing}">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">${p.headline}</h1>
            <p className="text-lg text-slate-300 mb-8">${p.subtitle}</p>
            <button className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl">${p.ctaPrimary}</button>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg" />
          </div>
        </div>
      </section>`;

    case 'features-grid': {
      const gridCols = { 1: 'grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };
      return `<section className="${spacing}">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">${p.headline}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">${p.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 ${gridCols[p.columns] || gridCols[3]} gap-6">
            ${(p.features || []).map(f => `<div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-purple-500/30 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2">${f.title}</h3>
              <p className="text-sm text-slate-400">${f.desc}</p>
            </div>`).join('\n            ')}
          </div>
        </div>
      </section>`;
    }

    case 'testimonials-cards':
      return `<section className="${spacing}">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">${p.headline}</h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">${p.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${(p.testimonials || []).map(t => `<div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <p className="text-slate-300 mb-6 italic">"${t.quote}"</p>
              <div><strong className="text-white text-sm">${t.name}</strong><br/><span className="text-xs text-slate-400">${t.role}</span></div>
            </div>`).join('\n            ')}
          </div>
        </div>
      </section>`;

    case 'pricing-table':
      return `<section className="${spacing}">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">${p.headline}</h2>
            <p className="text-lg text-slate-400">${p.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${(p.plans || []).map(plan => `<div className="p-8 rounded-2xl border ${plan.highlighted ? 'bg-gradient-to-b from-purple-900/30 to-slate-800/60 border-purple-500/40 shadow-xl scale-105' : 'bg-slate-800/40 border-slate-700/50'}">
              <h3 className="text-xl font-bold text-white mb-1">${plan.name}</h3>
              <p className="text-sm text-slate-400 mb-6">${plan.desc}</p>
              <div className="text-4xl font-extrabold text-white mb-6">$${plan.price}<span className="text-base font-normal text-slate-400">${plan.period}</span></div>
              <ul className="space-y-3 mb-8">${(plan.features || []).map(f => `<li className="flex items-center gap-3 text-sm text-slate-300">✓ ${f}</li>`).join('')}</ul>
              <button className="w-full py-3 rounded-xl font-semibold ${plan.highlighted ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-slate-700/50 text-white border border-slate-600'}">${plan.cta}</button>
            </div>`).join('\n            ')}
          </div>
        </div>
      </section>`;

    case 'footer-standard':
      return `<footer className="border-t border-slate-800 ${spacing}">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <span className="text-lg font-bold text-white">${p.brand}</span>
            <p className="text-sm text-slate-400 mt-4">${p.tagline}</p>
          </div>
          ${(p.columns || []).map(col => `<div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">${col.title}</h4>
            ${(col.links || []).map(l => `<a href="#" className="block text-sm text-slate-400 hover:text-white transition mb-2">${l}</a>`).join('\n            ')}
          </div>`).join('\n          ')}
        </div>
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-500">© 2026 ${p.brand}. All rights reserved.</p>
        </div>
      </footer>`;

    default:
      return `{/* ${type} */}
      <section className="${spacing}">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">${type}</p>
        </div>
      </section>`;
  }
}
