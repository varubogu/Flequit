import { z } from "zod";
import { ProjectIdSchema } from "$types/core/project-id";

export const ProjectCoreSchema = z.object({
  id: ProjectIdSchema,
  icon: z.string(),
  name: z.string().nonempty(),
});

export type ProjectCore = z.infer<typeof ProjectCoreSchema>;
