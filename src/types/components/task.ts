import { z } from "zod";
import { SubTaskSchema } from "./sub-task";
import { TaskCoreSchema } from "../core/task";

export const TaskSchema = TaskCoreSchema.extend({
  subTasks: z.array(SubTaskSchema).optional(),
});

export type Task = z.infer<typeof TaskSchema>;

