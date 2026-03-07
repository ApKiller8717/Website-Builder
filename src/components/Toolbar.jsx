import React from 'react';
import {
  Monitor, Tablet, Smartphone, Download, Upload, Undo2, Redo2,
  Trash2, Layers, Sparkles, Code, Eye
} from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';

export default function Toolbar() {
  const {
    viewMode, setViewMode, toggleExportModal, toggleAIConverter,
    undo, redo, clearCanvas, components, historyIndex, history
  } = useBuilder();

  const viewModes = [
    { mode: 'desktop', icon: Monitor, label: 'Desktop' },
    { mode: 'tablet', icon: Tablet, label: 'Tablet' },
    { mode: 'mobile', icon: Smartphone, label: 'Mobile' },
  ];

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <header className="h-14 flex-shrink-0 flex items-center justify-between px-4 bg-surface-900/90 border-b border-slate-800 backdrop-blur-sm z-50">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">PageCraft <span className="text-purple-400 text-sm font-semibold">Pro</span></span>
        </div>
        <div className="w-px h-6 bg-slate-800 mx-2" />
        <div className="flex items-center gap-0.5 text-xs text-slate-500">
          <Layers size={12} />
          <span>{components.length} sections</span>
        </div>
      </div>

      {/* Center: Responsive Controls */}
      <div className="flex items-center gap-1 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
        {viewModes.map(({ mode, icon: Icon, label }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === mode
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
            data-tooltip={label}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
          data-tooltip="Undo"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
          data-tooltip="Redo"
        >
          <Redo2 size={16} />
        </button>

        <div className="w-px h-6 bg-slate-800 mx-1" />

        <button
          onClick={toggleAIConverter}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 transition"
          data-tooltip="AI Code Converter"
        >
          <Code size={15} />
          <span className="hidden md:inline">AI Convert</span>
        </button>

        <button
          onClick={toggleExportModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/20"
        >
          <Download size={15} />
          <span className="hidden md:inline">Export</span>
        </button>

        <div className="w-px h-6 bg-slate-800 mx-1" />

        <button
          onClick={clearCanvas}
          disabled={components.length === 0}
          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          data-tooltip="Clear Canvas"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </header>
  );
}
