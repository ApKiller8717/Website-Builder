import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactSplit({ props }) {
  const { paddingY, paddingX } = props;
  return (
    <section
      className="relative"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Info Panel */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Let's Connect</h2>
            <p className="text-slate-400 leading-relaxed">Have a project in mind? We're here to help bring your vision to life.</p>
          </div>
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'hello@pagecraft.io' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: MapPin, label: 'Office', value: 'San Francisco, CA' },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                  <Icon size={20} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
                  <div className="text-white font-medium">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Panel */}
        <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 resize-none"
            />
            <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2">
              <Send size={18} /> Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
