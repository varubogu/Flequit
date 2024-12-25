import { z } from "zod";

export const UserCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
});

export type UserCore = z.infer<typeof UserCoreSchema>;
