import TaskItem from "./TaskItem";

export default function TaskList({ tasks, usersById }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} userName={usersById.get(task.userId)?.name} />
      ))}
    </ul>
  );
}
