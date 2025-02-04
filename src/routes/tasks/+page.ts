import type { PageLoad } from "./$types";
import { updateProjectTaskTree } from "$lib/stores/project-task-tree.svelte";
import { updateProjects } from "$lib/stores/sidebar-projects.svelte";
import type { ProjectTree } from "$types/tree/project-tree";
import type { SidebarProjects } from "$types/components/sidebar-projects";
import { initialData } from "$src/data/sample-task-tree";


export const load = (async () => {
  // 将来的にはここでAPIからデータを取得する
  const data = await initialData();

  // プロジェクトデータをストアに登録
  updateProjectTaskTree(data.projects as ProjectTree[]);
  updateProjects(data.projects as SidebarProjects[]);

  // 呼び出し元で終了検知のため空オブジェクトを返す
  return {};
}) satisfies PageLoad;



