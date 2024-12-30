<script lang="ts">
  import type { TaskTree } from "$src/types/tree/task";
  import type { ProjectTree } from "$src/types/tree/project";
  import type { TaskListTree } from "$src/types/tree/task-list";
  import { selectedState } from "$lib/stores/selected-store.svelte";
  import { projectTaskTree } from "$lib/stores/project-task-tree.svelte";
  import { updateFilteredTaskList } from "$src/lib/stores/filted-task-list.svelte";
  import Enumerable from "linq";
  import type { SelectedState } from "$src/types/state/selected-state";
  import type { ProjectId } from "$src/types/core/project-id";
  import type { TaskListId } from "$src/types/core/task-list-id";
  import type { TaskId } from "$src/types/core/task-id";
  import TaskItem from "./task-item.svelte";

  const selected = selectedState;
  let _projectTaskTree: ProjectTree[] = projectTaskTree;

  function filterTaskList(
    tree: ProjectTree[],
    f: SelectedState
  ): ProjectTree[] {
    console.debug("filterTaskList");
    const whereProjectId = (
      project: ProjectTree,
      whereProjectId: ProjectId | null
    ): boolean => {
      if (whereProjectId == null || whereProjectId === "") {
        return true;
      } else {
        return project.id === whereProjectId;
      }
    };

    const whereTaskListId = (
      taskList: TaskListTree,
      whereTaskListId: TaskListId | null
    ): boolean => {
      if (whereTaskListId == null || whereTaskListId === "") {
        return true;
      } else {
        return taskList.id === whereTaskListId;
      }
    };

    const whereTaskId = (
      task: TaskTree,
      whereTaskId: TaskId | null
    ): boolean => {
      if (whereTaskId == null || whereTaskId === "") {
        return true;
      } else {
        return task.id === whereTaskId;
      }
    };

    return Enumerable.from<ProjectTree>(tree)
      .where((project: ProjectTree) => whereProjectId(project, f.projectId))
      .select((project) => ({
        ...project,
        taskLists: project.taskLists.filter(
          (taskList) =>
            whereTaskListId(taskList, f.taskListId) &&
            taskList.tasks.some((task) => whereTaskId(task, f.taskId))
        ),
      }))
      .toArray();
  }

  let tasks = filterTaskList(_projectTaskTree, selected);

  let flatTaskList: TaskTree[] = tasks.flatMap((project: ProjectTree) =>
    project.taskLists.flatMap((taskList: TaskListTree) =>
      taskList.tasks.flatMap((task: TaskTree) => [task])
    )
  );

  updateFilteredTaskList(flatTaskList);

  function handleTaskUpdate(task: TaskTree) {
    // タスク更新の処理をここに実装
    console.log("Task updated:", task);
  }

  function handleTaskSelect(task: TaskTree) {
    // タスク選択の処理をここに実装
    console.log("Task selected:", task);
  }
</script>

<div class="flex-1 bg-muted/30 relative flex flex-col">
  <div class="p-4 space-y-2">
    {#each flatTaskList as task}
      <TaskItem
        {task}
        onUpdate={handleTaskUpdate}
        onSelect={handleTaskSelect}
      />
    {/each}
  </div>
</div>
