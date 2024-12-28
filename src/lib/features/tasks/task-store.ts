import type { Task } from "$types/components/task";
import type { Project } from "$types/components/project";
import { projectTaskTree, updateProjectTaskTree } from "$lib/stores/project-task-tree.svelte";

export function updateTask(updatedTask: Task) {
    const _projectTaskTree = projectTaskTree;
    const updatedProjects = _projectTaskTree.map(project => ({
        ...project,
        taskLists: project.taskLists.map(taskList => ({
            ...taskList,
            tasks: taskList.tasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        }))
    }));
    updateProjectTaskTree(updatedProjects);
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