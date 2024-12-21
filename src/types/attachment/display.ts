import { z } from "zod";
import { ProjectSchema } from "../project";
import { TaskListSchema } from "../task-list";
import { TaskSchema } from "../task";

export const displaySchema = z.object({
  url: z.string().nonempty(),
});

export type Display = z.infer<typeof displaySchema>;

export const ProjectDisplaySchema = ProjectSchema.extend(displaySchema.shape);
export type ProjectDisplay = z.infer<typeof ProjectDisplaySchema>;

export const taskListDisplaySchema = TaskListSchema.extend(displaySchema.shape);
export type TaskListDisplay = z.infer<typeof taskListDisplaySchema>;

export const taskDisplaySchema = TaskSchema.extend(displaySchema.shape);
export type TaskDisplay = z.infer<typeof taskDisplaySchema>;
