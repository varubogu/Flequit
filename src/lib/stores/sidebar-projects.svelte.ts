import type { SidebarProjects } from '$src/types/components/sidebar-projects';

const sidebarProjects = $state<SidebarProjects[]>([]);

export function updateProjects(projects: SidebarProjects[]) {
  sidebarProjects.length = 0;
  sidebarProjects.push(...projects);
}

export { sidebarProjects };