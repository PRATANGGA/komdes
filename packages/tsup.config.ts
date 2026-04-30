import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'fsevents',
  ],
  format: ['cjs', 'esm'],
});
