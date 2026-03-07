// ============================================
// HTML → Flutter Dart Conversion Engine
// ============================================

const htmlToFlutterMap = {
  // Container elements
  'div': { widget: 'Container', needsChild: true },
  'section': { widget: 'Container', needsChild: true },
  'article': { widget: 'Container', needsChild: true },
  'main': { widget: 'Container', needsChild: true },
  'header': { widget: 'Container', needsChild: true },
  'footer': { widget: 'Container', needsChild: true },
  'nav': { widget: 'Container', needsChild: true },
  'aside': { widget: 'Container', needsChild: true },

  // Text elements
  'h1': { widget: 'Text', style: 'TextStyle(fontSize: 32, fontWeight: FontWeight.w800)' },
  'h2': { widget: 'Text', style: 'TextStyle(fontSize: 28, fontWeight: FontWeight.w700)' },
  'h3': { widget: 'Text', style: 'TextStyle(fontSize: 22, fontWeight: FontWeight.w600)' },
  'h4': { widget: 'Text', style: 'TextStyle(fontSize: 18, fontWeight: FontWeight.w600)' },
  'h5': { widget: 'Text', style: 'TextStyle(fontSize: 16, fontWeight: FontWeight.w500)' },
  'h6': { widget: 'Text', style: 'TextStyle(fontSize: 14, fontWeight: FontWeight.w500)' },
  'p': { widget: 'Text', style: 'TextStyle(fontSize: 16)' },
  'span': { widget: 'Text', style: 'TextStyle()' },
  'strong': { widget: 'Text', style: 'TextStyle(fontWeight: FontWeight.bold)' },
  'em': { widget: 'Text', style: 'TextStyle(fontStyle: FontStyle.italic)' },
  'label': { widget: 'Text', style: 'TextStyle(fontSize: 14)' },

  // Media
  'img': { widget: 'Image.network' },
  'video': { widget: '// VideoPlayer widget placeholder' },
  'svg': { widget: '// SVG Icon placeholder' },

  // Interactive elements
  'button': { widget: 'ElevatedButton' },
  'a': { widget: 'TextButton' },
  'input': { widget: 'TextField' },
  'textarea': { widget: 'TextField', props: 'maxLines: 5' },
  'select': { widget: 'DropdownButton' },
  'form': { widget: 'Form' },

  // List elements
  'ul': { widget: 'Column', needsChild: true },
  'ol': { widget: 'Column', needsChild: true },
  'li': { widget: 'ListTile' },

  // Table elements
  'table': { widget: 'Table' },
  'tr': { widget: 'TableRow' },
  'td': { widget: 'Text' },
  'th': { widget: 'Text', style: 'TextStyle(fontWeight: FontWeight.bold)' },
};

function cssToFlutterPadding(styles) {
  const parts = [];
  const padding = styles.padding || '';
  if (padding) {
    const values = padding.split(/\s+/).map(v => parseFloat(v) || 0);
    if (values.length === 1) {
      parts.push(`EdgeInsets.all(${values[0]})`);
    } else if (values.length === 2) {
      parts.push(`EdgeInsets.symmetric(vertical: ${values[0]}, horizontal: ${values[1]})`);
    } else if (values.length === 4) {
      parts.push(`EdgeInsets.fromLTRB(${values[3]}, ${values[0]}, ${values[1]}, ${values[2]})`);
    }
  }
  return parts[0] || null;
}

function cssColorToFlutter(color) {
  if (!color) return null;
  color = color.trim();
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    if (hex.length === 3) {
      const expanded = hex.split('').map(c => c + c).join('');
      return `Color(0xFF${expanded.toUpperCase()})`;
    }
    if (hex.length === 6) {
      return `Color(0xFF${hex.toUpperCase()})`;
    }
  }
  const colorNames = {
    white: '0xFFFFFFFF', black: '0xFF000000', red: '0xFFFF0000',
    blue: '0xFF0000FF', green: '0xFF00FF00', transparent: '0x00000000',
  };
  return colorNames[color.toLowerCase()] ? `Color(${colorNames[color.toLowerCase()]})` : `Colors.grey`;
}

function parseInlineStyles(styleStr) {
  if (!styleStr) return {};
  const styles = {};
  styleStr.split(';').forEach(rule => {
    const [prop, val] = rule.split(':').map(s => s.trim());
    if (prop && val) {
      styles[prop] = val;
    }
  });
  return styles;
}

export function convertHTMLToFlutter(html) {
  const lines = [];
  lines.push("import 'package:flutter/material.dart';");
  lines.push('');
  lines.push('class ConvertedPage extends StatelessWidget {');
  lines.push('  const ConvertedPage({super.key});');
  lines.push('');
  lines.push('  @override');
  lines.push('  Widget build(BuildContext context) {');
  lines.push('    return Scaffold(');
  lines.push('      backgroundColor: const Color(0xFF020617),');
  lines.push('      body: SafeArea(');
  lines.push('        child: SingleChildScrollView(');
  lines.push('          child: Column(');
  lines.push('            crossAxisAlignment: CrossAxisAlignment.stretch,');
  lines.push('            children: [');

  // Parse HTML and convert elements
  const elements = parseHTMLElements(html);
  elements.forEach(el => {
    const flutterCode = convertElementToFlutter(el, 7);
    if (flutterCode) {
      lines.push(flutterCode);
    }
  });

  lines.push('            ],');
  lines.push('          ),');
  lines.push('        ),');
  lines.push('      ),');
  lines.push('    );');
  lines.push('  }');
  lines.push('}');

  return lines.join('\n');
}

function parseHTMLElements(html) {
  const elements = [];
  const tagRegex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>|<(\w+)([^>]*)\s*\/?>/g;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const tag = (match[1] || match[4]).toLowerCase();
    const attrs = match[2] || match[5] || '';
    const content = match[3] || '';

    // Extract style attribute
    const styleMatch = attrs.match(/style="([^"]*)"/);
    const styles = styleMatch ? parseInlineStyles(styleMatch[1]) : {};

    // Extract class attribute
    const classMatch = attrs.match(/class="([^"]*)"/);
    const classes = classMatch ? classMatch[1] : '';

    // Extract src for images
    const srcMatch = attrs.match(/src="([^"]*)"/);
    const src = srcMatch ? srcMatch[1] : '';

    // Extract placeholder for inputs
    const placeholderMatch = attrs.match(/placeholder="([^"]*)"/);
    const placeholder = placeholderMatch ? placeholderMatch[1] : '';

    elements.push({ tag, styles, classes, content: content.trim(), src, placeholder });
  }

  return elements;
}

function convertElementToFlutter(el, indent) {
  const pad = ' '.repeat(indent * 2);
  const mapping = htmlToFlutterMap[el.tag];
  if (!mapping) return `${pad}// Unsupported element: <${el.tag}>`;

  const styles = el.styles;
  const padding = cssToFlutterPadding(styles);
  const bgColor = cssColorToFlutter(styles['background-color'] || styles.background);
  const textColor = cssColorToFlutter(styles.color);

  switch (el.tag) {
    case 'img':
      return `${pad}Image.network(\n${pad}  '${el.src || 'https://via.placeholder.com/400x300'}',\n${pad}  fit: BoxFit.cover,\n${pad}),`;

    case 'button':
      return `${pad}ElevatedButton(\n${pad}  onPressed: () {},\n${pad}  style: ElevatedButton.styleFrom(\n${pad}    backgroundColor: const Color(0xFF9333EA),\n${pad}    padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),\n${pad}    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),\n${pad}  ),\n${pad}  child: Text('${el.content || 'Button'}'),\n${pad}),`;

    case 'a':
      return `${pad}TextButton(\n${pad}  onPressed: () {},\n${pad}  child: Text('${el.content || 'Link'}'),\n${pad}),`;

    case 'input':
    case 'textarea':
      return `${pad}TextField(\n${pad}  decoration: InputDecoration(\n${pad}    hintText: '${el.placeholder || 'Enter text'}',\n${pad}    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),\n${pad}    filled: true,\n${pad}    fillColor: const Color(0xFF1E293B),\n${pad}  ),\n${pad}  ${el.tag === 'textarea' ? 'maxLines: 5,' : ''}\n${pad}),`;

    case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
    case 'p': case 'span': case 'strong': case 'em': case 'label':
      if (!el.content) return null;
      const textContent = el.content.replace(/'/g, "\\'").replace(/<[^>]+>/g, '');
      if (!textContent.trim()) return null;
      return `${pad}Text(\n${pad}  '${textContent.trim()}',\n${pad}  style: const ${mapping.style.replace(')', `${textColor ? ', color: ' + textColor : ''}`)},\n${pad}),`;

    case 'div': case 'section': case 'article': case 'header': case 'footer': case 'nav': case 'main':
      const containerParts = [];
      containerParts.push(`${pad}Container(`);
      if (padding) containerParts.push(`${pad}  padding: const ${padding},`);
      if (bgColor) containerParts.push(`${pad}  color: const ${bgColor},`);
      containerParts.push(`${pad}  child: Column(`);
      containerParts.push(`${pad}    crossAxisAlignment: CrossAxisAlignment.start,`);
      containerParts.push(`${pad}    children: const [`);
      containerParts.push(`${pad}      // Nested content from <${el.tag}>`);
      if (el.content) {
        const cleanText = el.content.replace(/<[^>]+>/g, '').trim();
        if (cleanText) {
          containerParts.push(`${pad}      Text('${cleanText.substring(0, 80).replace(/'/g, "\\'")}'),`);
        }
      }
      containerParts.push(`${pad}    ],`);
      containerParts.push(`${pad}  ),`);
      containerParts.push(`${pad}),`);
      return containerParts.join('\n');

    case 'ul': case 'ol':
      return `${pad}Column(\n${pad}  crossAxisAlignment: CrossAxisAlignment.start,\n${pad}  children: const [\n${pad}    // List items\n${pad}    Text('• List item'),\n${pad}  ],\n${pad}),`;

    case 'li':
      return `${pad}ListTile(\n${pad}  leading: const Icon(Icons.circle, size: 8),\n${pad}  title: Text('${el.content.replace(/<[^>]+>/g, '').trim().replace(/'/g, "\\'")}'),\n${pad}),`;

    default:
      return `${pad}// <${el.tag}> → ${mapping.widget}`;
  }
}

export { htmlToFlutterMap };
