import React, { useRef, useEffect } from 'react';

// Lightweight syntax highlighter (no external dependency)
function highlightCode(code, language) {
  if (!code) return '';
  
  // Escape HTML
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Keywords
  const jsKeywords = /\b(import|export|from|const|let|var|function|return|if|else|switch|case|break|default|new|class|extends|this|super|async|await|try|catch|throw|typeof|instanceof|void|null|undefined|true|false)\b/g;
  const dartKeywords = /\b(import|class|extends|const|final|var|void|return|if|else|switch|case|break|default|new|this|super|Widget|BuildContext|override|static|required|String|int|double|bool|List|Map|Key)\b/g;
  const htmlTags = /(&lt;\/?)([\w-]+)/g;

  // Apply highlighting based on language
  if (language === 'html') {
    html = html
      .replace(htmlTags, '$1<span style="color:#c084fc">$2</span>')
      .replace(/(&lt;!DOCTYPE|&lt;!--[\s\S]*?--&gt;)/g, '<span style="color:#64748b">$1</span>')
      .replace(/([\w-]+)=(&quot;|")/g, '<span style="color:#38bdf8">$1</span>=<span style="color:#4ade80">"</span>')
      .replace(/(".*?")/g, '<span style="color:#4ade80">$1</span>');
  } else if (language === 'dart') {
    html = html
      .replace(dartKeywords, '<span style="color:#c084fc">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span style="color:#64748b">$1</span>')
      .replace(/('.*?')/g, '<span style="color:#4ade80">$1</span>');
  } else {
    // JSX / JavaScript
    html = html
      .replace(jsKeywords, '<span style="color:#c084fc">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span style="color:#64748b">$1</span>')
      .replace(/(&lt;\/?)([\w]+)/g, '$1<span style="color:#f472b6">$2</span>')
      .replace(/('.*?'|".*?")/g, '<span style="color:#4ade80">$1</span>')
      .replace(/(className|style|onClick|onChange|onPress|disabled|placeholder|key|ref|src|type|value|href)=/g, '<span style="color:#38bdf8">$1</span>=');
  }

  return html;
}

export default function CodePreview({ code, language = 'jsx' }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightCode(code, language);
    }
  }, [code, language]);

  const lines = code ? code.split('\n') : [];

  return (
    <div className="h-full overflow-auto bg-slate-950 rounded-xl">
      <div className="flex">
        {/* Line numbers */}
        <div className="flex-shrink-0 py-4 px-3 text-right select-none border-r border-slate-800/50">
          {lines.map((_, i) => (
            <div key={i} className="text-xs text-slate-700 leading-6 font-mono">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Code content */}
        <pre
          ref={codeRef}
          className="flex-1 py-4 px-4 text-sm leading-6 font-mono text-slate-300 overflow-x-auto whitespace-pre"
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  );
}
