<script lang="ts">
  import { page } from "$app/state";
  import { sidebarProjects } from "$lib/stores/sidebar-projects.svelte";
  import { Button } from "$ui/button";
  import * as Sidebar from "$ui/sidebar/index";
  import * as Tooltip from "$ui/tooltip";
  import * as Collapsible from "$components/ui/collapsible";
  import {
    Plus,
    ChevronDown,
  } from "lucide-svelte";
  import SearchForm from "./search-form.svelte";
  import { goto } from "$app/navigation";
  import { selectedState } from "../stores/selected-store.svelte";
  import { dailyItems } from "./app-sidebar.d/daily-items";
  import { footerItems } from "./app-sidebar.d/footer-items";
  import { updateSearchParams } from "$lib/stores/selected-store.svelte";

  // ストアを購読
  let projects = sidebarProjects
  const selected = selectedState;
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <SearchForm />
    <!-- デイリータスク -->
    <nav class="grid gap-1 px-2">
      {#each dailyItems as item}
        <Button
          variant={selected.daily === item.paramValue ? "secondary" : "ghost"}
          class="w-full justify-start"
          onclick={() => {
            updateSearchParams({
              daily: item.param,
              project: null,
              tasks: null,
            });
          }}
        >
          <svelte:component this={item.icon} class="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      {/each}
    </nav>
  </Sidebar.Header>
  <Sidebar.Content>
    <div class="space-y-4 py-4">
      <!-- プロジェクト -->
      <div class="px-2">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-lg font-semibold tracking-tight">プロジェクト</h2>
          <div>
            <Tooltip.Root>
              <Tooltip.Trigger>
                <Button variant="ghost" size="icon" class="-mr-2">
                  <Plus class="h-4 w-4" />
                  <span class="sr-only">新規プロジェクト</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>新規プロジェクト</Tooltip.Content>
            </Tooltip.Root>
          </div>
        </div>
        <nav class="grid gap-1">
          {#each projects as project}
            <Collapsible.Root
              class="space-y-1"
              open={selected.projectId === project.id}
            >
              <Collapsible.Trigger class="w-full">
                <Button
                  variant={selected.projectId === project.id && !selected.taskListId
                    ? "secondary"
                    : "ghost"}
                  class="w-full justify-start"
                  onclick={() => {
                    updateSearchParams({
                      daily: null,
                      project: project.id,
                      tasks: null,
                    });
                  }}
                >
                  <span class="mr-2">{project.icon}</span>
                  {project.name}
                  <ChevronDown class="ml-auto h-4 w-4 transition-transform" />
                </Button>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <div class="ml-4 space-y-1 pt-1">
                  {#each project.taskLists as taskList}
                    <Button
                      variant={selected.taskListId === taskList.id
                        ? "secondary"
                        : "ghost"}
                      class="w-full justify-start"
                      onclick={() => {
                        updateSearchParams({
                          daily: null,
                          project: project.id,
                          tasks: taskList.id,
                        });
                      }}
                    >
                      <span class="mr-2">{taskList.icon}</span>
                      {taskList.name}
                    </Button>
                  {/each}
                  <div>
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <Button variant="ghost" class="w-full justify-start">
                          <Plus class="mr-2 h-4 w-4" />
                          新規リスト
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>新規タスクリスト</Tooltip.Content>
                    </Tooltip.Root>
                  </div>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          {/each}
        </nav>
      </div>
    </div>
  </Sidebar.Content>
  <Sidebar.Footer>
    <nav class="grid gap-1 px-2">
      {#each footerItems as item}
        <Button variant="ghost" class="w-full justify-start" href={item.url}>
          <svelte:component this={item.icon} class="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      {/each}
    </nav>
  </Sidebar.Footer>
</Sidebar.Root>
