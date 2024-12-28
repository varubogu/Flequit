import { z } from "zod";
import { ProjectCoreSchema } from "$types/core/project";
import { TaskListTreeSchema } from "$types/tree/task-list";

export const ProjectTreeSchema = ProjectCoreSchema.extend({
  taskLists: z.array(TaskListTreeSchema),
});

export type ProjectTree = z.infer<typeof ProjectTreeSchema>;
