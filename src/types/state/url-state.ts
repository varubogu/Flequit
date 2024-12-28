import { z } from "zod";

export const urlStateSchema = z.object({
  daily: z.string().nullable(),
  project: z.string().nullable(),
  taskList: z.string().nullable(),
});

export type UrlState = z.infer<typeof urlStateSchema>;
