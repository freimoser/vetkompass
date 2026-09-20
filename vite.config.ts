import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/**
 * Bindet Cloudflare Web Analytics ein – aber nur, wenn ein Token gesetzt ist.
 *
 * Der Dienst setzt keine Cookies und liest nichts aus dem Endgerät, greift
 * also nicht unter § 25 Abs. 1 TDDDG. Deshalb wird er ohne Einwilligung und
 * ohne Banner geladen; die Rechtsgrundlage steht in der Datenschutzerklärung.
 *
 * Ohne Token passiert gar nichts: kein Skript, kein Hinweis, kein
 * "wird gerade eingerichtet".
 */
function cloudflareWebAnalytics(token: string): Plugin {
  return {
    name: 'cloudflare-web-analytics',
    transformIndexHtml() {
      if (!token) return [];
      return [
        {
          tag: 'script',
          injectTo: 'body',
          attrs: {
            defer: true,
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': JSON.stringify({ token }),
          },
        },
      ];
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    /**
     * GitHub Pages liefert Projektseiten unter /<repo>/ aus.
     * Der Pfad kommt aus VITE_BASE (siehe .env bzw. den Deploy-Workflow).
     */
    base: env.VITE_BASE || '/',
    plugins: [
      react(),
      tailwindcss(),
      cloudflareWebAnalytics(env.VITE_CF_ANALYTICS_TOKEN || ''),
    ],
  };
});
