import React from 'react';
import { Settings, X, Type, Layout, Palette, Maximize2, ChevronDown } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';

const bgPresets = [
  { value: 'transparent', label: 'None', color: 'transparent' },
  { value: 'dark', label: 'Dark', color: '#0f172a' },
  { value: 'gradient-purple', label: 'Purple', color: 'linear-gradient(135deg, #581c87, #312e81)' },
  { value: 'gradient-mesh', label: 'Mesh', color: 'linear-gradient(135deg, #581c87, #0f172a, #312e81)' },
  { value: 'gradient-subtle', label: 'Subtle', color: 'linear-gradient(135deg, #1e1b4b20, transparent)' },
  { value: '#1e293b', label: 'Slate', color: '#1e293b' },
  { value: '#171717', label: 'Black', color: '#171717' },
  { value: '#0c0a09', label: 'Stone', color: '#0c0a09' },
];

const maxWidthOptions = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'];

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-6 first:mt-0">
      <Icon size={14} className="text-purple-400" />
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
    </div>
  );
}

function SliderField({ label, value, onChange, min = 0, max = 40, unit = '' }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-slate-400 w-20 flex-shrink-0">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <span className="text-xs text-slate-500 w-10 text-right font-mono">{value}{unit}</span>
    </div>
  );
}

function TextField({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-500">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition"
      />
    </div>
  );
}

export default function PropertiesPanel() {
  const { getSelectedComponent, updateComponentProps, selectedId, deselect } = useBuilder();

  const selected = getSelectedComponent();

  if (!selected) {
    return (
      <aside className="w-72 flex-shrink-0 h-full flex flex-col bg-surface-900/80 border-l border-slate-800 animate-slide-right">
        <div className="flex items-center justify-center h-full text-center p-6">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mx-auto mb-4">
              <Settings size={22} className="text-slate-600" />
            </div>
            <p className="text-sm text-slate-500">Select a component to edit its properties</p>
          </div>
        </div>
      </aside>
    );
  }

  const props = selected.props;

  const update = (key, val) => {
    updateComponentProps(selected.id, { [key]: val });
  };

  // Determine which text fields to show based on component type
  const textFields = [];
  if (props.brand !== undefined) textFields.push({ key: 'brand', label: 'Brand Name' });
  if (props.badge !== undefined) textFields.push({ key: 'badge', label: 'Badge Text' });
  if (props.headline !== undefined) textFields.push({ key: 'headline', label: 'Headline' });
  if (props.subtitle !== undefined) textFields.push({ key: 'subtitle', label: 'Subtitle' });
  if (props.ctaPrimary !== undefined) textFields.push({ key: 'ctaPrimary', label: 'Primary CTA' });
  if (props.ctaSecondary !== undefined) textFields.push({ key: 'ctaSecondary', label: 'Secondary CTA' });
  if (props.ctaText !== undefined) textFields.push({ key: 'ctaText', label: 'CTA Text' });
  if (props.tagline !== undefined) textFields.push({ key: 'tagline', label: 'Tagline' });
  if (props.copyright !== undefined) textFields.push({ key: 'copyright', label: 'Copyright' });

  return (
    <aside className="w-72 flex-shrink-0 h-full flex flex-col bg-surface-900/80 border-l border-slate-800 animate-slide-right">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Properties</h2>
          <p className="text-xs text-slate-500 mt-0.5">{selected.type}</p>
        </div>
        <button
          onClick={deselect}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Layout Section */}
        <SectionTitle icon={Layout} title="Layout" />
        
        {props.columns !== undefined && (
          <div>
            <label className="text-xs text-slate-500 mb-2 block">Columns</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => update('columns', n)}
                  className={`py-2 rounded-lg text-xs font-medium transition-all ${
                    props.columns === n
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  {n}-col
                </button>
              ))}
            </div>
          </div>
        )}

        {props.maxWidth !== undefined && (
          <div>
            <label className="text-xs text-slate-500 mb-2 block">Max Width</label>
            <select
              value={props.maxWidth}
              onChange={(e) => update('maxWidth', e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer"
            >
              {maxWidthOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        {/* Spacing Section */}
        <SectionTitle icon={Maximize2} title="Spacing" />
        
        {props.paddingY !== undefined && (
          <SliderField
            label="Vertical"
            value={props.paddingY}
            onChange={(v) => update('paddingY', v)}
            max={40}
          />
        )}

        {props.paddingX !== undefined && (
          <SliderField
            label="Horizontal"
            value={props.paddingX}
            onChange={(v) => update('paddingX', v)}
            max={20}
          />
        )}

        {/* Background Section */}
        <SectionTitle icon={Palette} title="Background" />

        <div className="grid grid-cols-4 gap-2">
          {bgPresets.map(bg => (
            <button
              key={bg.value}
              onClick={() => update('bgColor', bg.value)}
              className={`w-full aspect-square rounded-lg border-2 transition-all ${
                props.bgColor === bg.value ? 'border-purple-500 scale-110' : 'border-slate-700 hover:border-slate-500'
              }`}
              style={{ background: bg.color }}
              title={bg.label}
            >
              {bg.value === 'transparent' && (
                <div className="w-full h-full rounded-md bg-[repeating-conic-gradient(#334155_0%_25%,#1e293b_0%_50%)] bg-[length:8px_8px]" />
              )}
            </button>
          ))}
        </div>

        {/* Content Section */}
        {textFields.length > 0 && (
          <>
            <SectionTitle icon={Type} title="Content" />
            <div className="space-y-3">
              {textFields.map(field => (
                <TextField
                  key={field.key}
                  label={field.label}
                  value={props[field.key]}
                  onChange={(v) => update(field.key, v)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
