import { z } from "zod";
import { SubTaskSchema } from "$types/tree/sub-task";
import { TaskCoreSchema } from "$types/core/task";

export const TaskSchema = TaskCoreSchema.extend({
  subTasks: z.array(SubTaskSchema).optional(),
});

export type Task = z.infer<typeof TaskSchema>;

