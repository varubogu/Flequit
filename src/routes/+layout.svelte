<script>
  import "../global.css";
  import Sidebar from "$components/sidebar.svelte";
</script>

<div class="flex min-h-screen bg-background">
  <Sidebar />
  <main class="flex-1 p-4">
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

