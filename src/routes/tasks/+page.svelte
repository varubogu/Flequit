<script lang="ts">
  import { ChevronLeft } from "lucide-svelte";
  import { Plus } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Button } from "$ui/button";
  import TaskItem from "$components/task-item.svelte";
  import TaskDetail from "$components/task-detail.svelte";
  import type { Task } from "$types/components/task";
  import type { PageData } from "./$types";
  import type { Project } from "$types/components/project";
    import type { TaskList } from "$src/types/components/task-list";

  let { data } = $props<{ data: PageData }>();
  let selectedTask: Task | null = null;
  let isDetailOpen = false;

  // URLパラメータの監視
  let currentDaily = $derived($page.url.searchParams.get("daily"));
  let currentProject = $derived($page.url.searchParams.get("project"));
  let currentTaskList = $derived($page.url.searchParams.get("tasks"));
  let currentTaskId = $derived($page.url.searchParams.get("task"));

  // 表示するタスクリストの取得
  let displayTasks = $derived(() => {
    console.log("URLパラメータ:", {
      currentDaily,
      currentProject,
      currentTaskList,
    });
    console.log("プロジェクトデータ:", data.projects);

    if (currentDaily) {
      // 日付フィルターに基づくタスク
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      // すべてのプロジェクトのタスクを結合
      const allTasks = data.projects.flatMap((project: Project) =>
        project.taskLists.flatMap((list: TaskList) => list.tasks),
      );
      console.log("全タスク:", allTasks);

      switch (currentDaily) {
        case "today":
          return allTasks.filter((task: Task) => {
            if (!task.dueDate) return false;
            const taskDate = new Date(task.dueDate.value.toString());
            const taskDay = new Date(
              taskDate.getFullYear(),
              taskDate.getMonth(),
              taskDate.getDate(),
            );
            return taskDay.getTime() === today.getTime();
          });
        case "tomorrow":
          return allTasks.filter((task: Task) => {
            if (!task.dueDate) return false;
            const taskDate = new Date(task.dueDate.value.toString());
            const taskDay = new Date(
              taskDate.getFullYear(),
              taskDate.getMonth(),
              taskDate.getDate(),
            );
            return taskDay.getTime() === tomorrow.getTime();
          });
        case "week":
          return allTasks.filter((task: Task) => {
            if (!task.dueDate) return false;
            const taskDate = new Date(task.dueDate.value.toString());
            const taskDay = new Date(
              taskDate.getFullYear(),
              taskDate.getMonth(),
              taskDate.getDate(),
            );
            return taskDay >= today && taskDay < nextWeek;
          });
        case "inbox":
          return allTasks.filter((task: Task) => !task.dueDate);
        default:
          return [];
      }
    } else if (currentProject && currentTaskList) {
      // プロジェクトのタスクリスト
      const project = data.projects.find(
        (p: Project) => p.id === currentProject,
      );
      const taskList = project?.taskLists?.find(
        (t: TaskList) => t.id === currentTaskList,
      );
      console.log("選択されたタスクリスト:", taskList);
      return taskList?.tasks ?? [];
    } else if (currentProject) {
      // プロジェクト全体のタスク
      const project = data.projects.find(
        (p: Project) => p.id === currentProject,
      );
      console.log("選択されたプロジェクト:", project);
      return project?.taskLists?.flatMap((t: TaskList) => t.tasks) ?? [];
    }
    // デフォルトではメインプロジェクトのタスクを表示
    const mainProject = data.projects.find((p: Project) => p.id === "main");
    console.log("メインプロジェクト:", mainProject);
    return mainProject?.taskLists?.[0]?.tasks ?? [];
  });

  $effect(() => {
    console.log("表示するタスク:", displayTasks);
  });

  // タスクの選択状態の管理
  $effect(() => {
    if (currentTaskId) {
      selectedTask =
        displayTasks.find((t: Task) => t.id === currentTaskId) ?? null;
      isDetailOpen = !!selectedTask;
    }
  });

  // タスク選択時の処理
  function selectTask(task: Task) {
    selectedTask = task;
    isDetailOpen = true;
    const searchParams = new URLSearchParams($page.url.searchParams);
    searchParams.set("task", task.id);
    goto(`?${searchParams.toString()}`);
  }

  // タスク更新時の処理
  function updateTask(updatedTask: Task) {
    // すべてのプロジェクトとタスクリストを検索
    for (const project of data.projects) {
      for (const taskList of project.taskLists) {
        const index = taskList.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          taskList.tasks[index] = updatedTask;
          if (selectedTask?.id === updatedTask.id) {
            selectedTask = updatedTask;
          }
          return;
        }
      }
    }
  }

  // モバイルでの詳細画面を閉じる処理
  function closeDetail() {
    isDetailOpen = false;
    const searchParams = new URLSearchParams($page.url.searchParams);
    searchParams.delete("task");
    goto(`?${searchParams.toString()}`);
  }
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
        onclick={closeDetail}
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
