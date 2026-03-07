import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical, ChevronUp, ChevronDown, Copy, Trash2, MousePointer
} from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import ComponentRenderer from './ComponentRenderer';

function SortableCanvasItem({ component }) {
  const {
    selectComponent, selectedId, removeComponent,
    moveComponent, duplicateComponent,
  } = useBuilder();

  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging,
  } = useSortable({ id: component.id });

  const isSelected = selectedId === component.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 40 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`canvas-component relative group ${isSelected ? 'selected' : ''} ${isDragging ? 'opacity-60' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectComponent(component.id); }}
    >
      {/* Floating toolbar */}
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 py-1.5 rounded-lg glass transition-all ${isSelected || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          <GripVertical size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); moveComponent(component.id, 'up'); }}
          className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition"
          title="Move up"
        >
          <ChevronUp size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); moveComponent(component.id, 'down'); }}
          className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition"
          title="Move down"
        >
          <ChevronDown size={14} />
        </button>
        <div className="w-px h-5 bg-slate-700 mx-0.5" />
        <button
          onClick={(e) => { e.stopPropagation(); duplicateComponent(component.id); }}
          className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition"
          title="Duplicate"
        >
          <Copy size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); removeComponent(component.id); }}
          className="p-1.5 rounded-md hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Component label */}
      <div className={`absolute top-2 left-2 z-20 px-2 py-0.5 rounded text-xs font-medium glass transition-all ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <span className="text-purple-300">{component.type}</span>
      </div>

      {/* Rendered component */}
      <ComponentRenderer component={component} />
    </div>
  );
}

export default function Canvas() {
  const { components, viewMode, deselect, isDragging } = useBuilder();

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop-zone' });

  const viewWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div
      className="flex-1 h-full overflow-auto bg-surface-950 p-6"
      onClick={deselect}
    >
      <div
        className="preview-frame mx-auto min-h-full"
        style={{ width: viewWidths[viewMode], maxWidth: '100%' }}
      >
        <div
          ref={setNodeRef}
          className={`min-h-[calc(100vh-120px)] rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden
            ${isOver || isDragging
              ? 'border-purple-500/50 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.1)]'
              : 'border-slate-800 bg-slate-900/30'
            }
          `}
        >
          {components.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] text-center p-8">
              <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-6 animate-pulse-glow">
                <MousePointer size={32} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Start Building</h3>
              <p className="text-slate-400 max-w-md mb-6">
                Drag components from the sidebar and drop them here, or click the <strong className="text-purple-400">+</strong> button to quick-add.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono text-xs">Ctrl+Z</span>
                <span>Undo</span>
                <span className="mx-2 text-slate-700">•</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono text-xs">Ctrl+Y</span>
                <span>Redo</span>
              </div>
            </div>
          ) : (
            <SortableContext
              items={components.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="divide-y divide-slate-800/30">
                {components.map((component) => (
                  <SortableCanvasItem
                    key={component.id}
                    component={component}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
}
