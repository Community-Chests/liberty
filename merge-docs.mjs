import fs from 'fs';
import path from 'path';
import { mdToPdf } from 'md-to-pdf';

const DOCS_DIR = './docs';
const OUTPUT_MD = './docs/protocol-docs.md';
const OUTPUT_PDF_DARK = path.resolve('./public/mycelium-protocol-offline.pdf');
const OUTPUT_PDF_LIGHT = path.resolve('./public/mycelium-protocol-print.pdf');
const CONFIG_PATH = './astro.config.mjs';

async function generateProtocolNexus() {
  console.log('🌱 Starting Protocol Docs unification...');
  
  const configText = fs.readFileSync(CONFIG_PATH, 'utf8');
  const linkRegex = /link:\s*'\/notes\/([^']+)'/g;
  let match;
  const paths = [];

  while ((match = linkRegex.exec(configText)) !== null) {
    const slug = match[1];
    if (slug && !slug.endsWith('.pdf')) {
      const filePath = slug === '' ? 'index.md' : `${slug}.md`;
      paths.push({ slug: slug || 'index', path: filePath });
    }
  }

  let tocList = "";
  const bodyContents = [];
  const seenPaths = new Set();

  for (const entry of paths) {
    if (seenPaths.has(entry.path)) continue;
    seenPaths.add(entry.path);

    const fullPath = path.join(DOCS_DIR, entry.path);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const titleMatch = content.match(/^#\s+(.*)/m);
      const title = titleMatch ? titleMatch[1].replace(/[*_]/g, '').trim() : entry.slug;
      const anchorId = entry.slug.replace(/\//g, '-');
      
      // Clean TOC links (No underline on TOC links for a cleaner look)
      tocList += `<li style="margin-bottom: 8px;"><a href="#${anchorId}" style="text-decoration: none;">${title}</a></li>\n`;

      // Repair links
      content = content.replace(/\[([^\]]+)\]\((?:\.\/|\.\.\/)*[^\)]*?([^/)]+)\.md\)/g, '[$1](#$2)');
      content = content.replace(/\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g, (m, p1, p2) => `[${p2 || p1}](#${p1.split('/').pop().replace('.md', '')})`);
      content = content.replace(/\[([^\]]+)\]\(\/notes\/([^)]+)\)/g, (m, text, pathStr) => `[${text}](#${pathStr.replace(/\//g, '-')})`);
      
      let cleanContent = content.replace(/^---[\s\S]*?---/, '').trim();
      
      bodyContents.push(`<div class="doc-section" id="${anchorId}">\n\n${cleanContent}\n\n</div>`);
    }
  }

  const combinedContent = `
<div style="text-align: center; padding-top: 100px; padding-bottom: 60px;">
  <h1 style="color: #16a34a; font-size: 36px; border: none; margin-bottom: 10px;">The Liberty Protocol</h1>
  <h2 style="color: #64748b; font-size: 20px; font-weight: normal; margin-top: 0; border: none;">Unified Offline Manual</h2>
</div>

<div class="toc-box" style="max-width: 500px; margin: 0 auto; padding: 20px; border-radius: 8px; border: 1px solid;">
  <h3 style="text-align: center; margin-top: 0; margin-bottom: 20px; border: none;">Table of Contents</h3>
  <ul style="list-style-type: none; padding: 0; margin: 0;">
${tocList}
  </ul>
</div>

${bodyContents.join('\n\n')}
`.trim(); // <-- Removed the stray <div class="doc-section"></div> that caused the blank page

  fs.writeFileSync(OUTPUT_MD, combinedContent);
  console.log(`✅ Markdown unified into ${OUTPUT_MD}`);

  // =========================================================================
  // 1. GENERATE DARK PDF (OFFLINE SCREEN READER)
  // =========================================================================
  console.log('📡 Generating Dark PDF (Offline)...');
  try {
    await mdToPdf(
      { path: OUTPUT_MD },
      { 
        dest: OUTPUT_PDF_DARK,
        body_class: ['markdown-body', 'liberty-dark'], 
        css: `
          @page { margin: 0; } 
          html, body, .liberty-dark { 
            background-color: #0f172a !important; 
            color: #cbd5e1 !important; 
            font-family: system-ui, -apple-system, sans-serif !important;
            font-size: 13.5px !important; 
            line-height: 1.6 !important;
            -webkit-print-color-adjust: exact !important;
            margin: 0 !important;
          }
          .liberty-dark {
            padding: 20mm !important; 
            box-sizing: border-box !important;
          }
          
          /* Headers with Widow Protection */
          .liberty-dark h1 { color: #22c55e !important; border-bottom: 1px solid #1e293b !important; padding-bottom: 6px; font-size: 1.8em !important; margin-top: 1.5em !important; break-after: avoid !important; page-break-after: avoid !important; }
          .liberty-dark h2 { color: #f8fafc !important; border: none !important; font-size: 1.5em !important; margin-top: 1.2em !important; break-after: avoid !important; page-break-after: avoid !important; }
          .liberty-dark h3 { color: #f8fafc !important; border: none !important; font-size: 1.2em !important; break-after: avoid !important; page-break-after: avoid !important; }
          .liberty-dark strong { color: #f8fafc !important; }
          
          /* Body Links */
          .liberty-dark p a, .liberty-dark li a { color: #bbf7d0 !important; text-decoration: underline !important; text-underline-offset: 3px !important; }
          
          .doc-section { break-before: page !important; page-break-before: always !important; }
          .liberty-dark hr { break-after: auto !important; page-break-after: auto !important; border: 0 !important; border-bottom: 1px solid #334155 !important; margin: 2em 0 !important; }
          
          .liberty-dark table { width: 100% !important; border-collapse: collapse !important; margin: 1.5em 0 !important; }
          .liberty-dark table th, .liberty-dark table td { background-color: #0f172a !important; border: 1px solid #334155 !important; color: #f8fafc !important; padding: 10px !important; }
          .liberty-dark table th { background-color: #1e293b !important; color: #22c55e !important; }
          .liberty-dark pre, .liberty-dark code { background-color: #1e293b !important; border: 1px solid #334155 !important; color: #f8fafc !important; page-break-inside: avoid !important; }
          .toc-box { background: #1e293b !important; border-color: #334155 !important; }
          .toc-box h3 { color: #22c55e !important; }
        `,
        pdf_options: {
          format: 'A4',
          margin: '0mm', 
          printBackground: true,
          displayHeaderFooter: false 
        },
        launch_options: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }
    );
    console.log(`🚀 Dark PDF saved to ${OUTPUT_PDF_DARK}`);
  } catch (err) { console.error('❌ Dark PDF Failed:', err.message); }

  // =========================================================================
  // 2. GENERATE LIGHT PDF (FOR PRINTERS)
  // =========================================================================
  console.log('📡 Generating Light PDF (Print)...');
  try {
    await mdToPdf(
      { path: OUTPUT_MD },
      { 
        dest: OUTPUT_PDF_LIGHT,
        body_class: ['markdown-body', 'liberty-print'], 
        css: `
          html, body, .liberty-print { 
            background-color: #ffffff !important; 
            color: #334155 !important; 
            font-family: system-ui, -apple-system, sans-serif !important;
            font-size: 13.5px !important; /* <--- Scaled to exactly match Dark PDF */
            line-height: 1.6 !important;
            -webkit-print-color-adjust: exact !important;
          }
          
          /* Headers with Widow Protection */
          .liberty-print h1 { color: #16a34a !important; border-bottom: 1px solid #e2e8f0 !important; padding-bottom: 6px; font-size: 1.8em !important; margin-top: 1.5em !important; break-after: avoid !important; page-break-after: avoid !important; }
          .liberty-print h2 { color: #0f172a !important; border: none !important; font-size: 1.5em !important; margin-top: 1.2em !important; break-after: avoid !important; page-break-after: avoid !important; }
          .liberty-print h3 { color: #0f172a !important; border: none !important; font-size: 1.2em !important; break-after: avoid !important; page-break-after: avoid !important; }
          .liberty-print strong { color: #0f172a !important; }
          
          /* Body Links */
          .liberty-print p a, .liberty-print li a { color: #2563eb !important; text-decoration: underline !important; text-underline-offset: 3px !important; }
          
          .doc-section { break-before: page !important; page-break-before: always !important; }
          .liberty-print hr { break-after: auto !important; page-break-after: auto !important; border: 0 !important; border-bottom: 1px solid #cbd5e1 !important; margin: 2em 0 !important; }
          
          .liberty-print table { width: 100% !important; border-collapse: collapse !important; margin: 1.5em 0 !important; }
          .liberty-print table th, .liberty-print table td { border: 1px solid #cbd5e1 !important; padding: 10px !important; }
          .liberty-print table th { background-color: #f1f5f9 !important; color: #0f172a !important; }
          .liberty-print pre, .liberty-print code { background-color: #f8fafc !important; border: 1px solid #cbd5e1 !important; color: #0f172a !important; page-break-inside: avoid !important; }
          .toc-box { background: #f8fafc !important; border-color: #e2e8f0 !important; }
        `,
        pdf_options: {
          format: 'A4',
          margin: { top: '12mm', right: '20mm', bottom: '15mm', left: '20mm' },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: '<div style="width: 100%; text-align: center; font-size: 8px; color: #94a3b8; font-family: sans-serif;">THE LIBERTY PROTOCOL</div>',
          footerTemplate: '<div style="width: 100%; text-align: center; font-size: 10px; color: #64748b; font-family: sans-serif; padding-bottom: 5mm;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
        },
        launch_options: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }
    );
    console.log(`🚀 Light PDF saved to ${OUTPUT_PDF_LIGHT}`);
  } catch (err) { console.error('❌ Light PDF Failed:', err.message); }
  
  // =========================================================================
  // 3. CLEANUP
  // =========================================================================
  try {
    if (fs.existsSync(OUTPUT_MD)) {
      fs.unlinkSync(OUTPUT_MD);
      console.log(`🧹 Cleaned up intermediate file: ${OUTPUT_MD}`);
    }
  } catch (err) {
    console.error('⚠️ Could not delete intermediate markdown:', err.message);
  }
}

generateProtocolNexus();
