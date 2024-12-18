import { z } from "zod";

export const tagSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
});

export type Tag = z.infer<typeof tagSchema>;
