import type { Project } from '$types/tree/project';

// プロジェクトデータを$stateで管理
const projectTaskTree = $state<Project[]>([]);

export function updateProjectTaskTree(_projects: Project[]) {
  projectTaskTree.length = 0;
  projectTaskTree.push(..._projects);
}

export { projectTaskTree };