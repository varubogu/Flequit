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
    console.log('Getting tasks from projects:', { projects, projectId, taskListId });

    if (!projectId) {
        console.log('No project ID specified, returning empty array');
        return [];
    }

    const project = projects.find((p) => p.id === projectId);
    if (!project) {
        console.log('Project not found:', projectId);
        return [];
    }

    console.log('Found project:', project);

    if (taskListId) {
        const taskList = project.taskLists.find((list) => list.id === taskListId);
        if (!taskList) {
            console.log('Task list not found:', taskListId);
            return [];
        }
        console.log('Found task list:', taskList);
        return taskList.tasks;
    }

    console.log('No task list specified, returning all tasks from project');
    return project.taskLists.flatMap((list) => list.tasks);
}