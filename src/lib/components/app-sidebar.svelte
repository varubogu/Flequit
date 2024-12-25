<script lang="ts">
  import { page } from "$app/stores";
  import { Button } from "$ui/button";
  import * as Sidebar from "$ui/sidebar/index";
  import {
    CalendarDays,
    Inbox,
    ListTodo,
    Plus,
    Settings,
    HelpCircle,
    UserIcon,
    Search,
    ChevronDown,
  } from "lucide-svelte";
  import type { Project } from "$types/components/project";
  import { Collapsible } from "bits-ui";
  import SearchForm from "./search-form.svelte";

  export let projects: Project[];

  // URLパラメータの監視
  $: currentDaily = $page.url.searchParams.get("daily");
  $: currentProject = $page.url.searchParams.get("project");
  $: currentTaskList = $page.url.searchParams.get("tasks");

  // フッターアイテム
  const footerItems = [
    {
      title: "ヘルプ",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "設定",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "アカウント",
      url: "/account",
      icon: UserIcon,
    },
  ];
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <SearchForm />
  </Sidebar.Header>
  <Sidebar.Content>
    <div class="space-y-4 py-4">
      <!-- デイリータスク -->
      <div class="px-3 py-2">
        <div class="space-y-1">
          <Button
            variant={currentDaily === "today" ? "secondary" : "ghost"}
            class="w-full justify-start"
            href="?daily=today"
          >
            <CalendarDays class="mr-2 h-4 w-4" />
            今日
          </Button>
          <Button
            variant={currentDaily === "tomorrow" ? "secondary" : "ghost"}
            class="w-full justify-start"
            href="?daily=tomorrow"
          >
            <CalendarDays class="mr-2 h-4 w-4" />
            明日
          </Button>
          <Button
            variant={currentDaily === "week" ? "secondary" : "ghost"}
            class="w-full justify-start"
            href="?daily=week"
          >
            <CalendarDays class="mr-2 h-4 w-4" />
            今週
          </Button>
          <Button
            variant={currentDaily === "inbox" ? "secondary" : "ghost"}
            class="w-full justify-start"
            href="?daily=inbox"
          >
            <Inbox class="mr-2 h-4 w-4" />
            受信トレイ
          </Button>
        </div>
      </div>

      <!-- プロジェクト -->
      <div class="px-3 py-2">
        <div class="flex items-center justify-between px-4">
          <h2 class="text-lg font-semibold tracking-tight">プロジェクト</h2>
          <Button variant="ghost" size="icon" class="-mr-2">
            <Plus class="h-4 w-4" />
          </Button>
        </div>
        <div class="space-y-1">
          {#each projects as project}
            <div class="space-y-1">
              <Button
                variant={currentProject === project.id && !currentTaskList
                  ? "secondary"
                  : "ghost"}
                class="w-full justify-start group"
                href="?project={project.id}"
              >
                <span class="mr-2">{project.icon}</span>
                {project.name}
                <ChevronDown
                  class="ml-auto h-4 w-4 transition-transform {currentProject ===
                  project.id
                    ? 'rotate-180'
                    : ''}"
                />
              </Button>
              {#if currentProject === project.id}
                <div class="ml-4 space-y-1">
                  {#each project.taskLists as taskList}
                    <Button
                      variant={currentTaskList === taskList.id
                        ? "secondary"
                        : "ghost"}
                      class="w-full justify-start"
                      href="?project={project.id}&tasks={taskList.id}"
                    >
                      <span class="mr-2">{taskList.icon}</span>
                      {taskList.name}
                    </Button>
                  {/each}
                  <Button variant="ghost" class="w-full justify-start">
                    <Plus class="mr-2 h-4 w-4" />
                    新規リスト
                  </Button>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </Sidebar.Content>
  <Sidebar.Footer>
    <div class="space-y-1">
      {#each footerItems as item}
        <Button variant="ghost" class="w-full justify-start" href={item.url}>
          <item.icon class="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      {/each}
    </div>
  </Sidebar.Footer>
</Sidebar.Root>
