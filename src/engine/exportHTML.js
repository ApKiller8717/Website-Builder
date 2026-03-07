// ============================================
// HTML/CSS Export Engine
// ============================================

export function generateHTML(components) {
  const sections = components.map(c => generateSectionHTML(c)).join('\n\n');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <style>
${generateCSS()}
  </style>
</head>
<body>
${sections}
</body>
</html>`;
}

function generateCSS() {
  return `    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: #020617; color: #f1f5f9; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
    .container-sm { max-width: 512px; margin: 0 auto; }
    .container-md { max-width: 768px; margin: 0 auto; }
    .container-lg { max-width: 1024px; margin: 0 auto; }
    .text-center { text-align: center; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .gap-4 { gap: 1rem; }
    .gap-6 { gap: 1.5rem; }
    .gap-8 { gap: 2rem; }
    .grid { display: grid; }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
    h1 { font-size: 3.5rem; font-weight: 800; line-height: 1.1; }
    h2 { font-size: 2.25rem; font-weight: 700; line-height: 1.2; }
    h3 { font-size: 1.25rem; font-weight: 600; }
    .text-slate-300 { color: #cbd5e1; }
    .text-slate-400 { color: #94a3b8; }
    .text-purple-400 { color: #c084fc; }
    .section { padding: 5rem 1.5rem; }
    .card { background: rgba(30,41,59,0.4); border: 1px solid rgba(51,65,85,0.5); border-radius: 1rem; padding: 1.5rem; }
    .btn-primary { display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, #9333ea, #6366f1); color: #fff; font-weight: 600; border-radius: 0.75rem; border: none; cursor: pointer; font-size: 1rem; }
    .btn-outline { display: inline-block; padding: 1rem 2rem; border: 1px solid #475569; color: #cbd5e1; font-weight: 600; border-radius: 0.75rem; background: transparent; cursor: pointer; font-size: 1rem; }
    @media (max-width: 768px) {
      h1 { font-size: 2.25rem; }
      h2 { font-size: 1.75rem; }
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    }`;
}

function generateSectionHTML(component) {
  const { type, props: p } = component;
  const py = p.paddingY ? `padding-top: ${p.paddingY * 4}px; padding-bottom: ${p.paddingY * 4}px;` : '';
  const px = p.paddingX ? `padding-left: ${p.paddingX * 4}px; padding-right: ${p.paddingX * 4}px;` : '';
  const style = `style="${py} ${px}"`;

  switch (type) {
    case 'nav-standard':
      return `  <nav ${style}>
    <div class="container flex items-center justify-between">
      <span style="font-size:1.25rem;font-weight:700;color:#fff">${p.brand}</span>
      <div class="flex gap-8">
        ${(p.links || []).map(l => `<a href="#" style="color:#94a3b8;text-decoration:none">${l}</a>`).join('\n        ')}
      </div>
      <button class="btn-primary" style="padding:0.5rem 1.25rem;font-size:0.875rem">${p.ctaText}</button>
    </div>
  </nav>`;

    case 'hero-centered':
      return `  <section ${style} style="position:relative;${py}${px}">
    <div class="container text-center" style="max-width:56rem;margin:0 auto">
      ${p.badge ? `<div style="display:inline-block;padding:0.5rem 1rem;border-radius:9999px;background:rgba(147,51,234,0.1);border:1px solid rgba(147,51,234,0.2);color:#d8b4fe;font-size:0.875rem;margin-bottom:2rem">${p.badge}</div>` : ''}
      <h1 style="margin-bottom:1.5rem">${p.headline}</h1>
      <p class="text-slate-300" style="font-size:1.25rem;max-width:42rem;margin:0 auto 2.5rem">${p.subtitle}</p>
      <div class="flex items-center justify-center gap-4">
        <button class="btn-primary">${p.ctaPrimary}</button>
        ${p.ctaSecondary ? `<button class="btn-outline">${p.ctaSecondary}</button>` : ''}
      </div>
    </div>
  </section>`;

    case 'hero-split':
      return `  <section ${style}>
    <div class="container grid grid-2 gap-8 items-center">
      <div>
        <h1 style="margin-bottom:1.5rem">${p.headline}</h1>
        <p class="text-slate-300" style="font-size:1.125rem;margin-bottom:2rem">${p.subtitle}</p>
        <button class="btn-primary">${p.ctaPrimary}</button>
      </div>
      <div class="card" style="padding:2rem">
        <div style="height:12rem;background:linear-gradient(135deg,rgba(147,51,234,0.1),rgba(99,102,241,0.1));border-radius:0.75rem"></div>
      </div>
    </div>
  </section>`;

    case 'features-grid':
      return `  <section ${style}>
    <div class="container">
      <div class="text-center" style="margin-bottom:4rem">
        <h2 style="margin-bottom:1rem">${p.headline}</h2>
        <p class="text-slate-400" style="font-size:1.125rem">${p.subtitle}</p>
      </div>
      <div class="grid grid-${Math.min(p.columns || 3, 4)} gap-6">
        ${(p.features || []).map(f => `<div class="card">
          <h3 style="margin-bottom:0.5rem">${f.title}</h3>
          <p class="text-slate-400" style="font-size:0.875rem">${f.desc}</p>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>`;

    case 'testimonials-cards':
      return `  <section ${style}>
    <div class="container">
      <div class="text-center" style="margin-bottom:3.5rem">
        <h2 style="margin-bottom:1rem">${p.headline}</h2>
        <p class="text-slate-400">${p.subtitle}</p>
      </div>
      <div class="grid grid-3 gap-6">
        ${(p.testimonials || []).map(t => `<div class="card">
          <p class="text-slate-300" style="font-style:italic;margin-bottom:1.5rem">"${t.quote}"</p>
          <div><strong style="color:#fff">${t.name}</strong><br><small class="text-slate-400">${t.role}</small></div>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>`;

    case 'pricing-table':
      return `  <section ${style}>
    <div class="container">
      <div class="text-center" style="margin-bottom:3.5rem">
        <h2 style="margin-bottom:1rem">${p.headline}</h2>
        <p class="text-slate-400">${p.subtitle}</p>
      </div>
      <div class="grid grid-3 gap-6">
        ${(p.plans || []).map(plan => `<div class="card" style="${plan.highlighted ? 'border-color:rgba(147,51,234,0.4);' : ''}">
          <h3>${plan.name}</h3>
          <p class="text-slate-400" style="font-size:0.875rem;margin-bottom:1rem">${plan.desc}</p>
          <div style="font-size:2.5rem;font-weight:800;margin-bottom:1.5rem">$${plan.price}<small class="text-slate-400" style="font-size:1rem;font-weight:400">${plan.period}</small></div>
          <ul style="list-style:none;margin-bottom:2rem">${(plan.features || []).map(f => `<li style="padding:0.25rem 0;color:#cbd5e1;font-size:0.875rem">✓ ${f}</li>`).join('')}</ul>
          <button class="${plan.highlighted ? 'btn-primary' : 'btn-outline'}" style="width:100%;text-align:center">${plan.cta}</button>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>`;

    case 'footer-standard':
      return `  <footer ${style} style="border-top:1px solid #1e293b;${py}${px}">
    <div class="container">
      <div class="grid grid-4 gap-8" style="margin-bottom:3rem">
        <div>
          <strong style="font-size:1.25rem;color:#fff">${p.brand}</strong>
          <p class="text-slate-400" style="margin-top:1rem;font-size:0.875rem">${p.tagline}</p>
        </div>
        ${(p.columns || []).map(col => `<div>
          <h4 style="font-weight:600;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:1rem">${col.title}</h4>
          ${(col.links || []).map(l => `<div style="margin-bottom:0.5rem"><a href="#" class="text-slate-400" style="text-decoration:none;font-size:0.875rem">${l}</a></div>`).join('')}
        </div>`).join('\n        ')}
      </div>
      <div style="border-top:1px solid #1e293b;padding-top:1.5rem;text-align:center">
        <p class="text-slate-400" style="font-size:0.875rem">© 2026 ${p.brand}. All rights reserved.</p>
      </div>
    </div>
  </footer>`;

    default:
      return `  <!-- ${type} section -->
  <section ${style}>
    <div class="container text-center">
      <p class="text-slate-400">Component: ${type}</p>
    </div>
  </section>`;
  }
}
