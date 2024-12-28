import type { ProjectTree } from '$types/tree/project';

// プロジェクトデータを$stateで管理
const projectTaskTree = $state<ProjectTree[]>([]);

export function updateProjectTaskTree(_projects: ProjectTree[]) {
  projectTaskTree.length = 0;
  projectTaskTree.push(..._projects);
}

export { projectTaskTree };