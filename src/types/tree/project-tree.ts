import { z } from "zod";
import { ProjectCoreSchema } from "$types/core/project";
import { TaskListTreeSchema } from "$src/types/tree/task-list-tree";

export const ProjectTreeSchema = ProjectCoreSchema.extend({
  taskLists: z.array(TaskListTreeSchema),
});

export type ProjectTree = z.infer<typeof ProjectTreeSchema>;
