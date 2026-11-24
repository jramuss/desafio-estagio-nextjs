import { TasksProvider } from "../store/tasks-context";
import TaskBoard from "../components/TaskBoard";

export default function HomePage() {
  return (
    <main className="container">
      <header className="page-header">
        <h1>TaskFlow</h1>
        <p>Gerenciamento de tarefas da equipe</p>
      </header>
      <TasksProvider>
        <TaskBoard />
      </TasksProvider>
    </main>
  );
}
