import { z } from "zod";
import { ProjectSchema } from "../project";
import { TaskListSchema } from "../task-list";
import { TaskSchema } from "../task";

export const displaySchema = z.object({
  url: z.string().nonempty(),
});

export type Display = z.infer<typeof displaySchema>;

export const projectDisplaySchema = ProjectSchema.extend(displaySchema.shape)
export const ProjectExtendedDisplay = z.union([ProjectSchema, displaySchema])
export type ProjectExtendedDisplay = z.infer<typeof ProjectExtendedDisplay>;

export const taskListDisplaySchema = TaskListSchema.extend(displaySchema.shape)
export const TaskListExtendedDisplay = z.union([TaskListSchema, displaySchema])
export type TaskListExtendedDisplay = z.infer<typeof TaskListExtendedDisplay>;

export const taskDisplaySchema = TaskSchema.extend(displaySchema.shape)
export const TaskExtendedDisplay = z.union([TaskSchema, displaySchema])
export type TaskExtendedDisplay = z.infer<typeof TaskExtendedDisplay>;
