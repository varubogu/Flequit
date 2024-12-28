import { z } from "zod";
import { ProjectCoreSchema } from "$types/core/project";
import { TaskListSchema } from "$types/components/task-list";

export const ProjectSchema = ProjectCoreSchema.extend({
  taskLists: z.array(TaskListSchema),
});

export type Project = z.infer<typeof ProjectSchema>;
