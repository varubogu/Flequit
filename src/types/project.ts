import { z } from "zod";
import { taskListSchema } from "./task_list";

export const projectSchema = z.object({
  id: z.string().uuid().nonempty(),
  icon: z.string().optional(),
  name: z.string().nonempty(),
  task_list: taskListSchema,
});

export type Project = z.infer<typeof projectSchema>;
