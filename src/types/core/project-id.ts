import { z } from "zod";

export const ProjectIdSchema = z.string().uuid().nonempty();

export type ProjectId = z.infer<typeof ProjectIdSchema>;
