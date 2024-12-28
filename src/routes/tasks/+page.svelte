<script lang="ts">
  import { Plus } from "lucide-svelte";
  import { Button } from "$ui/button";
  import TaskItem from "$components/task-item.svelte";
  import type { Task } from "$types/components/task";
  import { selectedState } from "$lib/stores/selected-store.svelte";
  import { filteredTaskList } from "$lib/stores/filted-task-list.svelte";
  import {
    updateTask,
  } from "$lib/features/tasks/task-store";
  import { projectTaskTree } from "$lib/stores/project-task-tree.svelte";
  async function selectedTask(task: Task) {
    selectedState.taskId = task.id;
  }

    // プロジェクトストアを購読
  // let taskList = filteredTaskList;
  let _projectTaskTree = projectTaskTree;
  let taskList = _projectTaskTree[0].taskLists[0].tasks;
  const selected = selectedState;
</script>

<div class="h-screen flex">
  <!-- タスクリスト -->
  <div class="flex-1 bg-muted/30 relative flex flex-col">
    <div class="flex-1 overflow-auto">
      {#if taskList && taskList.length > 0}
        <div class="p-4 space-y-4">
          {#each taskList as task}
            <TaskItem
              task={task}
              on:select={({ detail }) => selectedTask(detail.task)}
              on:update={({ detail }) => updateTask(detail.task)}
            />
          {/each}
        </div>
      {:else}
        <div
          class="flex items-center justify-center h-full text-muted-foreground"
        >
          タスクがありません
        </div>
      {/if}
    </div>

    <Button class="absolute bottom-4 right-4 rounded-full" size="icon">
      <Plus class="h-4 w-4" />
    </Button>
  </div>
</div>
