import { z } from "zod";
import { TaskCoreSchema } from "$types/core/task";

export const SubTaskSchema = TaskCoreSchema.extend({
});

export type SubTask = z.infer<typeof SubTaskSchema>;
