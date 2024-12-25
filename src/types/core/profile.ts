import { z } from "zod";

export const ProfileCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  email: z.string().email(),
});

export type ProfileCore = z.infer<typeof ProfileCoreSchema>;
