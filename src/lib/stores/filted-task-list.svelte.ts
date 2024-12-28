import type { TaskListviewTasks } from '$src/types/components/tasklistview-tasks';

// プロジェクトデータを$stateで管理
const filteredTaskList = $state<TaskListviewTasks[]>([]);

export function updateFilteredTaskList(taskList: TaskListviewTasks[]): void {
    filteredTaskList.length = 0;
    filteredTaskList.push(...taskList);
}

export { filteredTaskList };
