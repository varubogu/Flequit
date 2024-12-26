import { derived, get } from "svelte/store";
import { page } from "$app/stores";
import type { Task } from "$types/components/task";
import { goto } from "$app/navigation";

// URLパラメータの監視
export const taskParams = {
    daily: derived(page, ($page) => $page.url.searchParams.get("daily")),
    project: derived(page, ($page) => $page.url.searchParams.get("project")),
    taskList: derived(page, ($page) => $page.url.searchParams.get("tasks")),
    taskId: derived(page, ($page) => $page.url.searchParams.get("task"))
};

// 現在のパラメータを取得する関数
export function getCurrentParams() {
    return {
        daily: get(taskParams.daily),
        project: get(taskParams.project),
        taskList: get(taskParams.taskList),
        taskId: get(taskParams.taskId)
    };
}

// タスク選択の状態管理
export function createTaskSelection() {
    let selectedTask: Task | null = null;
    let isDetailOpen = false;

    return {
        selectedTask,
        isDetailOpen,
        selectTask: (task: Task) => {
            selectedTask = task;
            isDetailOpen = true;
            updateTaskInUrl(task);
        },
        closeDetail: () => {
            isDetailOpen = false;
            removeTaskFromUrl();
        },
        updateSelection: (tasks: Task[]) => {
            const { taskId } = getCurrentParams();
            if (taskId) {
                selectedTask = tasks.find((t) => t.id === taskId) ?? null;
                isDetailOpen = !!selectedTask;
            }
        }
    };
}

// URLパラメータの更新
function updateTaskInUrl(task: Task) {
    const searchParams = new URLSearchParams(get(page).url.searchParams);
    searchParams.set("task", task.id);
    goto(`?${searchParams.toString()}`);
}

function removeTaskFromUrl() {
    const searchParams = new URLSearchParams(get(page).url.searchParams);
    searchParams.delete("task");
    goto(`?${searchParams.toString()}`);
}