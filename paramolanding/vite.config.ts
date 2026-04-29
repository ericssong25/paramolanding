import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Prebundle lucide-react to avoid the browser loading individual icon files
  // (e.g., fingerprint.js) that ad blockers may block in dev.
  optimizeDeps: {
    include: ['lucide-react'],
  },
});
