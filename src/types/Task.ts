import { z } from "zod";
import { taskSchema } from "../config/validation/taskSchema";

export type TaskFormMode = 'create' | 'edit';
export type TaskPriority = "Urgent" | "High" | "Normal" | "Low";
export type TaskFormData = z.infer<typeof taskSchema>;

export interface Task {
    id?: string;
    title: string;
    priority: TaskPriority;
    storyPoints: number;
    assignee: string;
    dueDate: string;
}

export interface TasksStore {
    allTasks: Task[];
    tasks: Task[];
    updateTasks: (updatedTasks: Task[]) => void;
    addTask: (newTask: Task) => void;
    deleteTask: (taskId: string) => void;
    resetTasks: () => void;
}