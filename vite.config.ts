import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    /**
     * GitHub Pages liefert Projektseiten unter /<repo>/ aus.
     * Der Pfad kommt aus VITE_BASE (siehe .env bzw. den Deploy-Workflow).
     */
    base: env.VITE_BASE || '/',
    plugins: [react(), tailwindcss()],
  };
});
