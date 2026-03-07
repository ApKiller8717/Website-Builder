import React, { useCallback, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { BuilderProvider, useBuilder } from './context/BuilderContext';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import ExportModal from './components/ExportModal';
import AIConverterModal from './components/AIConverterModal';

function BuilderLayout() {
  const {
    components, addComponent, reorderComponents,
    setDragging, undo, redo,
  } = useBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleDragStart = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleDragEnd = useCallback((event) => {
    setDragging(false);
    const { active, over } = event;
    if (!over) return;

    // Sidebar item dropped on canvas
    if (active.data.current?.type === 'sidebar-item') {
      const template = active.data.current.template;
      addComponent(template);
      return;
    }

    // Canvas reorder
    if (active.id !== over.id) {
      const oldIndex = components.findIndex(c => c.id === active.id);
      const newIndex = components.findIndex(c => c.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderComponents(arrayMove(components, oldIndex, newIndex));
      }
    }
  }, [components, addComponent, reorderComponents, setDragging]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-surface-950">
        <Toolbar />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <Canvas />
          <PropertiesPanel />
        </div>
      </div>

      {/* Modals */}
      <ExportModal />
      <AIConverterModal />

      {/* Drag overlay (visual feedback) */}
      <DragOverlay>
        {null}
      </DragOverlay>
    </DndContext>
  );
}

export default function App() {
  return (
    <BuilderProvider>
      <BuilderLayout />
    </BuilderProvider>
  );
}
