// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian from '@asterismono/starlight-obsidian';

export default defineConfig({
  site: 'https://community-chests.github.io/liberty',
  base: '/liberty',
  redirects: {
    '/': '/notes/',
  },
  integrations: [
    starlight({
      title: 'The Liberty Protocol',
      // Custom Slate & Green Styling
      customCss: ['./src/styles/custom.css'], 
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/community-chests/liberty' }
      ],
sidebar: [
  {
    label: 'Welcome',
    link: '/notes/', // Maps to index.md
  },
  {
    label: '🚀 Start Here',
    link: '/notes/bootstrapping', // Maps to bootstrapping.md
  },
  {
    label: '0. Root Logic',
    items: [
      { label: 'The Design Logic', link: '/notes/0-root/logic' }, //
    ],
  },
  {
    label: '1. The Spore (Self)',
    items: [
      { label: 'The Handshake', link: '/notes/1-spore/handshake' }, //
      { label: 'Sync Guide', link: '/notes/1-spore/guide-spore' }, //
    ],
  },
  {
    label: '2. The Pod (Local)',
    items: [
      { label: 'Resource Map Template', link: '/notes/2-pod/template' }, //
      { label: 'Vitals Guide', link: '/notes/2-pod/guide-pod' }, //
      // Use autogenerate to catch any new templates you add
    ],
  },
  {
    label: '3. The Mycelium (Network)',
    items: [
      { label: 'Myco Link Pact', link: '/notes/3-mycelium/pact' }, //
      { label: 'Resilience Guide', link: '/notes/3-mycelium/guide-mycelium' }, //
    ],
  },
  {
    label: '📦 System Files',
    items: [
      { 
        label: 'Offline Protocol (Dark PDF)', 
        link: '/mycelium-protocol-offline.pdf',
        attrs: { target: '_blank' } 
      },
      { 
        label: 'Print Protocol (Light PDF)', 
        link: '/mycelium-protocol-print.pdf',
        attrs: { target: '_blank' } 
      },
    ],
  },
],
      plugins: [
        starlightObsidian({
          // POINT THIS TO YOUR EXISTING DOCS FOLDER
          vault: './docs', 
          // The plugin will sync them here for Astro to build
          output: 'notes', 
          config: {
            // Ensures your Obsidian-style links work perfectly
            useObsidianMarkdown: true, 
			copyAssets: true, 
          }
        }),
      ],
    }),
  ],
});