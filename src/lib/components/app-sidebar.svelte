<script lang="ts">
  import Calendar from "lucide-svelte/icons/calendar";
  import Inbox from "lucide-svelte/icons/inbox";
  import Settings from "lucide-svelte/icons/settings";
  import * as Sidebar from "$ui/sidebar/index";
  import type { Project } from "$src/types/project";
  import { AlarmMinus, ChevronDown, HelpCircle, Search, UserIcon } from "lucide-svelte";
  import { Collapsible } from "bits-ui";

  // Menu items.
  const dayItems = [
    {
      title: "今日",
      url: "#",
      icon: AlarmMinus,
    },
    {
      title: "明日",
      url: "#",
      icon: Inbox,
    },
    {
      title: "今週",
      url: "#",
      icon: Calendar,
    },
    {
      title: "未整理",
      url: "#",
      icon: Inbox,
    },
    {
      title: "検索",
      url: "#",
      icon: Search,
    }
  ];

  const projectItems: Project[] = [
    {
      id: "1",
      name: "Project 1",
      icon: "🏠",
      url: "#",
      taskLists: [
        {
          id: "1",
          name: "Task List 1",
          url: "#",
          icon: "🏠",
          tasks: [
            {
              id: "1",
              name: "Task 1",
              url: "#",
              icon: "🏠",
              description: "Task 1 description",
              importance: 1,
              priority: 1,
              dueDate: "2024-01-01",
              completeDate: "2024-01-01",
              completed: false,
              cycle: "daily",
              subTasks: [
                {
                  id: "1",
                  name: "Sub Task 1",
                  url: "#",
                  icon: "🏠",
                  description: "Sub Task 1 description",
                  importance: 1,
                  priority: 1,
                  dueDate: "2024-01-01",
                  completeDate: "2024-01-01",
                  completed: false,
                  cycle: "daily",
                }
              ]
            }
          ]
        },
        {
          id: "2",
          name: "Task List 2",
          url: "#",
          icon: "🏠",
          tasks: [
            {
              id: "2",
              name: "Task 2",
              url: "#",
              icon: "🏠",
              description: "Task 2 description",
              importance: 1,
              priority: 1,
              dueDate: "2024-01-01",
              completeDate: "2024-01-01",
              completed: false,
              cycle: "daily",
              subTasks: []
            }
          ]
        },
      ],
    },
    {
      id: "2",
      name: "Project 2",
      url: "#",
      icon: "🏠",
      taskLists: [
        {
          id: "1",
          name: "Task List 1",
          url: "#",
          icon: "🏠",
          tasks: [
            {
              id: "1",
              name: "Task 1",
              url: "#",
              icon: "🏠",
              description: "Task 1 description",
              importance: 1,
              priority: 1,
              dueDate: "2024-01-01",
              completeDate: "2024-01-01",
              completed: false,
              cycle: "daily",
              subTasks: [
                {
                  id: "1",
                  name: "Sub Task 1",
                  url: "#",
                  icon: "🏠",
                  description: "Sub Task 1 description",
                  importance: 1,
                  priority: 1,
                  dueDate: "2024-01-01",
                  completeDate: "2024-01-01",
                  completed: false,
                  cycle: "daily",
                }
              ]
            }
          ]
        },
      ],
    },
  ];

  const footerItems = [
    {
      title: "ヘルプ",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "アカウント",
      url: "#",
      icon: UserIcon,
    }
  ];
</script>

  <Sidebar.Root side="left" collapsible="icon">
    <Sidebar.Header>
      <Sidebar.Group>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Header>
    <Sidebar.Content>
      <!-- daily -->
      <Sidebar.Group>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each dayItems as item (item.title)}
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
      <!-- project -->
      {#each projectItems as item (item.name)}
        <Collapsible.Root open class="group/collapsible" >
          <Sidebar.Group>
            <Sidebar.GroupLabel>
              {#snippet child({ props })}
                <Collapsible.Trigger {...props}>
                  <span>{item.name}</span>
                  <ChevronDown
                    class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </Collapsible.Trigger>
              {/snippet}
            </Sidebar.GroupLabel>
            <!-- Project task list -->
            <Collapsible.Content>
              <Sidebar.Menu>
                {#each item.taskLists as taskList (taskList.name)}
                  <Sidebar.MenuItem>
                    <Sidebar.MenuItem style="padding-left: 20px;">
                      <Sidebar.MenuButton>
                        {#snippet child({ props })}
                          <a href={taskList.url} {...props}>
                            <span>{taskList.name}</span>
                          </a>
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
      </Sidebar.Content>
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
    </Sidebar.Root>