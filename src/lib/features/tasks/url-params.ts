import { goto } from "$app/navigation";
import type { Task } from "$types/components/task";

export function updateTaskInUrl(task: Task, currentParams: URLSearchParams) {
    const searchParams = new URLSearchParams(currentParams);
    searchParams.set("task", task.id);
    goto(`?${searchParams.toString()}`);
}

export function removeTaskFromUrl(currentParams: URLSearchParams) {
    const searchParams = new URLSearchParams(currentParams);
    searchParams.delete("task");
    goto(`?${searchParams.toString()}`);
}