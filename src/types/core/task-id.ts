import { z } from "zod";

export const TaskIdSchema = z.string().uuid().nonempty();

export type TaskId = z.infer<typeof TaskIdSchema>;
