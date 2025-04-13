import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/rotas/', // Substitua pelo nome do repositório no GitHub Pages
});
