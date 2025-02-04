import { z } from "zod";
import { SubTaskTreeSchema } from "$src/types/tree/sub-task-tree";
import { TaskCoreSchema } from "$types/core/task";

export const TaskTreeSchema = TaskCoreSchema.extend({
  subTasks: z.array(SubTaskTreeSchema).optional(),
});

export type TaskTree = z.infer<typeof TaskTreeSchema>;
