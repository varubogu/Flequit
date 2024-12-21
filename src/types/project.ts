import { z } from "zod";
import { ProjectCoreSchema } from "./core/project";
import { TaskListSchema } from "./task-list";

export const ProjectSchema = ProjectCoreSchema.extend({
  task_lists: z.array(TaskListSchema).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
