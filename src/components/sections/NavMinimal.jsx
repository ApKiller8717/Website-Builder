import React from 'react';

export default function NavMinimal({ props }) {
  const { brand, links, paddingY, paddingX } = props;
  return (
    <nav
      className="w-full"
      style={{ paddingTop: `${paddingY * 4}px`, paddingBottom: `${paddingY * 4}px`, paddingLeft: `${paddingX * 4}px`, paddingRight: `${paddingX * 4}px` }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-10">
        <span className="text-lg font-bold text-white mr-8">{brand}</span>
        {links?.map((link, i) => (
          <a key={i} className="text-sm text-slate-400 hover:text-white transition cursor-pointer tracking-wide uppercase">{link}</a>
        ))}
      </div>
    </nav>
  );
}
