import { z } from "zod";
import { TagCoreSchema } from "./tag";

export const TaskCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  icon: z.string().optional(),
  name: z.string().nonempty(),
  description: z.string(),
  importance: z.number().nonnegative(),
  priority: z.number().nonnegative(),
  dueDate: z.string().datetime(),
  completeDate: z.string().datetime(),
  completed: z.boolean(),
  cycle: z.string(),
  tags: z.array(TagCoreSchema).optional(),
});

export type TaskCore = z.infer<typeof TaskCoreSchema>;

