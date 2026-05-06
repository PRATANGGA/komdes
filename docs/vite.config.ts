import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import mdx from 'fumadocs-mdx/vite';
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite';
import * as MdxConfig from './source.config';

const config = defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    devtools(), tailwindcss(), tanstackStart(), viteReact(), mdx(MdxConfig)],
  resolve: { tsconfigPaths: true },
});

export default config;
