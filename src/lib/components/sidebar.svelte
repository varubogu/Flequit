<script lang="ts">
    import * as Sidebar from "$components/ui/sidebar/index";
    import * as Sheet from "$components/ui/sheet";
    import Calendar from "lucide-svelte/icons/calendar";
    import Settings from "lucide-svelte/icons/settings";
    import HelpCircle from "lucide-svelte/icons/help-circle";
    import Menu from "lucide-svelte/icons/menu";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import User from "lucide-svelte/icons/user";
    import { cn } from "$lib/utils";
    import { page } from "$app/stores";
    import ThemeToggle from './theme-toggle.svelte';

    let project1Expanded = true;
    let project2Expanded = false;
    let isCollapsed = false;
    let isMobileOpen = false;

    $: currentPath = $page.url.pathname;
    $: isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    function isActive(path: string) {
        return currentPath === path;
    }

    function toggleSidebar() {
        if (isMobile) {
            isMobileOpen = !isMobileOpen;
        } else {
            isCollapsed = !isCollapsed;
        }
    }
</script>

<svelte:window
    on:resize={() => {
        isMobile = window.innerWidth < 768;
        if (!isMobile) {
            isMobileOpen = false;
        }
    }}
/>

<!-- モバイルメニューボタン -->
<button
    class="md:hidden fixed top-4 left-4 z-50 hover:bg-accent rounded-md p-1"
    on:click={toggleSidebar}
>
    <Menu class="w-6 h-6" />
</button>

<!-- デスクトップサイドバー -->
<div class="hidden md:block">
    <Sidebar.Provider>
        <Sidebar.Root class={cn("border-r transition-all duration-300", isCollapsed ? "w-16" : "w-64")}>
            <div class="p-4 border-b flex justify-between items-center">
                {#if !isCollapsed}
                    <span class="font-semibold">Flequit</span>
                {/if}
                <div class="flex items-center gap-2">
                    <ThemeToggle />
                    <button class="hover:bg-accent rounded-md p-1" on:click={toggleSidebar}>
                        <Menu class="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto px-2">
                <!-- 日付フィルター -->
                <Sidebar.Group>
                    <Sidebar.Menu>
                        <Sidebar.MenuItem>
                            <a
                                href="/tasks/today"
                                class={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md",
                                    isActive("/tasks/today") ? "bg-accent" : "hover:bg-accent/50",
                                    isCollapsed && !isMobile && "justify-center"
                                )}
                            >
                                <Calendar class="w-4 h-4" />
                                {#if !isCollapsed || isMobile}
                                    <span>今日</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <a
                                href="/tasks/tomorrow"
                                class={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md",
                                    isActive("/tasks/tomorrow") ? "bg-accent" : "hover:bg-accent/50",
                                    isCollapsed && !isMobile && "justify-center"
                                )}
                            >
                                <Calendar class="w-4 h-4" />
                                {#if !isCollapsed || isMobile}
                                    <span>明日</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <a
                                href="/tasks/week"
                                class={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md",
                                    isActive("/tasks/week") ? "bg-accent" : "hover:bg-accent/50",
                                    isCollapsed && !isMobile && "justify-center"
                                )}
                            >
                                <Calendar class="w-4 h-4" />
                                {#if !isCollapsed || isMobile}
                                    <span>今週</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                    </Sidebar.Menu>
                </Sidebar.Group>

                {#if !isCollapsed || isMobile}
                    <!-- プロジェクト1 -->
                    <Sidebar.Group>
                        <Sidebar.Menu>
                            <Sidebar.MenuItem>
                                <button
                                    class="flex items-center gap-2 px-4 py-2 w-full hover:bg-accent/50 rounded-md"
                                    on:click={() => project1Expanded = !project1Expanded}
                                >
                                    <ChevronRight class={cn("w-4 h-4 transition-transform", project1Expanded && "rotate-90")} />
                                    <span>プロジェクト1</span>
                                </button>
                            </Sidebar.MenuItem>
                            {#if project1Expanded}
                                <Sidebar.MenuItem>
                                    <a
                                        href="/projects/1/list/1"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 pl-8 rounded-md",
                                            isActive("/projects/1/list/1") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <span>リスト1</span>
                                    </a>
                                </Sidebar.MenuItem>
                                <Sidebar.MenuItem>
                                    <a
                                        href="/projects/1/list/2"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 pl-8 rounded-md",
                                            isActive("/projects/1/list/2") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <span>リスト2</span>
                                    </a>
                                </Sidebar.MenuItem>
                            {/if}
                        </Sidebar.Menu>
                    </Sidebar.Group>

                    <!-- プロジェクト2 -->
                    <Sidebar.Group>
                        <Sidebar.Menu>
                            <Sidebar.MenuItem>
                                <button
                                    class="flex items-center gap-2 px-4 py-2 w-full hover:bg-accent/50 rounded-md"
                                    on:click={() => project2Expanded = !project2Expanded}
                                >
                                    <ChevronRight class={cn("w-4 h-4 transition-transform", project2Expanded && "rotate-90")} />
                                    <span>プロジェクト2</span>
                                </button>
                            </Sidebar.MenuItem>
                            {#if project2Expanded}
                                <Sidebar.MenuItem>
                                    <a
                                        href="/projects/2/list/1"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 pl-8 rounded-md",
                                            isActive("/projects/2/list/1") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <span>リスト1</span>
                                    </a>
                                </Sidebar.MenuItem>
                                <Sidebar.MenuItem>
                                    <a
                                        href="/projects/2/list/2"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 pl-8 rounded-md",
                                            isActive("/projects/2/list/2") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <span>リスト2</span>
                                    </a>
                                </Sidebar.MenuItem>
                            {/if}
                        </Sidebar.Menu>
                    </Sidebar.Group>
                {/if}
            </div>

            <div class="border-t p-2">
                <Sidebar.Group>
                    <Sidebar.Menu>
                        <Sidebar.MenuItem>
                            <a
                                href="/help"
                                class={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md",
                                    isActive("/help") ? "bg-accent" : "hover:bg-accent/50",
                                    isCollapsed && !isMobile && "justify-center"
                                )}
                            >
                                <HelpCircle class="w-4 h-4" />
                                {#if !isCollapsed || isMobile}
                                    <span>ヘルプ</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <a
                                href="/settings"
                                class={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-md",
                                    isActive("/settings") ? "bg-accent" : "hover:bg-accent/50",
                                    isCollapsed && !isMobile && "justify-center"
                                )}
                            >
                                <Settings class="w-4 h-4" />
                                {#if !isCollapsed || isMobile}
                                    <span>設定</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <button class={cn(
                                "flex items-center gap-2 px-4 py-2 w-full bg-accent/50 rounded-full",
                                isCollapsed && !isMobile && "justify-center"
                            )}>
                                <User class="w-4 h-4" />
                                {#if !isCollapsed || isMobile}
                                    <span>Tarou Yamada</span>
                                {/if}
                            </button>
                        </Sidebar.MenuItem>
                    </Sidebar.Menu>
                </Sidebar.Group>
            </div>
        </Sidebar.Root>
    </Sidebar.Provider>
</div>

<!-- モバイルサイドバー -->
<Sheet.Root open={isMobileOpen} onOpenChange={toggleSidebar}>
    <Sheet.Content side="left" class="w-80 p-0">
        <Sidebar.Provider>
            <Sidebar.Root class="w-full h-full">
                <div class="p-4 border-b flex justify-between items-center">
                    <span class="font-semibold">Flequit</span>
                    <div class="flex items-center gap-2">
                        <ThemeToggle />
                        <button class="hover:bg-accent rounded-md p-1" on:click={toggleSidebar}>
                            <Menu class="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto px-2">
                    <!-- 日付フィルター -->
                    <Sidebar.Group>
                        <Sidebar.Menu>
                            <Sidebar.MenuItem>
                                <a
                                    href="/tasks/today"
                                    class={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-md",
                                        isActive("/tasks/today") ? "bg-accent" : "hover:bg-accent/50",
                                        isCollapsed && !isMobile && "justify-center"
                                    )}
                                >
                                    <Calendar class="w-4 h-4" />
                                    <span>今日</span>
                                </a>
                            </Sidebar.MenuItem>
                            <Sidebar.MenuItem>
                                <a
                                    href="/tasks/tomorrow"
                                    class={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-md",
                                        isActive("/tasks/tomorrow") ? "bg-accent" : "hover:bg-accent/50",
                                        isCollapsed && !isMobile && "justify-center"
                                    )}
                                >
                                    <Calendar class="w-4 h-4" />
                                    <span>明日</span>
                                </a>
                            </Sidebar.MenuItem>
                            <Sidebar.MenuItem>
                                <a
                                    href="/tasks/week"
                                    class={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-md",
                                        isActive("/tasks/week") ? "bg-accent" : "hover:bg-accent/50",
                                        isCollapsed && !isMobile && "justify-center"
                                    )}
                                >
                                    <Calendar class="w-4 h-4" />
                                    <span>今週</span>
                                </a>
                            </Sidebar.MenuItem>
                        </Sidebar.Menu>
                    </Sidebar.Group>

                    <!-- プロジェクト1 -->
                    <Sidebar.Group>
                        <Sidebar.Menu>
                            <Sidebar.MenuItem>
                                <button
                                    class="flex items-center gap-2 px-4 py-2 w-full hover:bg-accent/50 rounded-md"
                                    on:click={() => project1Expanded = !project1Expanded}
                                >
                                    <ChevronRight class={cn("w-4 h-4 transition-transform", project1Expanded && "rotate-90")} />
                                    <span>プロジェクト1</span>
                                </button>
                            </Sidebar.MenuItem>
                            {#if project1Expanded}
                                <Sidebar.MenuItem>
                                    <a
                                        href="/projects/1/list/1"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 pl-8 rounded-md",
                                            isActive("/projects/1/list/1") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <span>リスト1</span>
                                    </a>
                                </Sidebar.MenuItem>
                                <Sidebar.MenuItem>
                                    <a
                                        href="/projects/1/list/2"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 pl-8 rounded-md",
                                            isActive("/projects/1/list/2") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <span>リスト2</span>
                                    </a>
                                </Sidebar.MenuItem>
                            {/if}
                        </Sidebar.Menu>
                    </Sidebar.Group>

                    <!-- プロジェクト2 -->
                    <Sidebar.Group>
                        <Sidebar.Menu>
                            <Sidebar.MenuItem>
                                <button
                                    class="flex items-center gap-2 px-4 py-2 w-full hover:bg-accent/50 rounded-md"
                                    on:click={() => project2Expanded = !project2Expanded}
                                >
                                    <ChevronRight class={cn("w-4 h-4 transition-transform", project2Expanded && "rotate-90")} />
                                    <span>プロジェクト2</span>
                                </button>
                            </Sidebar.MenuItem>
                            {#if project2Expanded}
                                <Sidebar.MenuItem>
                                    <a
                                        href="/projects/2/list/1"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 pl-8 rounded-md",
                                            isActive("/projects/2/list/1") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <span>リスト1</span>
                                    </a>
                                </Sidebar.MenuItem>
                                <Sidebar.MenuItem>
                                    <a
                                        href="/projects/2/list/2"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 pl-8 rounded-md",
                                            isActive("/projects/2/list/2") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <span>リスト2</span>
                                    </a>
                                </Sidebar.MenuItem>
                            {/if}
                        </Sidebar.Menu>
                    </Sidebar.Group>

                    <div class="border-t p-2">
                        <Sidebar.Group>
                            <Sidebar.Menu>
                                <Sidebar.MenuItem>
                                    <a
                                        href="/help"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-md",
                                            isActive("/help") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <HelpCircle class="w-4 h-4" />
                                        <span>ヘルプ</span>
                                    </a>
                                </Sidebar.MenuItem>
                                <Sidebar.MenuItem>
                                    <a
                                        href="/settings"
                                        class={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-md",
                                            isActive("/settings") ? "bg-accent" : "hover:bg-accent/50"
                                        )}
                                    >
                                        <Settings class="w-4 h-4" />
                                        <span>設定</span>
                                    </a>
                                </Sidebar.MenuItem>
                                <Sidebar.MenuItem>
                                    <button class="flex items-center gap-2 px-4 py-2 w-full bg-accent/50 rounded-full">
                                        <User class="w-4 h-4" />
                                        <span>Tarou Yamada</span>
                                    </button>
                                </Sidebar.MenuItem>
                            </Sidebar.Menu>
                        </Sidebar.Group>
                    </div>
                </div>
            </Sidebar.Root>
        </Sidebar.Provider>
    </Sheet.Content>
</Sheet.Root>