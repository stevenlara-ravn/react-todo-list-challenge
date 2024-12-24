import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TasksStore } from "../types/Task";

export const useTasksStore = create<TasksStore>()(
    persist(
        (set) => ({
            allTasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
            tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

            updateTasks: (updatedTasks: Task[]) => set({ tasks: updatedTasks }),

            addTask: (newTask: Task) => {
                set((state) => {
                    const updatedTasks = [...state.allTasks, newTask];
                    return { allTasks: updatedTasks, tasks: updatedTasks };
                });
            },

            deleteTask: (taskId: string) => {
                set((state) => {
                    const updatedTasks = state.allTasks.filter((task: Task) => task.id !== taskId);
                    return { allTasks: updatedTasks, tasks: updatedTasks };
                });
            },

            resetTasks: () => set((state) => ({ tasks: state.allTasks })),
        }),
        { name: 'tasks' }
    )
);
