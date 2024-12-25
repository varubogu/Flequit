import { z } from "zod";

export const SocialSchema = z.enum([
  "X",
  "Twitter",
  "Instagram",
  "Facebook",
  "Linkedin",
  "Youtube",
  "Tiktok",
  "Twitch",
  "GitHub",
  "Discord",
  "Telegram",
  "Whatsapp",
  "Line",
  "Spotify",
  "Patreon",
]);

export type Social = z.infer<typeof SocialSchema>;
