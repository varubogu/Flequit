import { z } from "zod";

export const TagCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  themeId: z.string().uuid().optional(),
});

export type Tag = z.infer<typeof TagCoreSchema>;
