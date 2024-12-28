import { z } from "zod";
import { ProjectCoreSchema } from "../core/project";
import { TaskListCoreSchema } from "../core/task-list";

export const SidebarProjectsSchema = ProjectCoreSchema.extend({
  taskLists: z.array(TaskListCoreSchema),
});

export type SidebarProjects = z.infer<typeof SidebarProjectsSchema>;
