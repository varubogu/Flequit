import type { ProjectTree } from '$types/tree/project-tree';

const initialProjectTree: ProjectTree[] = [];

// プロジェクトデータを$stateで管理
const projectTaskTree = $state<ProjectTree[]>(initialProjectTree);

export function updateProjectTaskTree(_projects: ProjectTree[]) {
  projectTaskTree.length = 0;
  projectTaskTree.push(..._projects);
}

export { projectTaskTree };