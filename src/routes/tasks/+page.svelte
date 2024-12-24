<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import * as Breadcrumb from "$src/lib/components/ui/breadcrumb/index";
  import Separator from "$src/lib/components/ui/separator/separator.svelte";
  import * as Sidebar from "$src/lib/components/ui/sidebar/index";
  import { ChevronLeft } from "lucide-svelte";
  import { Plus } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import type { Task } from "$src/types/task";
  import type { TaskList } from "$src/types/task-list";
  import { onMount } from "svelte";

  // 初期データ
  const initialData = {
    taskList: {
      id: "1",
      name: "メインタスクリスト",
      icon: "📝",
      url: "/tasks",
      tasks: [
        {
          id: "task-1",
          name: "タスク1",
          description: "昨日までに完了すべきタスク",
          importance: 3,
          priority: 5,
          dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 昨日
          completeDate: new Date().toISOString(),
          completed: false,
          cycle: "once",
          tags: [
            { id: "tag-1", name: "重要" },
            { id: "tag-2", name: "期限切れ" }
          ],
          url: "/tasks/task-1"
        },
        {
          id: "task-2",
          name: "タスク2",
          description: "明日までのタスク",
          importance: 2,
          priority: 3,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 明日
          completeDate: new Date().toISOString(),
          completed: false,
          cycle: "once",
          tags: [
            { id: "tag-3", name: "通常" }
          ],
          url: "/tasks/task-2"
        }
      ]
    }
  };

  let data = initialData;
  let selectedTask: Task | null = null;
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
      <div class="p-4 space-y-2">
        {#if data?.taskList?.tasks}
          {#each data.taskList.tasks as task}
            <Card
              class="p-4 cursor-pointer hover:bg-muted/50"
              on:click={() => {
                selectedTask = task;
                isDetailOpen = true;
              }}
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    on:click={(e) => e.stopPropagation()}
                  />
                  <span>{task.name}</span>
                </div>
                <span
                  class="text-sm"
                  class:text-red-500={new Date(task.dueDate) < new Date()}
                  class:text-blue-500={new Date(task.dueDate) > new Date()}
                >
                  {new Date(task.dueDate).toLocaleString()}
                </span>
              </div>
            </Card>
          {/each}
        {/if}
      </div>
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
    <ScrollArea class="h-full">
      <div class="p-4">
        {#if selectedTask}
          <h2 class="text-lg font-semibold mb-4">{selectedTask.name}</h2>
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">{selectedTask.description}</p>
            <div>
              <h3 class="text-sm font-medium mb-2">期限</h3>
              <p class="text-sm">{new Date(selectedTask.dueDate).toLocaleString()}</p>
            </div>
            {#if selectedTask.tags && selectedTask.tags.length > 0}
              <div>
                <h3 class="text-sm font-medium mb-2">タグ</h3>
                <div class="flex flex-wrap gap-2">
                  {#each selectedTask.tags as tag}
                    <span class="text-xs bg-muted px-2 py-1 rounded">{tag.name}</span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <div class="text-center text-muted-foreground mt-8">
            タスクを選択してください
          </div>
        {/if}
      </div>
    </ScrollArea>
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

      <ScrollArea class="h-full pt-16">
        <div class="p-4">
          {#if selectedTask}
            <h2 class="text-lg font-semibold mb-4">{selectedTask.name}</h2>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">{selectedTask.description}</p>
              <div>
                <h3 class="text-sm font-medium mb-2">期限</h3>
                <p class="text-sm">{new Date(selectedTask.dueDate).toLocaleString()}</p>
              </div>
              {#if selectedTask.tags && selectedTask.tags.length > 0}
                <div>
                  <h3 class="text-sm font-medium mb-2">タグ</h3>
                  <div class="flex flex-wrap gap-2">
                    {#each selectedTask.tags as tag}
                      <span class="text-xs bg-muted px-2 py-1 rounded">{tag.name}</span>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </ScrollArea>
    </div>
  {/if}
</div>
{/if}
