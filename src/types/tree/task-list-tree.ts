import { z } from "zod";
import { TaskListCoreSchema } from "$types/core/task-list";
import { TaskTreeSchema } from "$src/types/tree/task-tree";

export const TaskListTreeSchema = TaskListCoreSchema.extend({
  tasks: z.array(TaskTreeSchema),
});

export type TaskListTree = z.infer<typeof TaskListTreeSchema>;
