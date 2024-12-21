import { z } from "zod";
import { TaskCoreSchema } from "./core/task";

export const TaskSchema = TaskCoreSchema.extend({
  subTasks: z.array(TaskCoreSchema).optional(),
});

export type Task = z.infer<typeof TaskSchema>;

