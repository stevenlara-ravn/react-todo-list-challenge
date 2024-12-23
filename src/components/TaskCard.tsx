import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useTasksStore } from "../stores/tasks";
import { Task } from "../types/Task";
import TaskForm from "./TaskForm";

export default function TaskCard({ task }: { task: Task }) {
  const [showModal, setShowModal] = useState(false);
  const deleteTask = useTasksStore((state: any) => state.deleteTask);

  const handleDelete = (taskId: string) => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = existingTasks.filter((task: Task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    deleteTask(taskId);
  }

  return (
    <li className="flex flex-row items-center justify-between w-full px-8 py-3 rounded-lg nm-flat-white-sm">
      <div className="flex flex-col items-center justify-between gap-3">
        <p className="text-2xl">
          {task.title}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between h-full gap-3">
        <button
          className="nm-flat-white-sm p-2 rounded-full"
          onClick={() => setShowModal(true)}
        >
          <Pencil size={20} />
        </button>
        <button
          className="nm-flat-white-sm p-2 rounded-full"
          onClick={() => handleDelete(task.id as string)}
        >
          <Trash2 size={20} />
        </button>
      </div>

      {
        showModal && createPortal(
          <TaskForm mode="edit" task={task} onClose={() => setShowModal(false)} />,
          document.body
        )
      }
    </li>
  )
}