<script lang="ts">
  import Calendar from "lucide-svelte/icons/calendar";
  import House from "lucide-svelte/icons/house";
  import Inbox from "lucide-svelte/icons/inbox";
  import Search from "lucide-svelte/icons/search";
  import Settings from "lucide-svelte/icons/settings";
  import * as Sidebar from "$ui/sidebar/index";
  import type { ProjectDisplay } from "$src/types/attachment/display";
    import { UserIcon } from "lucide-svelte";

  // Menu items.
  const dayItems = [
    {
      title: "今日",
      url: "#",
      icon: House,
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
          title: "Task 1",
          url: "#",
          icon: "🏠",
        },
        {
          title: "Task 2",
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
          title: "Task 1",
          url: "#",
          icon: "🏠",
        },
      ],
    },
  ];

  const footerItems = [
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
      <!-- <Sidebar.Group>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each projectItems as item (item.id)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href={item.url} {...props}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group> -->
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