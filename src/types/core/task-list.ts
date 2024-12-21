import { z } from "zod";

export const TaskListCoreSchema = z.object({
    id: z.string().uuid().nonempty(),
    icon: z.string().optional(),
    name: z.string().nonempty(),
});

export type TaskListCore = z.infer<typeof TaskListCoreSchema>;
