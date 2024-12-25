import { z } from "zod";

export const ProfileSocialCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  url: z.string().url(),
  urlType: z.enum(["X", "Twitter", "Instagram", "Facebook", "Linkedin", "Youtube", "Tiktok", "Twitch", "GitHub", "Discord", "Telegram", "Whatsapp", "Line", "Spotify", "Patreon"]),
});

export type ProfileSocialCore = z.infer<typeof ProfileSocialCoreSchema>;
