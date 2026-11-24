import { defineConfig } from 'vitest/config';

// Configura o Vitest para testes que precisam de recursos de navegador.
export default defineConfig({
  test: {
    // jsdom simula o navegador e setup.js carrega recursos comuns aos testes.
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
  },
});
