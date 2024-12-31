<script lang="ts">
  import TaskItem from "$lib/components/task-item.svelte";
  import { selectedState } from "$lib/stores/selected-store.svelte";
  import { projectTaskTree } from "$lib/stores/project-task-tree.svelte";
  import { filterTaskList } from "$lib/utils/task-filter";
  import type { ProjectTree } from "$types/tree/project";
  import type { TaskListTree } from "$types/tree/task-list";
  import type { TaskTree } from "$types/tree/task";

  // $derivedを使用して、projectTaskTreeとselectedStateの変更を監視
  const filteredTasks: ProjectTree[] = $derived<ProjectTree[]>(
    filterTaskList(projectTaskTree, selectedState)
  );
  $effect(() => {
    console.log("filteredTasks", filteredTasks);
  });

  // フラットなタスクリストも$derivedで計算
  const tasks: TaskTree[] = $derived<TaskTree[]>(
    filteredTasks.flatMap((project: ProjectTree) =>
      project.taskLists.flatMap((taskList: TaskListTree) =>
        taskList.tasks.map((task: TaskTree) => ({
          ...task,
          projectId: project.id,
          taskListId: taskList.id,
        }))
      )
    )
  );
  $effect(() => {
    console.log("tasks", tasks);
  });


  function handleTaskUpdate(task: TaskTree) {
    console.log("Task updated:", task);
  }

  function handleTaskSelect(task: TaskTree) {
    console.log("Task selected:", task);
  }
</script>
<div class="flex-1 bg-muted/30 relative flex flex-col">
  <div class="p-4 space-y-2">
    {#each tasks as task}
      <TaskItem
        {task}
        onUpdate={handleTaskUpdate}
        onSelect={handleTaskSelect}
      />
    {/each}
  </div>
</div>
