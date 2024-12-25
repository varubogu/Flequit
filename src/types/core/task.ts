import { z } from "zod";
import { TagCoreSchema } from "./tag";
import { ImportanceSchema } from "../enum/importance";
import { PrioritySchema } from "../enum/priority";

export const TaskCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  icon: z.string(),
  name: z.string().nonempty(),
  description: z.string(),
  importance: ImportanceSchema,
  priority: PrioritySchema,
  dueDate: z.string().datetime(),
  completeDate: z.string().datetime(),
  completed: z.boolean(),
  cycle: z.string(),
  tags: z.array(TagCoreSchema).optional(),
});

export type TaskCore = z.infer<typeof TaskCoreSchema>;

