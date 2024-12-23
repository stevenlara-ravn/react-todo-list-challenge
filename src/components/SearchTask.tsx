import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { TasksStore, useTasksStore } from "../stores/tasks";
import { Task } from "../types/Task";

export default function SearchTask() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [termDebounced] = useDebounce(searchTerm, 500);
  const tasks = useTasksStore((state: TasksStore) => state.tasks) as Task[];
  const updateTasks = useTasksStore((state: TasksStore) => state.updateTasks);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  }

  useEffect(() => {
    if (termDebounced.length > 0) {
      const filteredTasks = tasks.filter((task: Task) => {
        return task.title.toLowerCase().includes(termDebounced.toLowerCase())
          || task.assignee.toLowerCase().includes(termDebounced.toLowerCase());
      });

      updateTasks(filteredTasks);
    }

  }, [termDebounced]);

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-14"
    >
      <input
        className="w-full h-14 px-5 nm-flat-white-sm rounded-xl" type="text" placeholder="Let's find something for today"
        onChange={handleSearch}
      />
    </div>
  )
}