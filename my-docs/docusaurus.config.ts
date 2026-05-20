import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Puzzle Slider',
  tagline: 'A highly modular sliding puzzle game built with React 19, Zustand, and Feature-Sliced Design.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://ipz234-gpyu.github.io',
  baseUrl: '/Puzzle-Slider/',
  organizationName: 'ipz234-gpyu',
  projectName: 'Puzzle-Slider',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ipz234-gpyu/Puzzle-Slider/tree/main/my-docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/ipz234-gpyu/Puzzle-Slider/tree/main/my-docs/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Puzzle Slider',
      logo: {
        alt: 'Puzzle Slider logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'ui-kit/introduction',
          position: 'left',
          label: 'UI Kit',
        },
        {
          href: 'https://github.com/ipz234-gpyu/Puzzle-Slider',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'UI Kit',
              to: '/docs/ui-kit/introduction',
            },
          ],
        },
        {
          title: 'Repository',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ipz234-gpyu/Puzzle-Slider',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Puzzle Slider. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;