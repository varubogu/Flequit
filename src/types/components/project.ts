import { z } from "zod";
import { ProjectCoreSchema } from "$types/core/project";
import { TaskListSchema } from "$types/components/task-list";

export const ProjectItemSchema = ProjectCoreSchema.extend({
  taskLists: z.array(TaskListSchema),
});

export type ProjectItem = z.infer<typeof ProjectItemSchema>;
