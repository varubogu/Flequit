<script lang="ts">
  import "$src/global.css";
  import { onMount } from "svelte";
  import { theme } from "$lib/stores/theme";
  import * as Sidebar from "$ui/sidebar/index";
  import AppSidebar from "$components/app-sidebar.svelte";
  import type { LayoutData } from "./$types";

  let { data, children } = $props<{ data: LayoutData }>();
  onMount(() => {
    theme.initialize();
  });
</script>

<Sidebar.Provider open={true} controlledOpen={true}>
  <AppSidebar projects={data.projects} />
  <Sidebar.Inset>
    <main class="p-4">
      <Sidebar.Trigger />
      {@render children?.()}
    </main>
  </Sidebar.Inset>
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
