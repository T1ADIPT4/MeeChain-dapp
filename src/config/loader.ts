// src/config/loader.ts
import previewA from './deploy.preview.a.json';
import previewB from './deploy.preview.b.json';
import prodA from './deploy.prod.a.json';
import prodB from './deploy.prod.b.json';

const env = import.meta.env.VERCEL_ENV ?? 'preview';
const workspace = import.meta.env.VITE_WORKSPACE_NAME ?? 'a';

const configMap = {
  a: {
    preview: previewA,
    production: prodA,
  },
  b: {
    preview: previewB,
    production: prodB,
  },
};

export const deployed = configMap[workspace]?.[env] ?? previewA;
