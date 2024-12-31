import { page } from "$app/state";
import { goto } from "$app/navigation";
import type { SelectedState } from "$types/state/selected-state";
import { Daily, DailyUtil } from "$src/types/enum/daily";

// プロジェクトデータを$stateで管理
export const selectedState = $state<SelectedState>({
  daily: null,
  projectId: null,
  taskListId: null,
  taskId: null,
  subTaskId: null,
});

export function updateSearchParams(updates: { [key: string]: string | null }) {
  const searchParams = new URLSearchParams(page.url.searchParams);
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  });
  console.log("searchParams: " + searchParams.toString());
  Object.assign(selectedState, updates);
  console.log("selectedState: " + JSON.stringify(selectedState));
  goto(`?${searchParams.toString()}`);
}

const setNull = (key: string) => {
  if (key === "daily") {
    selectedState.daily = null;
  } else if (key === "project") {
    selectedState.projectId = null;
  } else if (key === "tasks") {
    selectedState.taskListId = null;
  } else if (key === "task") {
    selectedState.taskId = null;
  }
};

const setValue = (key: string, value: string) => {
  if (key === "daily") {
    selectedState.daily = DailyUtil.parse(value);
  } else if (key === "project") {
    selectedState.projectId = value;
  } else if (key === "tasks") {
    selectedState.taskListId = value;
  } else if (key === "task") {
    selectedState.taskId = value;
  }
};
