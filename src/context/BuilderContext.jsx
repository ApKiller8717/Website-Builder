import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BuilderContext = createContext(null);

const initialState = {
  components: [],
  selectedId: null,
  viewMode: 'desktop', // desktop | tablet | mobile
  showExportModal: false,
  showAIConverterModal: false,
  isDragging: false,
  history: [],
  historyIndex: -1,
};

function builderReducer(state, action) {
  switch (action.type) {
    case 'ADD_COMPONENT': {
      const newComponent = {
        ...action.payload,
        id: uuidv4(),
        props: { ...action.payload.defaultProps },
      };
      delete newComponent.defaultProps;
      const newComponents = [...state.components, newComponent];
      return {
        ...state,
        components: newComponents,
        selectedId: newComponent.id,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }

    case 'REMOVE_COMPONENT': {
      const newComponents = state.components.filter(c => c.id !== action.payload);
      return {
        ...state,
        components: newComponents,
        selectedId: state.selectedId === action.payload ? null : state.selectedId,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }

    case 'SELECT_COMPONENT':
      return { ...state, selectedId: action.payload };

    case 'DESELECT':
      return { ...state, selectedId: null };

    case 'UPDATE_COMPONENT_PROPS': {
      const newComponents = state.components.map(c =>
        c.id === action.payload.id
          ? { ...c, props: { ...c.props, ...action.payload.props } }
          : c
      );
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }

    case 'REORDER_COMPONENTS': {
      return {
        ...state,
        components: action.payload,
        history: [...state.history.slice(0, state.historyIndex + 1), action.payload],
        historyIndex: state.historyIndex + 1,
      };
    }

    case 'MOVE_COMPONENT': {
      const { id, direction } = action.payload;
      const idx = state.components.findIndex(c => c.id === id);
      if (idx === -1) return state;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= state.components.length) return state;
      const newComponents = [...state.components];
      [newComponents[idx], newComponents[newIdx]] = [newComponents[newIdx], newComponents[idx]];
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }

    case 'DUPLICATE_COMPONENT': {
      const idx = state.components.findIndex(c => c.id === action.payload);
      if (idx === -1) return state;
      const original = state.components[idx];
      const clone = { ...original, id: uuidv4(), props: { ...original.props } };
      const newComponents = [
        ...state.components.slice(0, idx + 1),
        clone,
        ...state.components.slice(idx + 1),
      ];
      return {
        ...state,
        components: newComponents,
        selectedId: clone.id,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }

    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'SET_DRAGGING':
      return { ...state, isDragging: action.payload };

    case 'TOGGLE_EXPORT_MODAL':
      return { ...state, showExportModal: !state.showExportModal };

    case 'TOGGLE_AI_CONVERTER':
      return { ...state, showAIConverterModal: !state.showAIConverterModal };

    case 'UNDO': {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      return {
        ...state,
        components: state.history[newIndex],
        historyIndex: newIndex,
      };
    }

    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      return {
        ...state,
        components: state.history[newIndex],
        historyIndex: newIndex,
      };
    }

    case 'CLEAR_CANVAS':
      return {
        ...state,
        components: [],
        selectedId: null,
        history: [...state.history.slice(0, state.historyIndex + 1), []],
        historyIndex: state.historyIndex + 1,
      };

    default:
      return state;
  }
}

export function BuilderProvider({ children }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  const addComponent = useCallback((template) => {
    dispatch({ type: 'ADD_COMPONENT', payload: template });
  }, []);

  const removeComponent = useCallback((id) => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: id });
  }, []);

  const selectComponent = useCallback((id) => {
    dispatch({ type: 'SELECT_COMPONENT', payload: id });
  }, []);

  const deselect = useCallback(() => {
    dispatch({ type: 'DESELECT' });
  }, []);

  const updateComponentProps = useCallback((id, props) => {
    dispatch({ type: 'UPDATE_COMPONENT_PROPS', payload: { id, props } });
  }, []);

  const reorderComponents = useCallback((newOrder) => {
    dispatch({ type: 'REORDER_COMPONENTS', payload: newOrder });
  }, []);

  const moveComponent = useCallback((id, direction) => {
    dispatch({ type: 'MOVE_COMPONENT', payload: { id, direction } });
  }, []);

  const duplicateComponent = useCallback((id) => {
    dispatch({ type: 'DUPLICATE_COMPONENT', payload: id });
  }, []);

  const setViewMode = useCallback((mode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  }, []);

  const setDragging = useCallback((isDragging) => {
    dispatch({ type: 'SET_DRAGGING', payload: isDragging });
  }, []);

  const toggleExportModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_EXPORT_MODAL' });
  }, []);

  const toggleAIConverter = useCallback(() => {
    dispatch({ type: 'TOGGLE_AI_CONVERTER' });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const clearCanvas = useCallback(() => {
    dispatch({ type: 'CLEAR_CANVAS' });
  }, []);

  const getSelectedComponent = useCallback(() => {
    return state.components.find(c => c.id === state.selectedId) || null;
  }, [state.components, state.selectedId]);

  const value = {
    ...state,
    addComponent,
    removeComponent,
    selectComponent,
    deselect,
    updateComponentProps,
    reorderComponents,
    moveComponent,
    duplicateComponent,
    setViewMode,
    setDragging,
    toggleExportModal,
    toggleAIConverter,
    undo,
    redo,
    clearCanvas,
    getSelectedComponent,
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}

export default BuilderContext;
