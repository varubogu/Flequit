<script lang="ts">
  import Calendar from "lucide-svelte/icons/calendar";
  import House from "lucide-svelte/icons/house";
  import Inbox from "lucide-svelte/icons/inbox";
  import Search from "lucide-svelte/icons/search";
  import Settings from "lucide-svelte/icons/settings";
  import * as Sidebar from "$ui/sidebar/index";
  import type { ProjectDisplay } from "$src/types/attachment/display";
  import { AlarmMinus, ChevronDown, HelpCircle, Plus, UserIcon } from "lucide-svelte";
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
  ];

  const projectItems: ProjectDisplay[] = [
    {
      id: "1",
      name: "Project 1",
      icon: "🏠",
      task_lists: [
        {
          name: "Task List 1",
          url: "#",
          icon: "🏠",
        },
        {
          name: "Task List 2",
          url: "#",
          icon: "🏠",
        },
      ],
    },
    {
      id: "2",
      name: "Project 2",
      task_lists: [
        {
          name: "Task List 1",
          url: "#",
          icon: "🏠",
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
                {#each item.task_lists as task (task.name)}
                  <Sidebar.MenuItem>
                    <Sidebar.MenuItem style="padding-left: 20px;">
                      <Sidebar.MenuButton>
                        {#snippet child({ props })}
                          <a href={task.url} {...props}>
                            <span>{task.name}</span>
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