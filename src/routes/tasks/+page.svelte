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
  import AppSidebar from "$components/app-sidebar.svelte";

  export let data: PageData;
  let selectedTask: Task | null = null;
  let isDetailOpen = false;
  let mounted = false;

  // URLパラメータの監視
  $: currentDaily = $page.url.searchParams.get("daily");
  $: currentProject = $page.url.searchParams.get("project");
  $: currentTaskList = $page.url.searchParams.get("tasks");
  $: currentTaskId = $page.url.searchParams.get("task");

  // 表示するタスクリストの取得
  $: displayTasks = (() => {
    if (currentDaily) {
      // �����付フィルターに基づくタスク
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      // すべてのプロジェクトのタスクを結合
      const allTasks = data.projects.flatMap((project) =>
        project.taskLists.flatMap((list) => list.tasks),
      );

      return allTasks.filter((task) => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate.value.toString());
        const taskDay = new Date(
          taskDate.getFullYear(),
          taskDate.getMonth(),
          taskDate.getDate(),
        );

        switch (currentDaily) {
          case "today":
            return taskDay.getTime() === today.getTime();
          case "tomorrow":
            return taskDay.getTime() === tomorrow.getTime();
          case "week":
            return taskDay >= today && taskDay < nextWeek;
          case "inbox":
            // 期限が設定されていないタスク
            return !task.dueDate;
          default:
            return false;
        }
      });
    } else if (currentProject && currentTaskList) {
      // プロジェクトのタスクリスト
      const project = data.projects.find((p) => p.id === currentProject);
      const taskList = project?.taskLists?.find(
        (t) => t.id === currentTaskList,
      );
      return taskList?.tasks ?? [];
    } else if (currentProject) {
      // プロジェクト全体のタスク
      const project = data.projects.find((p) => p.id === currentProject);
      return project?.taskLists?.flatMap((t) => t.tasks) ?? [];
    }
    // デフォルトではメインプロジェクトのタスクを表示
    const mainProject = data.projects.find((p) => p.id === "main");
    return mainProject?.taskLists?.[0]?.tasks ?? [];
  })();

  // タスクの選択状態の管理
  $: {
    if (currentTaskId) {
      selectedTask = displayTasks.find((t) => t.id === currentTaskId);
      isDetailOpen = !!selectedTask;
    }
  }

  onMount(() => {
    mounted = true;
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

<AppSidebar projects={data.projects} />

{#if mounted}
  <div class="h-screen flex">
    <!-- タスクリスト -->
    <div class="flex-1 bg-muted/30">
      <ScrollArea class="h-full">
        {#if displayTasks}
          {#each displayTasks as task}
            <TaskItem
              {task}
              on:select={({ detail }) => selectTask(detail.task)}
              on:update={({ detail }) => updateTask(detail.task)}
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
{/if}
