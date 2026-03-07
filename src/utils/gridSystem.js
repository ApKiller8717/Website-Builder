// Grid system utilities

export const gridColumns = {
  1: { class: 'grid-cols-1', tailwind: 'grid-cols-1' },
  2: { class: 'grid-cols-2', tailwind: 'grid-cols-1 sm:grid-cols-2' },
  3: { class: 'grid-cols-3', tailwind: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' },
  4: { class: 'grid-cols-4', tailwind: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' },
  5: { class: 'grid-cols-5', tailwind: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' },
  6: { class: 'grid-cols-6', tailwind: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' },
};

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const maxWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1792px',
  '4xl': '896px',
  '5xl': '1024px',
  '6xl': '1152px',
  '7xl': '1280px',
  full: '100%',
};

export function getResponsiveClasses(columns, breakpoint = 'lg') {
  const grid = gridColumns[columns];
  return grid ? grid.tailwind : gridColumns[3].tailwind;
}
