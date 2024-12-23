import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "../config/validation/taskSchema";
import { useTasksStore } from "../stores/tasks";
import { Task, TaskFormData, TasksStore } from "../types/Task";
import TaskFormLayout from "./TaskFormLayout";

export default function EditTaskForm({ task, onClose }: { task: Task, onClose: () => void }) {
  const updateTasks = useTasksStore((state: TasksStore) => state.updateTasks);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    if (!task.id) {
      return;
    }
    const updatedData = { id: task.id, ...data };

    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = existingTasks.map((taskItem: Task) => {
      if (task.id === taskItem.id) {
        return updatedData;
      }
      return taskItem;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    updateTasks(updatedTasks);

    reset();
    onClose();
  };

  return (
    <aside className="absolute top-0 w-full h-full backdrop-blur-sm flex justify-center items-center">
      <TaskFormLayout
        handleSubmit={handleSubmit}
        onClose={onClose}
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        dataItem={task}
        formMode="edit"
      />
    </aside>
  );
}