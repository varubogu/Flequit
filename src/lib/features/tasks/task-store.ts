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

export function getTasksFromProjects(
    projects: Project[],
    projectId?: string | null,
    taskListId?: string | null
): Task[] {

    if (!projectId) {
        return [];
    }

    const project = projects.find((p) => p.id === projectId);
    if (!project) {
        return [];
    }

    if (taskListId) {
        const taskList = project.taskLists.find((list) => list.id === taskListId);
        if (!taskList) {
            return [];
        }
        return taskList.tasks;
    }

    return project.taskLists.flatMap((list) => list.tasks);
}