import { writable } from 'svelte/store';
import type { Project } from '$types/components/project';

// 初期状態は空の配列
export const projectsStore = writable<Project[]>([]);

// プロジェクトを更新する関数
export const updateProjects = (projects: Project[]) => {
    projectsStore.set(projects);
};