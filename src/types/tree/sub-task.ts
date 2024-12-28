import { z } from "zod";
import { TaskCoreSchema } from "$types/core/task";

export const SubTaskTreeSchema = TaskCoreSchema.extend({
});

export type SubTaskTree = z.infer<typeof SubTaskTreeSchema>;
