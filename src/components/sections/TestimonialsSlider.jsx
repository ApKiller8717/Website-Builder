import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function TestimonialsSlider({ props }) {
  const { testimonials, paddingY, paddingX } = props;
  const [current, setCurrent] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;
  const t = testimonials[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="flex gap-1 justify-center mb-6">
          {Array.from({ length: t.rating || 5 }).map((_, j) => (
            <Star key={j} size={20} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <blockquote className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8 italic font-light">
          "{t.quote}"
        </blockquote>
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <User size={22} className="text-white" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-white">{t.name}</div>
            <div className="text-sm text-slate-400">{t.role}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrent(c => (c > 0 ? c - 1 : testimonials.length - 1))}
            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700/50 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-purple-500 w-8' : 'bg-slate-600 hover:bg-slate-500'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent(c => (c < testimonials.length - 1 ? c + 1 : 0))}
            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700/50 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
