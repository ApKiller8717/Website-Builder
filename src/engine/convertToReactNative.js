// ============================================
// HTML → React Native Conversion Engine
// ============================================

const htmlToRNMap = {
  // Container elements → View
  'div': 'View',
  'section': 'View',
  'article': 'View',
  'main': 'View',
  'header': 'View',
  'footer': 'View',
  'nav': 'View',
  'aside': 'View',
  'form': 'View',

  // Text elements → Text
  'h1': 'Text',
  'h2': 'Text',
  'h3': 'Text',
  'h4': 'Text',
  'h5': 'Text',
  'h6': 'Text',
  'p': 'Text',
  'span': 'Text',
  'strong': 'Text',
  'em': 'Text',
  'label': 'Text',
  'a': 'Text',

  // Media
  'img': 'Image',
  'video': 'Video',

  // Interactive
  'button': 'TouchableOpacity',
  'input': 'TextInput',
  'textarea': 'TextInput',
  'select': 'Picker',

  // List
  'ul': 'View',
  'ol': 'View',
  'li': 'View',

  // Table
  'table': 'View',
  'tr': 'View',
  'td': 'Text',
  'th': 'Text',
};

const textTags = new Set(['h1','h2','h3','h4','h5','h6','p','span','strong','em','label','a','td','th']);
const headingSizes = { h1: 32, h2: 28, h3: 22, h4: 18, h5: 16, h6: 14 };

function cssToRNStyle(styleStr, tag) {
  if (!styleStr && !tag) return null;
  const styles = {};
  const isText = textTags.has(tag);

  if (styleStr) {
    styleStr.split(';').forEach(rule => {
      const [prop, val] = rule.split(':').map(s => s.trim());
      if (!prop || !val) return;

      switch (prop) {
        case 'padding':
          styles.padding = parseFloat(val) || 16;
          break;
        case 'padding-top': case 'paddingTop':
          styles.paddingTop = parseFloat(val) || 0;
          break;
        case 'padding-bottom': case 'paddingBottom':
          styles.paddingBottom = parseFloat(val) || 0;
          break;
        case 'padding-left': case 'paddingLeft':
          styles.paddingHorizontal = parseFloat(val) || 0;
          break;
        case 'margin':
          styles.margin = parseFloat(val) || 0;
          break;
        case 'margin-bottom': case 'marginBottom':
          styles.marginBottom = parseFloat(val) || 0;
          break;
        case 'background-color': case 'background':
          if (val.startsWith('#') || val.startsWith('rgb')) {
            styles.backgroundColor = val.startsWith('#') ? val : val;
          }
          break;
        case 'color':
          styles.color = val;
          break;
        case 'font-size': case 'fontSize':
          styles.fontSize = parseFloat(val) || 16;
          break;
        case 'font-weight': case 'fontWeight':
          styles.fontWeight = val;
          break;
        case 'text-align': case 'textAlign':
          styles.textAlign = val;
          break;
        case 'border-radius': case 'borderRadius':
          styles.borderRadius = parseFloat(val) || 0;
          break;
        case 'display':
          if (val === 'flex') styles.display = 'flex';
          break;
        case 'flex-direction': case 'flexDirection':
          styles.flexDirection = val;
          break;
        case 'align-items': case 'alignItems':
          styles.alignItems = val;
          break;
        case 'justify-content': case 'justifyContent':
          styles.justifyContent = val.replace('space-between', 'space-between').replace('space-around', 'space-around');
          break;
        case 'gap':
          styles.gap = parseFloat(val) || 0;
          break;
        case 'width':
          if (val === '100%') styles.width = "'100%'";
          else styles.width = parseFloat(val) || undefined;
          break;
        case 'height':
          styles.height = parseFloat(val) || undefined;
          break;
        case 'border':
          styles.borderWidth = 1;
          styles.borderColor = '#334155';
          break;
      }
    });
  }

  // Apply heading sizes
  if (headingSizes[tag]) {
    styles.fontSize = headingSizes[tag];
    styles.fontWeight = 'bold';
  }

  if (tag === 'p') {
    styles.fontSize = styles.fontSize || 16;
    styles.lineHeight = 24;
  }

  return Object.keys(styles).length > 0 ? styles : null;
}

function styleObjToString(obj, indent = 4) {
  if (!obj) return '';
  const pad = ' '.repeat(indent);
  const entries = Object.entries(obj).map(([k, v]) => {
    if (typeof v === 'string' && !v.startsWith("'")) {
      return `${pad}  ${k}: '${v}',`;
    }
    return `${pad}  ${k}: ${v},`;
  });
  return `{\n${entries.join('\n')}\n${pad}}`;
}

function parseHTMLElements(html) {
  const elements = [];
  const tagRegex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>|<(\w+)([^>]*)\s*\/?>/g;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const tag = (match[1] || match[4]).toLowerCase();
    const attrs = match[2] || match[5] || '';
    const content = match[3] || '';

    const styleMatch = attrs.match(/style="([^"]*)"/);
    const styleStr = styleMatch ? styleMatch[1] : '';
    const srcMatch = attrs.match(/src="([^"]*)"/);
    const src = srcMatch ? srcMatch[1] : '';
    const placeholderMatch = attrs.match(/placeholder="([^"]*)"/);
    const placeholder = placeholderMatch ? placeholderMatch[1] : '';

    elements.push({ tag, styleStr, content: content.trim(), src, placeholder });
  }

  return elements;
}

export function convertHTMLToReactNative(html) {
  const lines = [];
  lines.push("import React from 'react';");
  lines.push("import {");
  lines.push("  View, Text, Image, ScrollView, TouchableOpacity,");
  lines.push("  TextInput, StyleSheet, StatusBar, SafeAreaView,");
  lines.push("} from 'react-native';");
  lines.push('');
  lines.push('export default function ConvertedScreen() {');
  lines.push('  return (');
  lines.push('    <SafeAreaView style={styles.container}>');
  lines.push('      <StatusBar barStyle="light-content" />');
  lines.push('      <ScrollView style={styles.scrollView}>');

  const elements = parseHTMLElements(html);
  elements.forEach(el => {
    const rnCode = convertElementToRN(el, 4);
    if (rnCode) {
      lines.push(rnCode);
    }
  });

  lines.push('      </ScrollView>');
  lines.push('    </SafeAreaView>');
  lines.push('  );');
  lines.push('}');
  lines.push('');

  // Generate StyleSheet
  lines.push('const styles = StyleSheet.create({');
  lines.push("  container: { flex: 1, backgroundColor: '#020617' },");
  lines.push("  scrollView: { flex: 1 },");
  lines.push("  heading1: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginBottom: 16 },");
  lines.push("  heading2: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },");
  lines.push("  heading3: { fontSize: 22, fontWeight: '600', color: '#FFFFFF', marginBottom: 8 },");
  lines.push("  bodyText: { fontSize: 16, color: '#CBD5E1', lineHeight: 24 },");
  lines.push("  button: { backgroundColor: '#9333EA', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },");
  lines.push("  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },");
  lines.push("  input: { backgroundColor: '#1E293B', borderRadius: 12, padding: 16, color: '#FFFFFF', borderWidth: 1, borderColor: '#334155' },");
  lines.push("  section: { padding: 24 },");
  lines.push("  card: { backgroundColor: 'rgba(30,41,59,0.4)', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: 'rgba(51,65,85,0.5)' },");
  lines.push('});');

  return lines.join('\n');
}

function convertElementToRN(el, indent) {
  const pad = ' '.repeat(indent * 2);
  const rnComponent = htmlToRNMap[el.tag];
  if (!rnComponent) return `${pad}{/* Unsupported: <${el.tag}> */}`;

  const style = cssToRNStyle(el.styleStr, el.tag);
  const styleStr = style ? ` style={${JSON.stringify(style).replace(/"(\w+)":/g, '$1:')}}` : '';
  const cleanContent = el.content.replace(/<[^>]+>/g, '').trim();

  switch (el.tag) {
    case 'img':
      return `${pad}<Image\n${pad}  source={{ uri: '${el.src || 'https://via.placeholder.com/400x300'}' }}\n${pad}  style={{ width: '100%', height: 200, borderRadius: 12 }}\n${pad}  resizeMode="cover"\n${pad}/>`;

    case 'button':
      return `${pad}<TouchableOpacity style={styles.button} onPress={() => {}}>\n${pad}  <Text style={styles.buttonText}>${cleanContent || 'Button'}</Text>\n${pad}</TouchableOpacity>`;

    case 'input':
      return `${pad}<TextInput\n${pad}  style={styles.input}\n${pad}  placeholder="${el.placeholder || 'Enter text'}"\n${pad}  placeholderTextColor="#64748B"\n${pad}/>`;

    case 'textarea':
      return `${pad}<TextInput\n${pad}  style={[styles.input, { height: 120, textAlignVertical: 'top' }]}\n${pad}  placeholder="${el.placeholder || 'Enter text'}"\n${pad}  placeholderTextColor="#64748B"\n${pad}  multiline\n${pad}  numberOfLines={5}\n${pad}/>`;

    case 'h1': case 'h2': case 'h3':
      if (!cleanContent) return null;
      const headingStyle = el.tag === 'h1' ? 'heading1' : el.tag === 'h2' ? 'heading2' : 'heading3';
      return `${pad}<Text style={styles.${headingStyle}}>${cleanContent.substring(0, 100)}</Text>`;

    case 'h4': case 'h5': case 'h6':
    case 'p': case 'span': case 'strong': case 'em': case 'label':
      if (!cleanContent) return null;
      return `${pad}<Text style={${style ? JSON.stringify(style).replace(/"(\w+)":/g, '$1:') : 'styles.bodyText'}}>${cleanContent.substring(0, 100)}</Text>`;

    case 'a':
      if (!cleanContent) return null;
      return `${pad}<TouchableOpacity onPress={() => {}}>\n${pad}  <Text style={{ color: '#C084FC' }}>${cleanContent}</Text>\n${pad}</TouchableOpacity>`;

    case 'div': case 'section': case 'article': case 'header': case 'footer': case 'nav': case 'main':
      return `${pad}<View${styleStr || ' style={styles.section}'}>\n${pad}  {/* Content from <${el.tag}> */}\n${cleanContent ? pad + '  <Text style={styles.bodyText}>' + cleanContent.substring(0, 80) + '</Text>\n' : ''}${pad}</View>`;

    case 'ul': case 'ol':
      return `${pad}<View style={{ gap: 8 }}>\n${pad}  {/* List items */}\n${pad}</View>`;

    case 'li':
      return `${pad}<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>\n${pad}  <Text style={{ color: '#C084FC' }}>•</Text>\n${pad}  <Text style={styles.bodyText}>${cleanContent.substring(0, 60)}</Text>\n${pad}</View>`;

    default:
      return `${pad}{/* <${el.tag}> → ${rnComponent} */}`;
  }
}

export { htmlToRNMap };
