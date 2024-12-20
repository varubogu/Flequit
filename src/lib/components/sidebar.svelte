<script lang="ts">
    import * as Sidebar from "$components/ui/sidebar/index";
    import * as Sheet from "$components/ui/sheet";
    import Calendar from "lucide-svelte/icons/calendar";
    import Settings from "lucide-svelte/icons/settings";
    import HelpCircle from "lucide-svelte/icons/help-circle";
    import Menu from "lucide-svelte/icons/menu";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import ChevronLeft from "lucide-svelte/icons/chevron-left";
    import User from "lucide-svelte/icons/user";
    import { cn } from "$lib/utils";
    import { page } from "$app/stores";
    import ThemeToggle from './theme-toggle.svelte';
    import { fade } from 'svelte/transition';

    let project1Expanded = true;
    let project2Expanded = false;
    let isCollapsed = false;
    let isMobileOpen = false;
    let isTransitioning = false;
    let showContent = !isCollapsed;

    $: currentPath = $page.url.pathname;
    $: isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    function isActive(path: string) {
        return currentPath === path;
    }

    function toggleSidebar() {
        if (isMobile) {
            isMobileOpen = !isMobileOpen;
        } else {
            isTransitioning = true;
            if (isCollapsed) {
                isCollapsed = false;
                setTimeout(() => {
                    showContent = true;
                    isTransitioning = false;
                }, 300);
            } else {
                showContent = false;
                setTimeout(() => {
                    isCollapsed = true;
                    isTransitioning = false;
                }, 150);
            }
        }
    }

    function getShortText(text: string) {
        return text.slice(0, 2);
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
    class="{!isMobile ? 'hidden' : ''} fixed top-4 left-4 z-50 hover:bg-accent rounded-md p-1"
    on:click={toggleSidebar}
>
    <Menu class="w-6 h-6" />
</button>

<!-- デスクトップサイドバー -->
<div class="fixed left-0 top-0 h-screen {isMobile ? 'hidden' : ''}">
    <Sidebar.Provider>
        <Sidebar.Root
            class={cn(
                "sidebar-root border-r transition-all duration-300 overflow-x-hidden",
                isCollapsed ? "w-16" : "w-64",
                isTransitioning && "overflow-hidden"
            )}
            data-collapsed={isCollapsed}
        >
            <div class="p-2 border-b flex justify-between items-center">
                {#if showContent}
                    <span class="font-semibold px-1" transition:fade={{ duration: 150, delay: 150 }}>Flequit</span>
                    <div class="flex items-center gap-1" transition:fade={{ duration: 150, delay: 150 }}>
                        <ThemeToggle />
                        <button class="hover:bg-accent rounded-md p-1" on:click={toggleSidebar}>
                            <ChevronLeft class="w-6 h-6" />
                        </button>
                    </div>
                {:else}
                    <button class="hover:bg-accent rounded-md p-1 mx-auto" on:click={toggleSidebar}>
                        <ChevronRight class="w-6 h-6" />
                    </button>
                {/if}
            </div>
            <div class="flex-1 overflow-y-auto overflow-x-hidden">
                <!-- 日付フィ���ター -->
                <Sidebar.Group>
                    <Sidebar.Menu class="space-y-1 p-2">
                        <Sidebar.MenuItem>
                            <a
                                href="/tasks/today"
                                class={cn(
                                    "menu-item rounded-md",
                                    isActive("/tasks/today") ? "bg-accent" : "hover:bg-accent/50"
                                )}
                                title="今日"
                            >
                                <Calendar class="sidebar-icon" />
                                {#if showContent}
                                    <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>今日</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <a
                                href="/tasks/tomorrow"
                                class={cn(
                                    "menu-item rounded-md",
                                    isActive("/tasks/tomorrow") ? "bg-accent" : "hover:bg-accent/50"
                                )}
                                title="明日"
                            >
                                <Calendar class="sidebar-icon" />
                                {#if showContent}
                                    <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>明日</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <a
                                href="/tasks/week"
                                class={cn(
                                    "menu-item rounded-md",
                                    isActive("/tasks/week") ? "bg-accent" : "hover:bg-accent/50"
                                )}
                                title="今週"
                            >
                                <Calendar class="sidebar-icon" />
                                {#if showContent}
                                    <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>今週</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                    </Sidebar.Menu>
                </Sidebar.Group>

                {#if showContent}
                    <!-- プロジェクト1 -->
                    <div transition:fade={{ duration: 150, delay: 150 }}>
                        <Sidebar.Group>
                            <Sidebar.Menu class="space-y-1 p-2">
                                <Sidebar.MenuItem>
                                    <button
                                        class={cn(
                                            "project-button rounded-md hover:bg-accent/50"
                                        )}
                                        on:click={() => project1Expanded = !project1Expanded}
                                    >
                                        <ChevronRight class="sidebar-icon transition-transform {project1Expanded ? 'rotate-90' : ''}" />
                                        {#if showContent}
                                            <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>プロジェクト1</span>
                                        {/if}
                                    </button>
                                </Sidebar.MenuItem>
                                {#if project1Expanded}
                                    <Sidebar.MenuItem>
                                        <a
                                            href="/projects/1/list/1"
                                            class={cn(
                                                "flex h-9 items-center justify-start px-8 rounded-md",
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
                                                "flex h-9 items-center justify-start px-8 rounded-md",
                                                isActive("/projects/1/list/2") ? "bg-accent" : "hover:bg-accent/50"
                                            )}
                                        >
                                            <span>リスト2</span>
                                        </a>
                                    </Sidebar.MenuItem>
                                {/if}
                            </Sidebar.Menu>
                        </Sidebar.Group>
                    </div>

                    <!-- プロジェクト2 -->
                    <div transition:fade={{ duration: 150, delay: 150 }}>
                        <Sidebar.Group>
                            <Sidebar.Menu class="space-y-1 p-2">
                                <Sidebar.MenuItem>
                                    <button
                                        class={cn(
                                            "project-button rounded-md hover:bg-accent/50"
                                        )}
                                        on:click={() => project2Expanded = !project2Expanded}
                                    >
                                        <ChevronRight class="sidebar-icon transition-transform {project2Expanded ? 'rotate-90' : ''}" />
                                        {#if showContent}
                                            <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>プロジェクト2</span>
                                        {/if}
                                    </button>
                                </Sidebar.MenuItem>
                                {#if project2Expanded}
                                    <Sidebar.MenuItem>
                                        <a
                                            href="/projects/2/list/1"
                                            class={cn(
                                                "flex h-9 items-center justify-start px-8 rounded-md",
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
                                                "flex h-9 items-center justify-start px-8 rounded-md",
                                                isActive("/projects/2/list/2") ? "bg-accent" : "hover:bg-accent/50"
                                            )}
                                        >
                                            <span>リスト2</span>
                                        </a>
                                    </Sidebar.MenuItem>
                                {/if}
                            </Sidebar.Menu>
                        </Sidebar.Group>
                    </div>
                {:else}
                    <!-- 折りたたみ時のプロジェクト表示 -->
                    <Sidebar.Group>
                        <Sidebar.Menu class="space-y-1 p-2">
                            <Sidebar.MenuItem>
                                <button
                                    class="flex h-9 items-center justify-center rounded-md hover:bg-accent/50"
                                    title="プロジェクト1"
                                >
                                    <span class="text-sm font-medium">P1</span>
                                </button>
                            </Sidebar.MenuItem>
                            <Sidebar.MenuItem>
                                <button
                                    class="flex h-9 items-center justify-center rounded-md hover:bg-accent/50"
                                    title="プロジェクト2"
                                >
                                    <span class="text-sm font-medium">P2</span>
                                </button>
                            </Sidebar.MenuItem>
                        </Sidebar.Menu>
                    </Sidebar.Group>
                {/if}
            </div>

            <div class="border-t">
                <Sidebar.Group>
                    <Sidebar.Menu class="space-y-1 p-1">
                        <Sidebar.MenuItem>
                            <a
                                href="/help"
                                class={cn(
                                    "flex h-9 items-center justify-center",
                                    "rounded-md",
                                    isActive("/help") ? "bg-accent" : "hover:bg-accent/50",
                                    !isCollapsed && "justify-start px-3"
                                )}
                                title="ヘルプ"
                            >
                                <HelpCircle class="h-4 w-4" />
                                {#if showContent}
                                    <span class="ml-3" transition:fade={{ duration: 150, delay: 150 }}>ヘルプ</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <a
                                href="/settings"
                                class={cn(
                                    "flex h-9 items-center justify-center",
                                    "rounded-md",
                                    isActive("/settings") ? "bg-accent" : "hover:bg-accent/50",
                                    !isCollapsed && "justify-start px-3"
                                )}
                                title="設定"
                            >
                                <Settings class="h-4 w-4" />
                                {#if showContent}
                                    <span class="ml-3" transition:fade={{ duration: 150, delay: 150 }}>設定</span>
                                {/if}
                            </a>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <button
                                class={cn(
                                    "flex h-9 items-center justify-center",
                                    "rounded-full bg-accent/50",
                                    !isCollapsed && "justify-start px-3"
                                )}
                            >
                                <User class="h-4 w-4" />
                                {#if showContent}
                                    <span class="ml-3" transition:fade={{ duration: 150, delay: 150 }}>Tarou Yamada</span>
                                {:else}
                                    <span class="sr-only">Tarou Yamada</span>
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
                        <Sidebar.Menu class="space-y-1">
                            <Sidebar.MenuItem>
                                <a
                                    href="/tasks/today"
                                    class={cn(
                                        "menu-item rounded-md",
                                        isActive("/tasks/today") ? "bg-accent" : "hover:bg-accent/50"
                                    )}
                                >
                                    <Calendar class="sidebar-icon" />
                                    {#if showContent}
                                        <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>今日</span>
                                    {/if}
                                </a>
                            </Sidebar.MenuItem>
                            <Sidebar.MenuItem>
                                <a
                                    href="/tasks/tomorrow"
                                    class={cn(
                                        "menu-item rounded-md",
                                        isActive("/tasks/tomorrow") ? "bg-accent" : "hover:bg-accent/50"
                                    )}
                                >
                                    <Calendar class="sidebar-icon" />
                                    {#if showContent}
                                        <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>明日</span>
                                    {/if}
                                </a>
                            </Sidebar.MenuItem>
                            <Sidebar.MenuItem>
                                <a
                                    href="/tasks/week"
                                    class={cn(
                                        "menu-item rounded-md",
                                        isActive("/tasks/week") ? "bg-accent" : "hover:bg-accent/50"
                                    )}
                                >
                                    <Calendar class="sidebar-icon" />
                                    {#if showContent}
                                        <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>今週</span>
                                    {/if}
                                </a>
                            </Sidebar.MenuItem>
                        </Sidebar.Menu>
                    </Sidebar.Group>

                    <!-- プロジェクト1 -->
                    <Sidebar.Group>
                        <Sidebar.Menu>
                            <Sidebar.MenuItem>
                                <button
                                    class={cn(
                                        "project-button rounded-md hover:bg-accent/50"
                                    )}
                                    on:click={() => project1Expanded = !project1Expanded}
                                >
                                    <ChevronRight class="sidebar-icon transition-transform {project1Expanded ? 'rotate-90' : ''}" />
                                    {#if showContent}
                                        <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>プロジェクト1</span>
                                    {/if}
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
                                    class={cn(
                                        "project-button rounded-md hover:bg-accent/50"
                                    )}
                                    on:click={() => project2Expanded = !project2Expanded}
                                >
                                    <ChevronRight class="sidebar-icon transition-transform {project2Expanded ? 'rotate-90' : ''}" />
                                    {#if showContent}
                                        <span class="menu-item-text" transition:fade={{ duration: 150, delay: 150 }}>プロジェクト2</span>
                                    {/if}
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
                            <Sidebar.Menu class="space-y-1">
                                <Sidebar.MenuItem>
                                    <a
                                        href="/help"
                                        class={cn(
                                            "flex h-9 items-center justify-center",
                                            "rounded-md",
                                            isActive("/help") ? "bg-accent" : "hover:bg-accent/50",
                                            !isCollapsed && "justify-start px-3"
                                        )}
                                    >
                                        <HelpCircle class="h-4 w-4" />
                                        <span>ヘルプ</span>
                                    </a>
                                </Sidebar.MenuItem>
                                <Sidebar.MenuItem>
                                    <a
                                        href="/settings"
                                        class={cn(
                                            "flex h-9 items-center justify-center",
                                            "rounded-md",
                                            isActive("/settings") ? "bg-accent" : "hover:bg-accent/50",
                                            !isCollapsed && "justify-start px-3"
                                        )}
                                    >
                                        <Settings class="h-4 w-4" />
                                        <span>設定</span>
                                    </a>
                                </Sidebar.MenuItem>
                                <Sidebar.MenuItem>
                                    <button
                                        class={cn(
                                            "flex h-9 items-center justify-center",
                                            "rounded-full bg-accent/50",
                                            !isCollapsed && "justify-start px-3"
                                        )}
                                    >
                                        <User class="h-4 w-4" />
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

<style>
    /* アニメーションの最適化 */
    .transition-all {
        will-change: width, transform;
    }

    /* トランジション中のテキストを非表示 */
    :global(.overflow-hidden *) {
        overflow: hidden;
        white-space: nowrap;
    }

    /* サイドバー内のボタンスタイル */
    :global(.sidebar-root) {
        min-width: 4rem;
    }

    :global(.sidebar-root button),
    :global(.sidebar-root a) {
        margin: 0 0.25rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* アイコンの位置を固定 */
    :global(.sidebar-icon) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
    }

    /* メニューアイテムのレイアウト */
    :global(.menu-item) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        height: 2.25rem;
    }

    :global(.menu-item-text) {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        line-height: 1;
    }

    /* プロジェクトボタンのスタイル */
    :global(.project-button) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        height: 2.25rem;
        width: 100%;
    }

    :global(.project-button .sidebar-icon) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
    }

    /* 横スクロールを防止 */
    :global(.overflow-x-hidden) {
        overflow-x: hidden;
    }
</style>