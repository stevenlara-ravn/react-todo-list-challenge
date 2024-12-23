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
        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        const updatedTasks = [...existingTasks, newTask];

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        set({ tasks: updatedTasks });
    },
    updateTask: (taskId: string, updatedTask: Task) => {
        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        const updatedTasks = existingTasks.map((task: Task) => {
            if (task.id === taskId) {
                return updatedTask;
            }
            return task;
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        set({ tasks: updatedTasks });
    },
    deleteTask: (taskId: string) => {
        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        const updatedTasks = existingTasks.filter((task: Task) => task.id !== taskId);

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        set({ tasks: updatedTasks });
    },
}))