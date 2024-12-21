import { z } from "zod";
import { ProjectSchema } from "../project";
import { TaskListSchema } from "../task-list";
import { TaskSchema } from "../task";

export const displaySchema = z.object({
  url: z.string().nonempty(),
});

export type Display = z.infer<typeof displaySchema>;
