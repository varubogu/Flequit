import { z } from "zod";

export const SettingsCoreSchema = z.object({
  id: z.string().uuid().nonempty(),
});

export type SettingsCore = z.infer<typeof SettingsCoreSchema>;
