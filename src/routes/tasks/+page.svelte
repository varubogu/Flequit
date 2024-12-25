<script lang="ts">
  import { ChevronLeft } from "lucide-svelte";
  import { Plus } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Button } from "$ui/button";
  import { ScrollArea } from "$ui/scroll-area";
  import * as Sidebar from "$ui/sidebar/index";
  import TaskItem from "$components/task-item.svelte";
  import TaskDetail from "$components/task-detail.svelte";
  import type { Task } from "$types/components/task";
  import type { PageData } from "./$types";

  export let data: PageData;
  let selectedTask: Task | null = null;
  let isDetailOpen = false;
  let mounted = false;

  // URLのタスクIDパラメータを監視
  $: {
    const taskId = $page.url.searchParams.get("taskId");
    if (taskId && data?.taskList?.tasks) {
      const task = data.taskList.tasks.find((t) => t.id === taskId);
      if (task) {
        selectedTask = task;
        isDetailOpen = true;
      }
    }
  }

  onMount(() => {
    mounted = true;
    if (data?.taskList?.tasks?.length > 0) {
      // URLにタスクIDがない場合のみ、最初のタスクを選択
      if (!$page.url.searchParams.get("taskId")) {
        const firstTask = data.taskList.tasks[0];
        selectedTask = firstTask;
        // URLを更新（履歴に追加）
        goto(`?taskId=${firstTask.id}`, { replaceState: true });
      }
    }
  });

  function selectTask(task: Task) {
    selectedTask = task;
    isDetailOpen = true;
    // URLを更新（履歴に追加）
    goto(`?taskId=${task.id}`);
  }
</script>

<Sidebar.Trigger class="-ml-1" />

{#if mounted}
  <div class="h-screen flex">
    <!-- タスクリスト -->
    <div class="flex-1 bg-muted/30">
      <ScrollArea class="h-full">
        {#if data?.taskList?.tasks}
          {#each data.taskList.tasks as task}
            <TaskItem
              {task}
              on:select={({ detail }) => selectTask(detail.task)}
              on:update={({ detail }) => {
                const index = data.taskList.tasks.findIndex(
                  (t) => t.id === detail.task.id,
                );
                if (index !== -1) {
                  data.taskList.tasks[index] = detail.task;
                  if (selectedTask?.id === detail.task.id) {
                    selectedTask = detail.task;
                  }
                }
              }}
            />
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
        <TaskDetail
          task={selectedTask}
          on:update={({ detail }) => {
            const index = data.taskList.tasks.findIndex(
              (t) => t.id === detail.task.id,
            );
            if (index !== -1) {
              data.taskList.tasks[index] = detail.task;
              selectedTask = detail.task;
            }
          }}
        />
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
          on:click={() => {
            isDetailOpen = false;
            // URLからタスクIDを削除（履歴に追加）
            goto("?");
          }}
        >
          <ChevronLeft class="h-4 w-4" />
        </Button>

        <div class="pt-16">
          {#if selectedTask}
            <TaskDetail
              task={selectedTask}
              on:update={({ detail }) => {
                const index = data.taskList.tasks.findIndex(
                  (t) => t.id === detail.task.id,
                );
                if (index !== -1) {
                  data.taskList.tasks[index] = detail.task;
                  selectedTask = detail.task;
                }
              }}
            />
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}
