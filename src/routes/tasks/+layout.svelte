<script lang="ts">
  import "$src/global.css";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { page } from "$app/state";
  import { theme } from "$lib/stores/theme";
  import AppSidebar from "$components/app-sidebar.svelte";
  import * as Sidebar from "$ui/sidebar/index";
  import { selectedState } from "$lib/stores/selected-store.svelte";
  import type { SelectedState } from "$src/types/state/selected-state";
  import { DailyUtil } from "$src/types/enum/daily";
  let { children } = $props();

  $effect(() => {
    selectedState.daily = DailyUtil.toDaily(page.url.searchParams.get("daily") ?? "");
    selectedState.projectId = page.url.searchParams.get("project");
    selectedState.taskListId = page.url.searchParams.get("tasks");
    selectedState.taskId = page.url.searchParams.get("task");
    selectedState.subTaskId = page.url.searchParams.get("subTask");
  });
  $inspect(page.url.searchParams);
  $inspect(selectedState);

  onMount(() => {
    theme.initialize();

  });
</script>

<Sidebar.Provider open={true} controlledOpen={true}>
  <AppSidebar />
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
