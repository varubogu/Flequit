import { z } from "zod";

export const TagCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
});

export type Tag = z.infer<typeof TagCoreSchema>;
