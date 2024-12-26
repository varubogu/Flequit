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
  console.log('Projects in page:', projects);

  // URLパラメータの監視
  const urlParams = $derived($page.url.searchParams);

  // 1. URLパラメータの変更検知
  $effect(() => {
    console.log('1. URL params changed:', urlParams.toString());
    console.log('1. Current params from getCurrentParams():', getCurrentParams());
  });

  // タスク選択の状態管理
  const taskSelection = createTaskSelection();
  const { selectedTask, isDetailOpen, selectTask, closeDetail } = taskSelection;

  // 表示するタスクリストの取得
  const displayTasks = $derived(getDisplayTasks());

  // タスクリストの取得ロジック
  function getDisplayTasks(): Task[] {
    // 2. パラメータ変更時のタスクリストの再計算
    console.log('2. getDisplayTasks called with urlParams:', urlParams.toString());

    if (!projects) {
      console.log('2. No projects data available');
      return [];
    }

    const params = getCurrentParams();
    console.log('2. Current params:', params);
    console.log('2. Available projects:', projects);

    if (params.daily) {
      // すべてのプロジェクトのタスクを結合
      const allTasks = projects.flatMap((project) =>
        project.taskLists.flatMap((list) => list.tasks)
      );
      console.log('2. All tasks for daily view:', allTasks);
      const filteredTasks = filterTasksByDate(allTasks, params.daily);
      console.log('2. Filtered tasks:', filteredTasks);
      return filteredTasks;
    }

    const projectTasks = getTasksFromProjects(projects, params.project, params.taskList);
    console.log('2. Project tasks:', projectTasks);
    return projectTasks;
  }

  // 3. 画面の再レンダリング
  $effect(() => {
    console.log('3. displayTasks updated:', displayTasks);
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
  <div class="hidden lg:block w-72 border-l">
    {#if selectedTask}
      <TaskDetail
        task={selectedTask}
        on:update={({ detail }) => updateTask(detail.task)}
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
        on:click={closeDetail}
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

      <div class="pt-16">
        {#if selectedTask}
          <TaskDetail
            task={selectedTask}
            on:update={({ detail }) => updateTask(detail.task)}
          />
        {/if}
      </div>
    </div>
  {/if}
</div>
