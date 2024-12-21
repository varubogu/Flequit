import { z } from "zod";
import { ProjectCoreSchema } from "./core/project";
import { TaskListSchema } from "./task-list";
import { displaySchema } from "./attachment/display";


const projectDisplaySchema = ProjectCoreSchema.extend(displaySchema.shape);

export const ProjectSchema = projectDisplaySchema.extend({
  taskLists: z.array(TaskListSchema),
});

export type Project = z.infer<typeof ProjectSchema>;
