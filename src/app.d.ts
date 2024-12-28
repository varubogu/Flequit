import type { AvailableLanguageTag } from "$src/lib/paraglide/runtime";
import type { ParaglideLocals } from "@inlang/paraglide-sveltekit";

declare global {
  namespace App {
    interface Locals {
      paraglide: ParaglideLocals<AvailableLanguageTag>;
    }
  }
}
