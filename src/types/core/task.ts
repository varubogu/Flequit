import { z } from "zod";
import { TagCoreSchema } from "./tag";
import { ImportanceSchema } from "$types/enum/importance";
import { PrioritySchema } from "$types/enum/priority";
import { DateTimeSchema } from "$types/primitive-extensions/date-time";

export const TaskCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  icon: z.string(),
  name: z.string().nonempty(),
  description: z.string(),
  importance: ImportanceSchema,
  priority: PrioritySchema,
  dueDate: DateTimeSchema.nullable(),
  completeDate: DateTimeSchema.nullable(),
  completed: z.boolean(),
  cycle: z.string(),
  tags: z.array(TagCoreSchema).optional(),
});

export type TaskCore = z.infer<typeof TaskCoreSchema>;

