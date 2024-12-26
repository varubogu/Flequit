import type { Task } from "$types/components/task";
import type { Project } from "$types/components/project";
import { projectsStore, updateProjects } from "$lib/stores/projects";
import { get } from "svelte/store";

export function updateTask(updatedTask: Task) {
    const projects = get(projectsStore);
    const updatedProjects = projects.map(project => ({
        ...project,
        taskLists: project.taskLists.map(taskList => ({
            ...taskList,
            tasks: taskList.tasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        }))
    }));
    updateProjects(updatedProjects);
}

export function getTasksFromProjects(projects: Project[], projectId?: string, taskListId?: string): Task[] {
    if (!projects) return [];

    if (projectId && taskListId) {
        // プロジェクトのタスクリスト
        const project = projects.find((p) => p.id === projectId);
        const taskList = project?.taskLists?.find((t) => t.id === taskListId);
        return taskList?.tasks ?? [];
    } else if (projectId) {
        // プロジェクト全体のタスク
        const project = projects.find((p) => p.id === projectId);
        return project?.taskLists?.flatMap((t) => t.tasks) ?? [];
    }

    // デフォルトではメインプロジェクトのタスクを表示
    const mainProject = projects.find((p) => p.id === "main");
    return mainProject?.taskLists?.[0]?.tasks ?? [];
}