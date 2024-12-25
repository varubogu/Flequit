import { z } from "zod";

export const ThemeCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  css: z.string(),
});

export type Theme = z.infer<typeof ThemeCoreSchema>;
