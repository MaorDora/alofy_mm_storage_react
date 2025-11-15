import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa' // 1. ייבוא הפלאגין

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. הוספת הפלאגין עם הגדרות
    VitePWA({
      registerType: 'autoUpdate', // ירענן את האפליקציה אוטומטית כשיש גרסה חדשה
      injectRegister: 'auto',
      workbox: {
        // יגדיר אילו קבצים לשמור במטמון (cache)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
      },
      // הגדרות המניפסט (מבוסס על הקובץ הישן שלך)
      manifest: {
        name: "מלאי אלופי",
        short_name: "מלאי אלופי",
        "start_url": "/", // --- התיקון בוצע כאן ---
        "display": "standalone",
        "background_color": "#121212",
        "theme_color": "#2a2a2a",
        "orientation": "portrait-primary",
        icons: [
          {
            "src": "/realdimond.png", // ודא שהקובץ הזה קיים ב-public
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/realdimond.png", // ודא שהקובץ הזה קיים ב-public
            "type": "image/png",
            "sizes": "512x512"
          }
        ]
      }
    })
  ],
})