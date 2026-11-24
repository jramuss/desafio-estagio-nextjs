import './globals.css';

// Informações usadas pelo navegador na aba e pelos mecanismos de busca.
export const metadata = {
  title: 'TaskFlow — Gerenciamento de Tarefas',
  description: 'Aplicação web para gerenciamento de tarefas de equipe com Next.js e JSONPlaceholder.',
};

// Estrutura comum das páginas: idioma português e conteúdo dentro do body.
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
