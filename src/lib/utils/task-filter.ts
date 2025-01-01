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
    date.getDate(),
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
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    if (f.daily === Daily.Today) {
      // 今日の終わりまで（明日の0時まで）
      const endOfDay = new Date(today);
      endOfDay.setDate(today.getDate() + 1);
      dueDate = createCalendarDateTime(endOfDay);
    } else if (f.daily === Daily.Tomorrow) {
      // 明日の終わりまで
      const endOfTomorrow = new Date(today);
      endOfTomorrow.setDate(today.getDate() + 2);
      dueDate = createCalendarDateTime(endOfTomorrow);
    } else if (f.daily === Daily.ThreeDaysLater) {
      // 3日後の終わりまで
      const endOfThreeDays = new Date(today);
      endOfThreeDays.setDate(today.getDate() + 4);
      dueDate = createCalendarDateTime(endOfThreeDays);
    } else if (f.daily === Daily.Week) {
      // 1週間後の終わりまで
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + 8);
      dueDate = createCalendarDateTime(endOfWeek);
    }
  }
  console.log("where// dueDate", dueDate);

  return Enumerable.from<ProjectTree>(tree)
    .where((project: ProjectTree) => whereProjectId(project, f.projectId))
    .select((project) => ({
      ...project,
      taskLists: project.taskLists
        .filter((taskList) => whereTaskListId(taskList, f.taskListId))
        .map((taskList) => ({
          ...taskList,
          tasks: taskList.tasks.filter(
            (task) =>
              whereTaskId(task, f.taskId) && whereDueDate(task, dueDate),
          ),
        }))
        .filter((taskList) => taskList.tasks.length > 0),
    }))
    .where((project) => project.taskLists.length > 0)
    .toArray();
}

const whereProjectId = (
  project: ProjectTree,
  whereProjectId: ProjectId | null,
): boolean => {
  if (whereProjectId) {
    return project.id === whereProjectId;
  } else {
    return true;
  }
};

const whereTaskListId = (
  taskList: TaskListTree,
  whereTaskListId: TaskListId | null,
): boolean => {
  if (whereTaskListId) {
    return taskList.id === whereTaskListId;
  } else {
    return true;
  }
};

const whereTaskId = (task: TaskTree, whereTaskId: TaskId | null): boolean => {
  if (whereTaskId) {
    return task.id === whereTaskId;
  } else {
    return true;
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
  return task.dueDate.value.compare(whereDueDate) <= 0;
};
