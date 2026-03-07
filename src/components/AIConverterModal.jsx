import React, { useState, useRef } from 'react';
import { X, Upload, Code, Copy, Check, Sparkles, ArrowRight, FileCode } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import { convertHTMLToFlutter } from '../engine/convertToFlutter';
import { convertHTMLToReactNative } from '../engine/convertToReactNative';
import CodePreview from './CodePreview';

const tabs = [
  { id: 'flutter', label: 'Flutter', icon: '🎯', language: 'dart' },
  { id: 'react-native', label: 'React Native', icon: '⚛️', language: 'jsx' },
];

export default function AIConverterModal() {
  const { showAIConverterModal, toggleAIConverter } = useBuilder();
  const [htmlInput, setHtmlInput] = useState('');
  const [activeTab, setActiveTab] = useState('flutter');
  const [convertedCode, setConvertedCode] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setHtmlInput(event.target.result);
      setConvertedCode('');
    };
    reader.readAsText(file);
  };

  const handleConvert = async () => {
    if (!htmlInput.trim()) return;
    
    setIsConverting(true);
    
    // Simulate AI processing delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      let result = '';
      if (activeTab === 'flutter') {
        result = convertHTMLToFlutter(htmlInput);
      } else {
        result = convertHTMLToReactNative(htmlInput);
      }
      setConvertedCode(result);
    } catch (err) {
      setConvertedCode(`// Error converting code:\n// ${err.message}`);
    }
    
    setIsConverting(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setConvertedCode('');
  };

  if (!showAIConverterModal) return null;

  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-fade-in" onClick={toggleAIConverter}>
      <div
        className="w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/30">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Code Converter</h2>
              <p className="text-sm text-slate-400">Upload HTML/CSS → Convert to Flutter or React Native</p>
            </div>
          </div>
          <button onClick={toggleAIConverter} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* Output format tabs */}
        <div className="flex items-center gap-1 px-6 pt-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'tab-active'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content: Side by side panels */}
        <div className="flex-1 grid grid-cols-2 gap-4 p-6 overflow-hidden">
          {/* Left: Input */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Upload size={14} className="text-slate-500" />
                Source HTML/CSS
              </h3>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                <FileCode size={12} />
                Upload File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".html,.htm,.css,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <textarea
              value={htmlInput}
              onChange={(e) => { setHtmlInput(e.target.value); setConvertedCode(''); }}
              placeholder={`Paste your HTML/CSS here or upload a file...

Example:
<div style="padding: 24px; background: #1e293b;">
  <h1 style="color: white; font-size: 32px;">Hello World</h1>
  <p style="color: #94a3b8;">Welcome to my page</p>
  <button style="background: #9333ea; color: white; padding: 12px 24px; border-radius: 8px;">
    Get Started
  </button>
</div>`}
              className="flex-1 w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 resize-none"
              spellCheck="false"
            />
          </div>

          {/* Right: Output */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Code size={14} className="text-cyan-400" />
                {activeTabInfo?.label} Output
              </h3>
              {convertedCode && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                >
                  {copied ? <><Check size={12} className="text-emerald-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
                </button>
              )}
            </div>
            <div className="flex-1 overflow-hidden rounded-xl border border-slate-800">
              {convertedCode ? (
                <CodePreview code={convertedCode} language={activeTabInfo?.language || 'dart'} />
              ) : (
                <div className="h-full flex items-center justify-center bg-slate-950/50 text-center p-8">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mx-auto mb-4">
                      <ArrowRight size={24} className="text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-500">
                      Paste HTML on the left and click <strong className="text-cyan-400">Convert</strong> to see the {activeTabInfo?.label} output
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-800">
          <div className="text-xs text-slate-500">
            Supports: HTML tags, inline styles, CSS classes, forms, images, lists
          </div>
          <button
            onClick={handleConvert}
            disabled={isConverting || !htmlInput.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConverting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Convert to {activeTabInfo?.label}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
