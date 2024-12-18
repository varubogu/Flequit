import { z } from "zod";
import { tagSchema } from "./tag";

export const taskSchema = z.lazy((): z.ZodType => z.object({
  id: z.string().uuid().nonempty(),
  icon: z.string().optional(),
  title: z.string().nonempty(),
  description: z.string(),
  importance: z.number().nonnegative(),
  priority: z.number().nonnegative(),
  dueDate: z.string().datetime(),
  completeDate: z.string().datetime(),
  completed: z.boolean(),
  cycle: z.string(),
  tags: z.array(tagSchema).optional(),
  subTasks: z.array(taskSchema).optional(),
}));

export type Task = z.infer<typeof taskSchema>;

