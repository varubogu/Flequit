import { z } from "zod";
import { TaskListCoreSchema } from "$types/core/task-list";
import { TaskSchema } from "$types/components/task";

export const TaskListSchema = TaskListCoreSchema.extend({
  tasks: z.array(TaskSchema),
});

export type TaskList = z.infer<typeof TaskListSchema>;
