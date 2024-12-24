import { z } from "zod";

export const taskSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(5, { message: "Task title is required" }).max(30, { message: "Task title is too long" }),
    priority: z.enum(["Urgent", "High", "Normal", "Low"]),
    storyPoints: z.coerce.number().min(1, { message: "Number must be a number between 1 and 10" }).max(20, { message: "Number must be a number between 1 and 20" }),
    assignee: z.string().regex(/^[a-zA-Z\s]+$/, { message: "Username must be alphanumeric or space" }),
    dueDate: z.string().refine((value) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return selectedDate > currentDate;
    }, { message: "Due date must be a future date" }),
});