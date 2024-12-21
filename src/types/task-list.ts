import { z } from "zod";
import { TaskSchema } from "./task";
import { TaskListCoreSchema } from "./core/task-list";

export const TaskListSchema = TaskListCoreSchema.extend({
    tasks: z.array(TaskSchema),
});

export type TaskList = z.infer<typeof TaskListSchema>;
