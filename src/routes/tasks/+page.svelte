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

  let selectedTask: string | null = null;
  let isDetailOpen = false;
</script>

<Sidebar.Trigger class="-ml-1" />

<div class="h-screen flex">
  <!-- タスクリスト -->
  <div class="flex-1 bg-muted/30">
    <ScrollArea class="h-full">
      <div class="p-4 space-y-2">
        {#each ["タスク1", "タスク2"] as task}
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
                  on:click={(e) => e.stopPropagation()}
                />
                <span>{task}</span>
              </div>
              <span
                class="text-sm"
                class:text-red-500={task === "タスク1"}
                class:text-blue-500={task === "タスク2"}
              >
                {task === "タスク1" ? "昨日 18:30" : "明日 18:00"}
              </span>
            </div>
          </Card>
        {/each}
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
          <h2 class="text-lg font-semibold mb-4">{selectedTask}</h2>
          <!-- タスク詳細の内容はここに実装予定 -->
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
          <h2 class="text-lg font-semibold mb-4">{selectedTask}</h2>
          <!-- タスク詳細の内容はここに実装予定 -->
        </div>
      </ScrollArea>
    </div>
  {/if}
</div>
