import './globals.css';

export const metadata = {
  title: 'TaskFlow — Gerenciamento de Tarefas',
  description: 'Aplicação web para gerenciamento de tarefas de equipe com Next.js e JSONPlaceholder.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
