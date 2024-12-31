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
  const params: { [key: string]: string | null } = {};
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null) {
      searchParams.delete(key);
      const convertedKey = convertKey(key);
      if (convertedKey !== null) {
        params[convertedKey] = null;
      }
    } else {
      searchParams.set(key, value);
      const convertedKey = convertKey(key);
      if (convertedKey !== null) {
        params[convertedKey] = value;
      }
    }
  });
  console.log("searchParams: " + searchParams.toString());
  Object.assign(selectedState, params);
  console.log("selectedState: " + JSON.stringify(selectedState));
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
  }
  return null;
}
