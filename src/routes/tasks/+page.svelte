<script lang="ts">
  import { ChevronLeft } from "lucide-svelte";
  import { Plus } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { Button } from "$ui/button";
  import { ScrollArea } from "$ui/scroll-area";
  import * as Sidebar from "$ui/sidebar/index";
  import TaskItem from "$components/task-item.svelte";
  import TaskDetail from "$components/task-detail.svelte";
  import type { Task } from "$types/components/task";
  import type { PageData } from "./$types";

  export let data: PageData;
  let selectedTask: Task | null = null;
  $: selectedTask = data.taskList.tasks[0];
  let isDetailOpen = false;
  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

<Sidebar.Trigger class="-ml-1" />

{#if mounted}
  <div class="h-screen flex">
    <!-- タスクリスト -->
    <div class="flex-1 bg-muted/30">
      <ScrollArea class="h-full">
        {#if data?.taskList?.tasks}
          {#each data.taskList.tasks as task}
            <TaskItem {task} />
          {/each}
        {/if}
      </ScrollArea>

      <Button
        class="fixed lg:absolute bottom-4 right-4 rounded-full"
        size="icon"
      >
        <Plus class="h-4 w-4" />
      </Button>
    </div>

    <!-- タスク詳細 - PC -->
    <div class="hidden lg:block w-72 border-l">
      {#if selectedTask}
        <TaskDetail task={selectedTask} />
      {/if}
    </div>

    <!-- タスク詳細 - モバイル -->
    {#if isDetailOpen}
      <div
        class="lg:hidden fixed inset-0 bg-background"
        transition:fly={{ x: 300, duration: 200 }}
      >
        <Button
          variant="ghost"
          size="icon"
          class="absolute top-4 left-4"
          on:click={() => (isDetailOpen = false)}
        >
          <ChevronLeft class="h-4 w-4" />
        </Button>

        <div class="pt-16">
          {#if selectedTask}
            <TaskDetail task={selectedTask} />
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}
