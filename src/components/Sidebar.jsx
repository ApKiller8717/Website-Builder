import React, { useState, useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Search, Plus, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import componentTemplates from '../data/componentTemplates';

function DraggableItem({ template, onQuickAdd }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${template.type}`,
    data: { type: 'sidebar-item', template },
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 50 }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-3 p-3 rounded-xl cursor-grab active:cursor-grabbing transition-all
        ${isDragging ? 'opacity-50 scale-95' : 'hover:bg-slate-800/60 hover:border-slate-700'}
        bg-slate-800/30 border border-slate-800`}
      {...attributes}
      {...listeners}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 flex items-center justify-center">
        <GripVertical size={14} className="text-purple-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white truncate">{template.label}</div>
        <div className="text-xs text-slate-500 truncate">{template.description}</div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onQuickAdd(template); }}
        className="opacity-0 group-hover:opacity-100 flex-shrink-0 w-7 h-7 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 flex items-center justify-center text-purple-400 transition-all"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default function Sidebar() {
  const { addComponent } = useBuilder();
  const [search, setSearch] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const filteredTemplates = useMemo(() => {
    if (!search.trim()) return componentTemplates;
    const q = search.toLowerCase();
    return componentTemplates
      .map(cat => ({
        ...cat,
        items: cat.items.filter(
          item =>
            item.label.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            cat.category.toLowerCase().includes(q)
        ),
      }))
      .filter(cat => cat.items.length > 0);
  }, [search]);

  const toggleCategory = (cat) => {
    setCollapsedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <aside className="w-72 flex-shrink-0 h-full flex flex-col bg-surface-900/80 border-r border-slate-800 animate-slide-left">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Components</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition"
          />
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {filteredTemplates.map((category) => {
          const Icon = category.icon;
          const isCollapsed = collapsedCategories[category.category];
          return (
            <div key={category.category} className="mb-2">
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-800/40 transition text-left"
              >
                {isCollapsed ? <ChevronRight size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
                <Icon size={16} className="text-purple-400" />
                <span className="text-sm font-medium text-slate-300 flex-1">{category.category}</span>
                <span className="text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded-full">{category.items.length}</span>
              </button>
              {!isCollapsed && (
                <div className="mt-1 ml-2 space-y-1.5 animate-fade-in">
                  {category.items.map((template) => (
                    <DraggableItem
                      key={template.type}
                      template={template}
                      onQuickAdd={addComponent}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-sm">
            No components match "{search}"
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="p-3 border-t border-slate-800">
        <div className="text-xs text-slate-600 text-center">
          {componentTemplates.reduce((sum, c) => sum + c.items.length, 0)} components available
        </div>
      </div>
    </aside>
  );
}
