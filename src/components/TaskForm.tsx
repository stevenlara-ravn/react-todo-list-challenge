import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TasksStore, useTasksStore } from "../stores/tasks";
import { Task, TaskFormMode } from "../types/Task";
import TaskFormLayout from "./TaskFormLayout";

const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, { message: "Task title is required" }).max(30, { message: "Task title is too long" }),
  priority: z.enum(["Urgent", "High", "Normal", "Low"]),
  storyPoints: z.coerce.number().min(1, { message: "Number must be a number between 1 and 10" }).max(20, { message: "Number must be a number between 1 and 20" }),
  assignee: z.string().regex(/^[a-zA-Z\s]+$/),
  dueDate: z.string().refine((value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate > currentDate;
  }, { message: "Due date must be a future date" }),
});

type TaskFormData = z.infer<typeof taskSchema>;

function CreateTaskForm({ onClose }: { onClose: () => void }) {
  const addTask = useTasksStore((state: TasksStore) => state.addTask);
  const id = useId();

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
      id,
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

function EditTaskForm({ task, onClose }: { task: Task, onClose: () => void }) {
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
