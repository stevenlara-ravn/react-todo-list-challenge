import { create } from "zustand";
import { Task } from "../types/Task";

export interface TasksStore {
    allTasks: Task[];
    tasks: Task[];
    updateTasks: (updatedTasks: Task[]) => void;
    addTask: (newTask: Task) => void;
    deleteTask: (taskId: string) => void;
    resetTasks: () => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
    allTasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

    updateTasks: (updatedTasks: Task[]) => set({ tasks: updatedTasks }),

    addTask: (newTask: Task) => {
        set((state) => {
            const updatedTasks = [...state.allTasks, newTask];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return { allTasks: updatedTasks, tasks: updatedTasks };
        });
    },

    deleteTask: (taskId: string) => {
        set((state) => {
            const updatedTasks = state.allTasks.filter((task: Task) => task.id !== taskId);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return { allTasks: updatedTasks, tasks: updatedTasks };
        });
    },

    resetTasks: () => set((state) => ({ tasks: state.allTasks })),
}));
