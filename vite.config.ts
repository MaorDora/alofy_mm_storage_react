// src/vite.config.ts
// --- העתק והדבק את כל הקוד הזה ---

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],

        // --- 👇 התיקון נמצא כאן! 👇 ---
        // השורה הזו מונעת מה-Service Worker לחסום
        // את חלון ההתחברות הקופץ של גוגל.
        navigateFallbackDenylist: [/^\/__/]
        // --- 👆 סוף התיקון 👆 ---

      },
      manifest: {
        name: "מלאי אלופי",
        short_name: "מלאי אלופי",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#121212",
        "theme_color": "#2a2a2a",
        "orientation": "portrait-primary",
        icons: [
          {
            "src": "/realdimond.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/realdimond.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ]
      }
    })
  ],
})