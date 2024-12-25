import { z } from "zod";
import { SocialSchema } from "$src/types/enum/social";

export const ProfileSocialCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  url: z.string().url(),
  urlType: SocialSchema,
});

export type ProfileSocialCore = z.infer<typeof ProfileSocialCoreSchema>;
