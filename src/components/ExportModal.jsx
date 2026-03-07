import React, { useState, useMemo } from 'react';
import {
  X, Download, FileCode, Globe, Smartphone, Code,
  ChevronRight, Check, Loader2
} from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import { generateHTML } from '../engine/exportHTML';
import { generateReactExport } from '../engine/exportReact';
import { downloadAsZip } from '../engine/zipGenerator';
import CodePreview from './CodePreview';

const exportFormats = [
  {
    id: 'html',
    label: 'HTML / CSS',
    description: 'Clean, production-ready HTML with inline styles',
    icon: Globe,
    category: 'Web',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'react',
    label: 'React + Tailwind',
    description: 'JSX components with Tailwind CSS utilities',
    icon: Code,
    category: 'Web',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    description: 'Server-side rendered Next.js app with config',
    icon: FileCode,
    category: 'Web',
    color: 'from-gray-400 to-gray-600',
  },
  {
    id: 'flutter',
    label: 'Flutter (Dart)',
    description: 'Material Design widgets for iOS & Android',
    icon: Smartphone,
    category: 'Mobile',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'react-native',
    label: 'React Native',
    description: 'Cross-platform mobile with Expo',
    icon: Smartphone,
    category: 'Mobile',
    color: 'from-purple-400 to-indigo-400',
  },
];

export default function ExportModal() {
  const { showExportModal, toggleExportModal, components } = useBuilder();
  const [selectedFormat, setSelectedFormat] = useState('html');
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const previewCode = useMemo(() => {
    if (!showPreview) return '';
    switch (selectedFormat) {
      case 'html': return generateHTML(components);
      case 'react': return generateReactExport(components);
      default: return `// Preview not available for ${selectedFormat}.\n// Download the ZIP to see the full project structure.`;
    }
  }, [selectedFormat, components, showPreview]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await downloadAsZip(components, selectedFormat);
    } catch (err) {
      console.error('Export failed:', err);
    }
    setIsExporting(false);
  };

  if (!showExportModal) return null;

  const webFormats = exportFormats.filter(f => f.category === 'Web');
  const mobileFormats = exportFormats.filter(f => f.category === 'Mobile');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-fade-in" onClick={toggleExportModal}>
      <div
        className="w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Download size={20} className="text-purple-400" />
              Export Project
            </h2>
            <p className="text-sm text-slate-400 mt-1">Choose a format and download as a ZIP archive</p>
          </div>
          <button onClick={toggleExportModal} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!showPreview ? (
            <>
              {/* Web formats */}
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Web</h3>
              <div className="space-y-2 mb-6">
                {webFormats.map(format => {
                  const Icon = format.icon;
                  const isSelected = selectedFormat === format.id;
                  return (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'border-purple-500/40 bg-purple-500/5'
                          : 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${format.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{format.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{format.description}</div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile formats */}
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Mobile</h3>
              <div className="space-y-2">
                {mobileFormats.map(format => {
                  const Icon = format.icon;
                  const isSelected = selectedFormat === format.id;
                  return (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'border-purple-500/40 bg-purple-500/5'
                          : 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${format.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{format.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{format.description}</div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            // Code Preview
            <div className="h-full">
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => setShowPreview(false)} className="text-sm text-purple-400 hover:text-purple-300 transition">
                  ← Back to formats
                </button>
                <span className="text-xs text-slate-500 font-mono">{selectedFormat.toUpperCase()}</span>
              </div>
              <CodePreview code={previewCode} language={selectedFormat === 'html' ? 'html' : 'jsx'} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-800">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
            disabled={components.length === 0}
          >
            <Code size={16} />
            {showPreview ? 'Back to Formats' : 'Preview Code'}
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || components.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <><Loader2 size={16} className="animate-spin" /> Exporting...</>
            ) : (
              <><Download size={16} /> Download .zip</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
