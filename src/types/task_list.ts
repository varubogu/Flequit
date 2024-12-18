import { z } from "zod";
import { taskSchema } from "./task";

export const taskListSchema = z.object({
    icon: z.string().optional(),
    title: z.string().nonempty(),
    tasks: z.array(taskSchema),
});

export type TaskList = z.infer<typeof taskListSchema>;
