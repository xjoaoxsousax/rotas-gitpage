import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/rotas-gitpage/', // Nome do repositório no GitHub Pages
});
