// ============================================
// ZIP Generator using JSZip
// ============================================

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generateHTML } from './exportHTML';
import { generateReactExport } from './exportReact';
import { generateNextjsExport } from './exportNextjs';
import { convertHTMLToFlutter } from './convertToFlutter';
import { convertHTMLToReactNative } from './convertToReactNative';

export async function downloadAsZip(components, format = 'html') {
  const zip = new JSZip();

  switch (format) {
    case 'html': {
      const htmlCode = generateHTML(components);
      zip.file('index.html', htmlCode);
      break;
    }

    case 'react': {
      const reactCode = generateReactExport(components);
      const srcFolder = zip.folder('src');
      srcFolder.file('App.jsx', reactCode);
      srcFolder.file('index.css', `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  font-family: 'Inter', system-ui, sans-serif;\n}`);
      srcFolder.file('main.jsx', `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);`);
      zip.file('index.html', `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>My Page</title>\n</head>\n<body>\n  <div id="root"></div>\n  <script type="module" src="/src/main.jsx"><\/script>\n</body>\n</html>`);
      zip.file('package.json', JSON.stringify({
        name: 'my-page',
        private: true,
        version: '0.0.0',
        type: 'module',
        scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
        dependencies: { react: '^18.0.0', 'react-dom': '^18.0.0' },
        devDependencies: { '@vitejs/plugin-react': '^4.0.0', vite: '^5.0.0', tailwindcss: '^3.0.0', postcss: '^8.0.0', autoprefixer: '^10.0.0' },
      }, null, 2));
      zip.file('tailwind.config.js', `/** @type {import('tailwindcss').Config} */\nexport default {\n  content: ['./index.html', './src/**/*.{js,jsx}'],\n  theme: { extend: {} },\n  plugins: [],\n};`);
      zip.file('vite.config.js', `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({ plugins: [react()] });`);
      break;
    }

    case 'nextjs': {
      const { nextPage, layoutCode, globalsCss, tailwindConfig, packageJson } = generateNextjsExport(components);
      const appFolder = zip.folder('app');
      appFolder.file('page.tsx', nextPage);
      appFolder.file('layout.tsx', layoutCode);
      appFolder.file('globals.css', globalsCss);
      zip.file('tailwind.config.ts', tailwindConfig);
      zip.file('package.json', packageJson);
      zip.file('tsconfig.json', JSON.stringify({ compilerOptions: { target: 'es5', lib: ['dom', 'dom.iterable', 'esnext'], allowJs: true, skipLibCheck: true, strict: true, noEmit: true, esModuleInterop: true, module: 'esnext', moduleResolution: 'bundler', resolveJsonModule: true, isolatedModules: true, jsx: 'preserve', incremental: true, plugins: [{ name: 'next' }], paths: { '@/*': ['./*'] } }, include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'], exclude: ['node_modules'] }, null, 2));
      break;
    }

    case 'flutter': {
      const htmlCode = generateHTML(components);
      const flutterCode = convertHTMLToFlutter(htmlCode);
      const libFolder = zip.folder('lib');
      libFolder.file('converted_page.dart', flutterCode);
      libFolder.file('main.dart', `import 'package:flutter/material.dart';\nimport 'converted_page.dart';\n\nvoid main() {\n  runApp(const MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Converted Page',\n      theme: ThemeData.dark(useMaterial3: true),\n      home: const ConvertedPage(),\n    );\n  }\n}`);
      zip.file('pubspec.yaml', `name: converted_page\ndescription: Page converted from PageCraft Pro\npublish_to: 'none'\nversion: 1.0.0+1\n\nenvironment:\n  sdk: '>=3.0.0 <4.0.0'\n\ndependencies:\n  flutter:\n    sdk: flutter\n\ndev_dependencies:\n  flutter_test:\n    sdk: flutter\n  flutter_lints: ^3.0.0\n\nflutter:\n  uses-material-design: true`);
      break;
    }

    case 'react-native': {
      const htmlCode = generateHTML(components);
      const rnCode = convertHTMLToReactNative(htmlCode);
      zip.file('App.js', rnCode);
      zip.file('package.json', JSON.stringify({
        name: 'converted-page',
        version: '1.0.0',
        main: 'node_modules/expo/AppEntry.js',
        scripts: { start: 'expo start', android: 'expo start --android', ios: 'expo start --ios', web: 'expo start --web' },
        dependencies: { expo: '~50.0.0', 'expo-status-bar': '~1.11.0', react: '18.2.0', 'react-native': '0.73.0' },
      }, null, 2));
      zip.file('app.json', JSON.stringify({
        expo: { name: 'converted-page', slug: 'converted-page', version: '1.0.0', orientation: 'portrait', sdkVersion: '50.0.0', platforms: ['ios', 'android', 'web'] },
      }, null, 2));
      break;
    }

    default:
      zip.file('readme.txt', 'Unknown export format');
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `pagecraft-export-${format}.zip`);
}
