import { create } from "zustand";
import { Task } from "../types/Task";


export interface TasksStore {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    updateTask: (taskId: string, updatedTask: Task) => void;
    deleteTask: (taskId: string) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    addTask: (newTask: Task) => {
        set((state) => ({ tasks: [...state.tasks, newTask] }));
    },
    updateTask: (taskId: string, updatedTask: Task) => {
        set((state) => ({
            tasks: [...state.tasks.map((task: Task) => {
                if (task.id === taskId) {
                    return updatedTask;
                }
                return task
            })]
        }));
    },
    deleteTask: (taskId: string) => {
        set((state) => ({ tasks: [...state.tasks.filter((task: Task) => task.id !== taskId)] }));
    },
}))