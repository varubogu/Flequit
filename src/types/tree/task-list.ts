import { z } from "zod";
import { TaskListCoreSchema } from "$types/core/task-list";
import { TaskTreeSchema } from "$types/tree/task";

export const TaskListTreeSchema = TaskListCoreSchema.extend({
  tasks: z.array(TaskTreeSchema),
});

export type TaskListTree = z.infer<typeof TaskListTreeSchema>;
