import { z } from "zod";

export const ProjectCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  icon: z.string(),
  name: z.string().nonempty(),
});

export type Project = z.infer<typeof ProjectCoreSchema>;
