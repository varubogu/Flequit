<script lang="ts">
  import "$src/global.css";
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import Sidebar from "$components/sidebar.svelte";

  onMount(() => {
    theme.initialize();
  });
</script>

<div class="min-h-screen">
  <Sidebar />
  <main class="md:ml-64 p-4">
    <slot />
  </main>
</div>

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

