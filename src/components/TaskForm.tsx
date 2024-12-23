import { Task, TaskFormMode } from "../types/Task";
import CreateTaskForm from "./CreateTaskForm";
import EditTaskForm from "./EditTaskForm";

export default function TaskForm({ mode = 'create', task, onClose }: { mode?: TaskFormMode, task?: Task, onClose: () => void }) {
  switch (mode) {
    case 'create':
      return <CreateTaskForm onClose={onClose} />
    case 'edit':
      if (!task) {
        return null;
      }
      return <EditTaskForm task={task} onClose={onClose} />
  }
}
