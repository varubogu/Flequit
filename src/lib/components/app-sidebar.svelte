<script lang="ts">
  import { page } from "$app/stores";
  import { projectsStore } from "$lib/stores/projects";
  import { Button } from "$ui/button";
  import * as Sidebar from "$ui/sidebar/index";
  import * as Tooltip from "$ui/tooltip";
  import * as Collapsible from "$components/ui/collapsible";
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
  import SearchForm from "./search-form.svelte";
  import { goto } from "$app/navigation";

  // プロジェクトストアを購読
  $: projects = $projectsStore;
  $: {
    console.log(
      "サイドメニュー: プロジェクトストアが更新されました:",
      projects
    );
  }

  // URLパラメータの監視
  $: currentDaily = $page.url.searchParams.get("daily");
  $: currentProject = $page.url.searchParams.get("project");
  $: currentTaskList = $page.url.searchParams.get("tasks");

  // フビゲーション関数
  function updateSearchParams(updates: { [key: string]: string | null }) {
    const searchParams = new URLSearchParams($page.url.searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    goto(`?${searchParams.toString()}`);
  }

  // フビゲーション関数
  function handleDailyClick(param: string) {
    const searchParams = new URLSearchParams($page.url.searchParams);
    searchParams.set("daily", param);
    searchParams.delete("project");
    searchParams.delete("tasks");
    goto(`?${searchParams.toString()}`);
  }

  function handleProjectClick(projectId: string, taskListId?: string) {
    const searchParams = new URLSearchParams($page.url.searchParams);
    searchParams.delete("daily");
    searchParams.set("project", projectId);
    if (taskListId) {
      searchParams.set("tasks", taskListId);
    } else {
      searchParams.delete("tasks");
    }
    goto(`?${searchParams.toString()}`);
  }

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

  // デイリータスクイテム
  const dailyItems = [
    {
      title: "今日",
      param: "today",
      icon: CalendarDays,
    },
    {
      title: "明日",
      param: "tomorrow",
      icon: CalendarDays,
    },
    {
      title: "今週",
      param: "week",
      icon: CalendarDays,
    },
    {
      title: "受信",
      param: "inbox",
      icon: Inbox,
    },
  ];
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <SearchForm />
    <!-- デイリータスク -->
    <nav class="grid gap-1 px-2">
      {#each dailyItems as item}
        <Button
          variant={currentDaily === item.param ? "secondary" : "ghost"}
          class="w-full justify-start"
          onclick={() => {
            updateSearchParams({
              daily: item.param,
              project: null,
              tasks: null,
            });
          }}
        >
          <svelte:component this={item.icon} class="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      {/each}
    </nav>
  </Sidebar.Header>
  <Sidebar.Content>
    <div class="space-y-4 py-4">
      <!-- プロジェクト -->
      <div class="px-2">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-lg font-semibold tracking-tight">プロジェクト</h2>
          <div>
            <Tooltip.Root>
              <Tooltip.Trigger>
                <Button variant="ghost" size="icon" class="-mr-2">
                  <Plus class="h-4 w-4" />
                  <span class="sr-only">新規プロジェクト</span>
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>新規プロジェクト</Tooltip.Content>
            </Tooltip.Root>
          </div>
        </div>
        <nav class="grid gap-1">
          {#each projects as project}
            <Collapsible.Root
              class="space-y-1"
              open={currentProject === project.id}
            >
              <Collapsible.Trigger class="w-full">
                <Button
                  variant={currentProject === project.id && !currentTaskList
                    ? "secondary"
                    : "ghost"}
                  class="w-full justify-start"
                  onclick={() => {
                    updateSearchParams({
                      daily: null,
                      project: project.id,
                      tasks: null,
                    });
                  }}
                >
                  <span class="mr-2">{project.icon}</span>
                  {project.name}
                  <ChevronDown class="ml-auto h-4 w-4 transition-transform" />
                </Button>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <div class="ml-4 space-y-1 pt-1">
                  {#each project.taskLists as taskList}
                    <Button
                      variant={currentTaskList === taskList.id
                        ? "secondary"
                        : "ghost"}
                      class="w-full justify-start"
                      onclick={() => {
                        updateSearchParams({
                          daily: null,
                          project: project.id,
                          tasks: taskList.id,
                        });
                      }}
                    >
                      <span class="mr-2">{taskList.icon}</span>
                      {taskList.name}
                    </Button>
                  {/each}
                  <div>
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <Button variant="ghost" class="w-full justify-start">
                          <Plus class="mr-2 h-4 w-4" />
                          新規リスト
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>新規タスクリスト</Tooltip.Content>
                    </Tooltip.Root>
                  </div>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          {/each}
        </nav>
      </div>
    </div>
  </Sidebar.Content>
  <Sidebar.Footer>
    <nav class="grid gap-1 px-2">
      {#each footerItems as item}
        <Button variant="ghost" class="w-full justify-start" href={item.url}>
          <svelte:component this={item.icon} class="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      {/each}
    </nav>
  </Sidebar.Footer>
</Sidebar.Root>
