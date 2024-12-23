import { useTasksStore } from "../stores/tasks";
import { Task, TasksStore } from "../types/Task";
import TaskCard from "./TaskCard";


export default function TaskList() {
  const tasks = useTasksStore((state: TasksStore) => state.tasks) as Task[];

  return (
    <ul className="flex flex-col items-center w-full h-full gap-5 overflow-auto rounded-lg p-5">
      {
        tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))
      }
    </ul>
  )
}