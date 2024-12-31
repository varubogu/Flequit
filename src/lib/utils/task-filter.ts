import type { ProjectTree } from "$src/types/tree/project";
import type { SelectedState } from "$src/types/state/selected-state";
import type { TaskListTree } from "$src/types/tree/task-list";
import type { TaskTree } from "$src/types/tree/task";
import type { ProjectId } from "$src/types/core/project-id";
import type { TaskListId } from "$src/types/core/task-list-id";
import type { TaskId } from "$src/types/core/task-id";
import Enumerable from "linq";

export function filterTaskList(
  tree: ProjectTree[],
  f: SelectedState,
): ProjectTree[] {
  const whereProjectId = (
    project: ProjectTree,
    whereProjectId: ProjectId | null,
  ): boolean => {
    if (whereProjectId == null || whereProjectId === "") {
      return true;
    } else {
      return project.id === whereProjectId;
    }
  };

  const whereTaskListId = (
    taskList: TaskListTree,
    whereTaskListId: TaskListId | null,
  ): boolean => {
    if (whereTaskListId == null || whereTaskListId === "") {
      return true;
    } else {
      return taskList.id === whereTaskListId;
    }
  };

  const whereTaskId = (task: TaskTree, whereTaskId: TaskId | null): boolean => {
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
          taskList.tasks.some((task) => whereTaskId(task, f.taskId)),
      ),
    }))
    .toArray();
}
