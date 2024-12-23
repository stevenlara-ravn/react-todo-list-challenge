import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { taskSchema } from "../config/validation/taskSchema";
import { useTasksStore } from "../stores/tasks";
import { TaskFormData, TasksStore } from "../types/Task";
import TaskFormLayout from "./TaskFormLayout";

export default function CreateTaskForm({ onClose }: { onClose: () => void }) {
  const addTask = useTasksStore((state: TasksStore) => state.addTask);
  const id = uuidv4();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    const newTask = {
      id: id,
      title: data.title,
      priority: data.priority,
      storyPoints: data.storyPoints,
      assignee: data.assignee,
      dueDate: data.dueDate
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    addTask(newTask);

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
        formMode="create"
      />
    </aside>
  );
}
