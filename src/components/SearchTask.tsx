import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTasksStore } from "../stores/tasks";
import { Task, TasksStore } from "../types/Task";

export default function SearchTask() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [termDebounced] = useDebounce(searchTerm, 500);
  const allTasks = useTasksStore((state: TasksStore) => state.allTasks);
  const updateTasks = useTasksStore((state: TasksStore) => state.updateTasks);
  const resetTasks = useTasksStore((state: TasksStore) => state.resetTasks);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    if (termDebounced.trim().length > 0) {
      const filteredTasks = allTasks.filter((task: Task) => {
        return (
          task.title.toLowerCase().includes(termDebounced.toLowerCase()) ||
          task.assignee.toLowerCase().includes(termDebounced.toLowerCase())
        );
      });

      updateTasks(filteredTasks);
    } else {
      resetTasks();
    }
  }, [termDebounced, allTasks, updateTasks, resetTasks]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-14">
      <input
        className="w-full h-14 px-5 nm-inset-slate-500-sm rounded-xl placeholder:text-slate-400 focus:outline-none focus:nm-inset-slate-500 focus:text-white"
        type="text"
        placeholder="Let's find something for today"
        onChange={handleSearch}
        value={searchTerm}
      />
    </div>
  );
}
