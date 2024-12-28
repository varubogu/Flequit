<script lang="ts">
  import Enumerable from "linq";
  import { Plus } from "lucide-svelte";
  import { Button } from "$ui/button";
  import TaskItem from "$components/task-item.svelte";
  import type { Task } from "$types/components/task";
  import { selectedState } from "$lib/stores/selected-store.svelte";
  import { projectTaskTree } from "$lib/stores/project-task-tree.svelte";
  import type { SelectedState } from "$src/types/state/selected-state";
  import type { ProjectTree } from "$src/types/tree/project";
  import type { TaskListTree } from "$src/types/tree/task-list";
  import type { TaskTree } from "$src/types/tree/task";
  import type { ProjectId } from "$src/types/core/project-id";
  import type { TaskListId } from "$src/types/core/task-list-id";
  import type { TaskId } from "$src/types/core/task-id";
  import {  updateFilteredTaskList } from "$src/lib/stores/filted-task-list.svelte";
  import { taskDetail } from "$src/lib/stores/task-detail.svelte";
  import TaskDetail from "$src/lib/components/task-detail.svelte";
  import { page } from "$app/state";
  import { sidebarProjects } from "$src/lib/stores/sidebar-projects.svelte";
  import { goto } from "$app/navigation";

  // ストアを購読
  let projects = sidebarProjects

  // ナビゲーション関数
  function updateSearchParams(updates: { [key: string]: string | null }) {
    const searchParams = new URLSearchParams(page.url.searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    goto(`?${searchParams.toString()}`);
  }

  async function onSelectedTask(task: Task) {
    selectedState.taskId = task.id;
    updateSearchParams({
      task: task.id,
    });
  }

  const selected = selectedState;

  let selectedTask = taskDetail;

  let _projectTaskTree: ProjectTree[] = projectTaskTree;

  function filterTaskList(
    tree: ProjectTree[],
    f: SelectedState
  ): ProjectTree[] {
    console.debug("filterTaskList");
    const whereProjectId = (project: ProjectTree, whereProjectId: ProjectId | null): boolean => {
      if (whereProjectId == null || whereProjectId === "") {
        return true;
      } else {
        return project.id === whereProjectId;
      }
    }


    const whereTaskListId = (taskList: TaskListTree, whereTaskListId: TaskListId | null): boolean => {
      if (whereTaskListId == null || whereTaskListId === "") {
        return true;
      } else {
        return taskList.id === whereTaskListId;
      }
    }

    const whereTaskId = (task: TaskTree, whereTaskId: TaskId | null): boolean => {
      if (whereTaskId == null || whereTaskId === "") {
        return true;
      } else {
        return task.id === whereTaskId;
      }
    }

    // 元のデータ構造を保持しつつフィルタリング
    return Enumerable.from<ProjectTree>(tree)
      .where(
        (project: ProjectTree) =>
          whereProjectId(project, f.projectId) &&
          Enumerable.from<TaskListTree>(project.taskLists).where(
            (taskList: TaskListTree) =>
              whereTaskListId(taskList, f.taskListId) &&
              Enumerable.from<TaskTree>(taskList.tasks).where(
                (task: TaskTree) =>
                  whereTaskId(task, f.taskId)
              )
          )
      )
    .toArray();
  }

  let tasks = filterTaskList(_projectTaskTree, selected);

  // taskListをフラット化してtaskList2に格納
  let flatTaskList: TaskTree[] = tasks.flatMap((project: ProjectTree) =>
    project.taskLists.flatMap((taskList: TaskListTree) =>
      taskList.tasks.flatMap(
        (task: TaskTree) => [task]
      )
    )
  );

  updateFilteredTaskList(flatTaskList);

</script>

<div class="h-screen flex">
  <!-- タスクリスト -->
  <div class="flex-1 bg-muted/30 relative flex flex-col">
    <div class="flex-1 overflow-auto">
      {#if flatTaskList && flatTaskList.length > 0}
        <div class="p-4 space-y-4">
          {#each flatTaskList as task}
            <TaskItem
              {task}
              on:select={({ detail }) => onSelectedTask(task)}
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
  <!-- タスク詳細 -->
  <div class="flex-1 bg-muted/30 relative flex flex-col">
    <TaskDetail/>
  </div>
</div>
