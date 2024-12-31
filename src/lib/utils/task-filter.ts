import type { ProjectTree } from "$src/types/tree/project";
import type { SelectedState } from "$src/types/state/selected-state";
import type { TaskListTree } from "$src/types/tree/task-list";
import type { TaskTree } from "$src/types/tree/task";
import type { ProjectId } from "$src/types/core/project-id";
import type { TaskListId } from "$src/types/core/task-list-id";
import type { TaskId } from "$src/types/core/task-id";
import Enumerable from "linq";
import { CalendarDateTime, type DateValue } from "@internationalized/date";
import { Daily } from "$types/enum/daily";

const createCalendarDateTime = (date: Date): CalendarDateTime => {
  return new CalendarDateTime(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate() + 1,
    0,
    0,
    0,
    0,
  );
};

export function filterTaskList(
  tree: ProjectTree[],
  f: SelectedState,
): ProjectTree[] {
  let dueDate: DateValue | null = null;
  if (f.daily != null) {
    const now = new Date();
    if (f.daily === Daily.Today) {
      const today = new Date(now.getTime() + 1);
      dueDate = createCalendarDateTime(today);
    } else if (f.daily === Daily.Tomorrow) {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      dueDate = createCalendarDateTime(tomorrow);
    } else if (f.daily === Daily.Week) {
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      dueDate = createCalendarDateTime(nextWeek);
    }
  }
  console.log("where dueDate", dueDate);

  return Enumerable.from<ProjectTree>(tree)
    .where((project: ProjectTree) => whereProjectId(project, f.projectId))
    .select((project) => ({
      ...project,
      taskLists: project.taskLists.filter(
        (taskList) =>
          whereTaskListId(taskList, f.taskListId) &&
          taskList.tasks.some(
            (task) =>
              whereTaskId(task, f.taskId) && whereDueDate(task, dueDate),
          ),
      ),
    }))
    .toArray();
}

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

const whereDueDate = (
  task: TaskTree,
  whereDueDate: DateValue | null,
): boolean => {
  if (whereDueDate == null) {
    return true;
  }
  if (task?.dueDate?.value == null) {
    return true;
  }
  return task.dueDate.value.compare(whereDueDate) < 0;
};
