export type TaskFormMode = 'create' | 'edit';

export type TaskPriority = "Urgent" | "High" | "Normal" | "Low";

export interface Task {
    id?: string;
    title: string;
    priority: TaskPriority;
    storyPoints: number;
    assignee: string;
    dueDate: string;
}