import React from 'react';

export default function NavStandard({ props }) {
  const { brand, links, ctaText, paddingY, paddingX } = props;
  return (
    <nav
      className="w-full"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-lg font-bold text-white">{brand}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links?.map((link, i) => (
            <a key={i} className="text-sm text-slate-300 hover:text-white transition cursor-pointer">{link}</a>
          ))}
        </div>
        <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30">
          {ctaText}
        </button>
      </div>
    </nav>
  );
}
