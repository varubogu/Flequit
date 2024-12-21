import { z } from "zod";
import { TaskCoreSchema } from "./core/task";
import { displaySchema } from "./attachment/display";

const subTaskDisplaySchema = TaskCoreSchema.extend(displaySchema.shape);
export const SubTaskSchema = subTaskDisplaySchema;
export type SubTask = z.infer<typeof SubTaskSchema>;

