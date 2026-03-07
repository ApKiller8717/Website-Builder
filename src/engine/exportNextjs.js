// ============================================
// Next.js Export Engine
// ============================================

import { generateReactExport } from './exportReact';

export function generateNextjsExport(components) {
  const pageCode = generateReactExport(components);
  
  // Wrap with Next.js metadata
  const nextPage = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Landing Page',
  description: 'Built with PageCraft Pro',
};

${pageCode}`;

  const layoutCode = `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Landing Page',
  description: 'Built with PageCraft Pro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}`;

  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}`;

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

  const packageJson = JSON.stringify({
    name: 'my-landing-page',
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.0.0',
      'react-dom': '^18.0.0',
    },
    devDependencies: {
      tailwindcss: '^3.0.0',
      postcss: '^8.0.0',
      autoprefixer: '^10.0.0',
      typescript: '^5.0.0',
      '@types/react': '^18.0.0',
    },
  }, null, 2);

  return { nextPage, layoutCode, globalsCss, tailwindConfig, packageJson };
}
