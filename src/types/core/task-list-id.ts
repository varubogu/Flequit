import { z } from "zod";

export const TaskListIdSchema = z.string().uuid().nonempty();

export type TaskListId = z.infer<typeof TaskListIdSchema>;
