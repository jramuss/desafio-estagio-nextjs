import "./globals.css";

export const metadata = {
  title: "TaskFlow",
  description: "Gerenciamento de tarefas de uma equipe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
