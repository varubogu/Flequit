import { z } from "zod";
import { TaskSchema } from "./task";
import { TaskListCoreSchema } from "./core/task-list";
import { displaySchema } from "./attachment/display";

const taskListDisplaySchema = TaskListCoreSchema.extend(displaySchema.shape);

export const TaskListSchema = taskListDisplaySchema.extend({
    tasks: z.array(TaskSchema),
});

export type TaskList = z.infer<typeof TaskListSchema>;
