import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export default function FooterCta({ props }) {
  const { headline, subtitle, ctaText, brand, paddingY, paddingX } = props;
  return (
    <footer
      className="relative overflow-hidden"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto mb-16">
        <div className="relative p-12 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
            <p className="text-lg text-purple-100 mb-8 max-w-lg mx-auto">{subtitle}</p>
            <button className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all shadow-xl flex items-center gap-2 mx-auto">
              {ctaText} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter + Bottom */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Stay Updated</h3>
            <p className="text-sm text-slate-400">Get the latest news and updates.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="your@email.com"
                className="pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 w-64"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between pt-6">
          <span className="text-sm text-slate-500">© 2026 {brand}. All rights reserved.</span>
          <div className="flex gap-5 text-sm text-slate-500">
            <a className="hover:text-white transition cursor-pointer">Privacy</a>
            <a className="hover:text-white transition cursor-pointer">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
