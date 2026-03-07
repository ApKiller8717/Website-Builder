import React from 'react';

export default function FooterMinimal({ props }) {
  const { brand, links, copyright, paddingY, paddingX } = props;
  return (
    <footer
      className="relative border-t border-slate-800"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold text-white">{brand}</span>
        <div className="flex items-center gap-6">
          {links?.map((link, i) => (
            <a key={i} className="text-sm text-slate-400 hover:text-white transition cursor-pointer">{link}</a>
          ))}
        </div>
        <p className="text-sm text-slate-500">{copyright}</p>
      </div>
    </footer>
  );
}
