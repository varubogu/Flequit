<script lang="ts">
  import "$src/global.css";
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  // import Sidebar from "$components/sidebar.svelte";
  import * as Sidebar from "$ui/sidebar/index";
  import AppSidebar from "$components/app-sidebar.svelte";

  let { children } = $props();
  onMount(() => {
    theme.initialize();
  });
</script>

<Sidebar.Provider open={true} controlledOpen={true}>
  <AppSidebar />
  <main class="p-4">
    {@render children?.()}
  </main>
</Sidebar.Provider>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  :global(:root) {
    --sidebar-width: 256px;
    --sidebar-collapsed-width: 64px;
  }
</style>

