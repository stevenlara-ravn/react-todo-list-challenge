import { Pencil, Trash2 } from "lucide-react";
import { useModalStore } from "../stores/modal";
import { useTasksStore } from "../stores/tasks";

import { Task, TasksStore } from "../types/Task";
import { ModalStore } from "../types/Modal";

export default function TaskCard({ task }: { task: Task }) {
  const setShowModal = useModalStore((state: ModalStore) => state.setShowModal);
  const deleteTask = useTasksStore((state: TasksStore) => state.deleteTask);

  return (
    <li className="flex flex-row items-center justify-between w-full p-3 rounded-lg nm-flat-slate-500 text-slate-200">
      <div className="flex flex-col items-start justify-between w-3/6">
        <p className="text-2xl">
          {task.title}
        </p>
        <p className="text-base">{task.assignee}</p>
      </div>

      <div className="flex flex-col items-center justify-between text-center w-fit px-3 gap-2">
        <p
          className="font-bold nm-flat-slate-500-sm px-3 rounded-xl"
        >
          {task.priority}
        </p>
        <p className="text-base nm-inset-slate-400 w-10 text-slate-700 rounded-full p-1">
          {task.storyPoints}
        </p>
      </div>

      <div className="w-fit flex-col items-center justify-between gap-2 text-center">
        <p
          className="font-bold"
        >
          Due Date:
        </p>
        <p>
          {task.dueDate}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between h-full gap-3">
        <button
          className="p-2 rounded-full nm-flat-slate-500 active:nm-inset-slate-500"
          onClick={() => setShowModal(true, 'edit', task)}
        >
          <Pencil size={20} />
        </button>
        <button
          className="p-2 rounded-full nm-flat-slate-500 active:nm-inset-slate-500"
          onClick={() => deleteTask(task.id as string)}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </li>
  )
}