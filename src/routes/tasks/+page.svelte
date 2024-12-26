<script lang="ts">
  import { ChevronLeft } from "lucide-svelte";
  import { Plus } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import { Button } from "$ui/button";
  import TaskItem from "$components/task-item.svelte";
  import TaskDetail from "$components/task-detail.svelte";
  import type { Task } from "$types/components/task";
  import { projectsStore } from "$lib/stores/projects";
  import { filterTasksByDate } from "$lib/features/tasks/task-filter";
  import { updateTask, getTasksFromProjects } from "$lib/features/tasks/task-store";
  import { taskParams, getCurrentParams, createTaskSelection } from "$lib/features/tasks/task-params";
  import { page } from "$app/stores";

  // プロジェクトストアを購読
  const projects = $derived($projectsStore);

  // URLパラメータの監視
  const urlParams = $derived($page.url.searchParams);

  // タスク選択の状態管理
  const taskSelection = createTaskSelection();
  const { selectedTask, isDetailOpen, selectTask, closeDetail } = taskSelection;

  // ストアの値を購読
  const selectedTaskValue = $derived($selectedTask);
  const isDetailOpenValue = $derived($isDetailOpen);

  // 表示するタスクリストの取得
  const displayTasks = $derived(getDisplayTasks());

  // タスクリストの取得ロジック
  function getDisplayTasks(): Task[] {
    // 2. パラメータ変更時のタスクリストの再計算
    // これを消すと再レンダリングが行われないので注意
    console.log('2. getDisplayTasks called with urlParams:', urlParams.toString());

    if (!projects) {
      return [];
    }

    const params = getCurrentParams();

    if (params.daily) {
      // すべてのプロジェクトのタスクを結合
      const allTasks = projects.flatMap((project) =>
        project.taskLists.flatMap((list) => list.tasks)
      );
      const filteredTasks = filterTasksByDate(allTasks, params.daily);
      return filteredTasks;
    }

    const projectTasks = getTasksFromProjects(projects, params.project, params.taskList);
    return projectTasks;
  }

  // 3. 画面の再レンダリング
  $effect(() => {
    taskSelection.updateSelection(displayTasks);
  });
</script>

<div class="h-screen flex">
  <!-- タスクリスト -->
  <div class="flex-1 bg-muted/30 relative flex flex-col">
    <div class="flex-1 overflow-auto">
      {#if displayTasks && displayTasks.length > 0}
        <div class="p-4 space-y-4">
          {#each displayTasks as task}
            <TaskItem
              {task}
              on:select={({ detail }) => selectTask(detail.task)}
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

  <!-- タスク詳細 - PC -->
  <div class="lg:block w-72 border-l">
    {#if selectedTaskValue}
      <TaskDetail
        task={selectedTaskValue}
        on:update={({ detail }) => updateTask(detail.task)}
      />
    {/if}
  </div>

  <!-- タスク詳細 - モバイル -->
  {#if isDetailOpenValue}
    <div
      class="fixed inset-0 bg-background"
      transition:fly={{ x: 300, duration: 200 }}
    >
      <Button
        variant="ghost"
        size="icon"
        class="absolute top-4 left-4"
        on:click={closeDetail}
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

      <div class="pt-16">
        {#if selectedTaskValue}
          <TaskDetail
            task={selectedTaskValue}
            on:update={({ detail }) => updateTask(detail.task)}
          />
        {/if}
      </div>
    </div>
  {/if}
</div>
