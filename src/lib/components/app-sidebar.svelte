<script lang="ts">
  import Calendar from "lucide-svelte/icons/calendar";
  import Inbox from "lucide-svelte/icons/inbox";
  import Settings from "lucide-svelte/icons/settings";
  import * as Sidebar from "$ui/sidebar/index";
  import type { Project } from "$src/types/components/project";
  import {
    AlarmMinus,
    ChevronDown,
    HelpCircle,
    Search,
    UserIcon,
  } from "lucide-svelte";
  import { Collapsible } from "bits-ui";
  import SearchForm from "./search-form.svelte";
  import { toDateTime } from "$src/types/primitive-extensions/date-time";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  // Menu items.
  const dayItems = [
    {
      title: "今日",
      param: "today",
      icon: AlarmMinus,
    },
    {
      title: "明日",
      param: "tomorrow",
      icon: Inbox,
    },
    {
      title: "今週",
      param: "week",
      icon: Calendar,
    },
    {
      title: "未整理",
      param: "inbox",
      icon: Inbox,
    },
  ];

  const projectItems: Project[] = [
    {
      id: "1",
      name: "Project 1",
      icon: "🏠",
      taskLists: [
        {
          id: "1",
          name: "Task List 1",
          icon: "🏠",
          tasks: [],
        },
        {
          id: "2",
          name: "Task List 2",
          icon: "🏠",
          tasks: [],
        },
      ],
    },
    {
      id: "2",
      name: "Project 2",
      icon: "🏢",
      taskLists: [
        {
          id: "3",
          name: "Task List 3",
          icon: "📝",
          tasks: [],
        },
      ],
    },
  ];

  const footerItems = [
    {
      title: "ヘルプ",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "アカウント",
      url: "/account",
      icon: UserIcon,
    },
  ];

  // URLパラメータに基づいてアクティブ状態を判定
  $: isDaily = $page.url.searchParams.has("daily");
  $: currentDaily = $page.url.searchParams.get("daily");
  $: currentProject = $page.url.searchParams.get("project");
  $: currentTaskList = $page.url.searchParams.get("tasks");

  // ナビゲーション関数
  function navigateToDaily(param: string) {
    goto(`?daily=${param}`);
  }

  function navigateToProject(projectId: string, taskListId?: string) {
    if (taskListId) {
      goto(`?project=${projectId}&tasks=${taskListId}`);
    } else {
      goto(`?project=${projectId}`);
    }
  }
</script>

<Sidebar.Root side="left" collapsible="icon">
  <Sidebar.Header>
    <Sidebar.Group>
      <Sidebar.GroupContent>
        <Sidebar.Menu></Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Header>
  <Sidebar.Content>
    <!-- search -->
    <SearchForm />
    <!-- daily -->
    <Sidebar.Group>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each dayItems as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <button
                    {...props}
                    class="flex items-center gap-2 w-full {currentDaily ===
                    item.param
                      ? 'bg-accent'
                      : ''}"
                    on:click={() => navigateToDaily(item.param)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </button>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
    <!-- project -->
    {#each projectItems as project (project.id)}
      <Collapsible.Root
        open={currentProject === project.id}
        class="group/collapsible"
      >
        <Sidebar.Group>
          <Sidebar.GroupLabel>
            {#snippet child({ props })}
              <Collapsible.Trigger
                {...props}
                on:click={() => navigateToProject(project.id)}
              >
                <span>{project.name}</span>
                <ChevronDown
                  class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                />
              </Collapsible.Trigger>
            {/snippet}
          </Sidebar.GroupLabel>
          <!-- Project task list -->
          <Collapsible.Content>
            <Sidebar.Menu>
              {#each project.taskLists as taskList (taskList.id)}
                <Sidebar.MenuItem>
                  <Sidebar.MenuItem style="padding-left: 20px;">
                    <Sidebar.MenuButton>
                      {#snippet child({ props })}
                        <button
                          {...props}
                          class="flex items-center gap-2 w-full {currentProject ===
                            project.id && currentTaskList === taskList.id
                            ? 'bg-accent'
                            : ''}"
                          on:click={() =>
                            navigateToProject(project.id, taskList.id)}
                        >
                          <span>{taskList.name}</span>
                        </button>
                      {/snippet}
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.MenuItem>
              {/each}
            </Sidebar.Menu>
          </Collapsible.Content>
        </Sidebar.Group>
      </Collapsible.Root>
    {/each}
    <!-- footer -->
    <Sidebar.Footer>
      <Sidebar.Group>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each footerItems as item (item.title)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href={item.url} {...props}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Footer>
  </Sidebar.Content>
</Sidebar.Root>
