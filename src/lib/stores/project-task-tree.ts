import { writable } from "svelte/store";
import type { ProjectTree } from "$types/tree/project-tree";
import type { TaskTree } from "$types/tree/task-tree";


export const projectTaskTree = writable<ProjectTree[]>([]);

// サンプルデータを追加（開発用）
const sampleData: ProjectTree[] = [
    {
        id: "1",
        name: "プロジェクト1",
        icon: "📁",
        taskLists: [
            {
                id: "1-1",
                name: "タスクリスト1",
                icon: "📝",
                tasks: [
                    {
                        id: "1-1-1",
                        name: "タスク1",
                        description: "タスク1の説明",
                        completed: false,
                        deleted: false,
                        priority: "通常",
                        importance: "通常",
                        icon: "📝",
                        dueDate: null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        id: "1-1-2",
                        name: "タスク2",
                        description: "タスク2の説明",
                        completed: true,
                        deleted: false,
                        priority: "高",
                        importance: "高",
                        icon: "🔥",
                        dueDate: null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                ],
            },
        ],
    },
];

// 初期データを設定
projectTaskTree.set(sampleData);

export async function updateTask(
    projectId: string,
    taskListId: string,
    taskId: string,
    updates: Partial<TaskTree>
) {
    projectTaskTree.update((projects) => {
        const project = projects.find((p) => p.id === projectId);
        if (!project) return projects;

        const taskList = project.taskLists.find((tl) => tl.id === taskListId);
        if (!taskList) return projects;

        const taskIndex = taskList.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return projects;

        taskList.tasks[taskIndex] = {
            ...taskList.tasks[taskIndex],
            ...updates,
        };

        return [...projects];
    });
}