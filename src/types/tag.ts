import { z } from "zod";
import { TagCoreSchema } from "./core/tag";

export const TagSchema = TagCoreSchema.extend({
});

export type Tag = z.infer<typeof TagSchema>;
