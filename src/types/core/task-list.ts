import { z } from "zod";
import { TaskListIdSchema } from "$types/core/task-list-id";

export const TaskListCoreSchema = z.object({
  id: TaskListIdSchema,
  icon: z.string().optional(),
  name: z.string().nonempty(),
});

export type TaskListCore = z.infer<typeof TaskListCoreSchema>;
