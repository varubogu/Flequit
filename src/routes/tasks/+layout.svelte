<script lang="ts">
  import "$src/global.css";
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import Sidebar from "$components/sidebar.svelte";

  onMount(() => {
    theme.initialize();
  });
</script>

<div class="min-h-screen grid grid-cols-[auto,1fr]">
  <Sidebar />
  <main class="p-4">
    <slot />
  </main>
</div>

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

