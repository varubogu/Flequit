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
      "$src/*": "src/*",
      "$lib/*": "src/lib/*",
      "$components/*": "src/lib/components/*",
      "$ui/*": "src/lib/components/ui/*",
      "$paraglide/*": "src/lib/paraglide/*",
      "$routes/*": "src/routes/*",
      "$services/*": "src/services/*",
      "$types/*": "src/types/*",
      "$utils/*": "src/utils/*"
    }
  },
};

export default config;
