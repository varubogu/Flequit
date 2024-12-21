import { z } from "zod";
import { TaskCoreSchema } from "./core/task";
import { displaySchema } from "./attachment/display";
import { SubTaskSchema } from "./sub-task";

const taskDisplaySchema = TaskCoreSchema.extend(displaySchema.shape);

export const TaskSchema = taskDisplaySchema.extend({
  subTasks: z.array(SubTaskSchema).optional(),
});

export type Task = z.infer<typeof TaskSchema>;

