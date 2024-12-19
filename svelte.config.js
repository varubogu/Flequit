// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
  ],
  kit: {
    adapter: adapter(),
    alias: {
      "$components/*": "src/lib/components/*",
      "$ui/*": "src/lib/components/ui/*",
      "$lib/*": "src/lib/*",
      "$routes/*": "src/routes/*",
      "$services/*": "src/services/*",
      "$types/*": "src/types/*",
      "$paraglide/*": "src/paraglide/*",
      "$utils/*": "src/utils/*"
    }
  },
};

export default config;