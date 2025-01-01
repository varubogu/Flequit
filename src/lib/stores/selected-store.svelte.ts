import { page } from "$app/state";
import { goto } from "$app/navigation";
import type { SelectedState } from "$types/state/selected-state";
import { DailyUtil } from "$src/types/enum/daily";

// プロジェクトデータを$stateで管理
export const selectedState = $state<SelectedState>({
  daily: null,
  projectId: null,
  taskListId: null,
  taskId: null,
  subTaskId: null,
  selectedTask: null,
});

export function updateSearchParams(updates: { [key: string]: string | null }) {
  const searchParams = new URLSearchParams(page.url.searchParams);
  const params: { [key: string]: string | null } = {};

  Object.entries(updates).forEach(([key, value]) => {
    const convertedKey = convertKey(key);
    if (!convertedKey) {
      return;
    }
    if (value === null) {
      searchParams.delete(key);
      params[convertedKey] = null;
    } else {
      searchParams.set(key, value);
      params[convertedKey] = value;
    }
    setSelectedState(convertedKey, value);
  });

  goto(`?${searchParams.toString()}`);
}

function convertKey(key: string): string | null {
  if (key === "daily") {
    return "daily";
  } else if (key === "project") {
    return "projectId";
  } else if (key === "tasks") {
    return "taskListId";
  } else if (key === "task") {
    return "taskId";
  } else if (key === "subTask") {
    return "subTaskId";
  } else if (key === "selectedTask") {
    return "selectedTask";
  }
  return null;
}

function setSelectedState(
  key: string,
  value: string | null,
) {
  if (key === "daily") {
    if (value === null) {
      selectedState.daily = null;
    } else {
      selectedState.daily = DailyUtil.parse(value);
    }
  } else if (key === "projectId") {
    if (value === null) {
      selectedState.projectId = null;
    } else {
      selectedState.projectId = value;
    }
  } else if (key === "taskListId") {
    if (value === null) {
      selectedState.taskListId = null;
    } else {
      selectedState.taskListId = value;
    }
  } else if (key === "taskId") {
    if (value === null) {
      selectedState.taskId = null;
    } else {
      selectedState.taskId = value;
    }
  } else if (key === "subTaskId") {
    if (value === null) {
      selectedState.subTaskId = null;
    } else {
      selectedState.subTaskId = value;
    }
  } else if (key === "selectedTask") {
    if (value === null) {
      selectedState.selectedTask = null;
    } else {
      selectedState.selectedTask = value;
    }
  }
}
