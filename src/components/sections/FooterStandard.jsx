import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function FooterStandard({ props }) {
  const { brand, tagline, columns, paddingY, paddingX } = props;
  return (
    <footer
      className="relative bg-slate-900/80 border-t border-slate-800"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-lg font-bold text-white">{brand}</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">{tagline}</p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {columns?.map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links?.map((link, j) => (
                  <li key={j}>
                    <a className="text-sm text-slate-400 hover:text-white transition cursor-pointer">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2026 {brand}. All rights reserved.</p>
          <div className="flex gap-5 text-sm text-slate-500">
            <a className="hover:text-white transition cursor-pointer">Privacy</a>
            <a className="hover:text-white transition cursor-pointer">Terms</a>
            <a className="hover:text-white transition cursor-pointer">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
