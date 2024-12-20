<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import Sun from 'lucide-svelte/icons/sun';
    import Moon from 'lucide-svelte/icons/moon';
    import Monitor from 'lucide-svelte/icons/monitor';
    import Check from 'lucide-svelte/icons/check';
    import Palette from 'lucide-svelte/icons/palette';
    import { cn } from '$lib/utils';
    import { clickOutside } from '$lib/actions/click-outside';
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let currentTheme: 'light' | 'dark' | 'system';
    let currentPreset = '';

    theme.subscribe(value => {
        currentTheme = value as 'light' | 'dark' | 'system';
    });

    theme.preset.subscribe(value => {
        currentPreset = value;
    });

    let open = false;
    let menuRef: HTMLDivElement;
    let selectedIndex = 0;
    const menuItems = ['light', 'dark', 'system'] as const;

    function handleClickOutside() {
        open = false;
        selectedIndex = menuItems.indexOf(currentTheme);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (!open && event.key === 'Enter') {
            open = true;
            return;
        }

        if (!open) return;

        switch (event.key) {
            case 'Escape':
                open = false;
                selectedIndex = menuItems.indexOf(currentTheme);
                break;
            case 'ArrowDown':
                event.preventDefault();
                selectedIndex = (selectedIndex + 1) % menuItems.length;
                break;
            case 'ArrowUp':
                event.preventDefault();
                selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                theme.setTheme(menuItems[selectedIndex]);
                open = false;
                break;
        }
    }

    function handleClick(event: Event) {
        event.stopPropagation();
        if (!open) {
            selectedIndex = menuItems.indexOf(currentTheme);
        }
        open = !open;
    }

    $: if (open) {
        // メニューが開いたときにフォーカスを設定
        setTimeout(() => {
            const menuElement = document.querySelector('[role="menu"]');
            if (menuElement) {
                (menuElement as HTMLElement).focus();
            }
        }, 0);
    }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="relative inline-block" bind:this={menuRef} use:clickOutside={{ handler: handleClickOutside }}>
    <button
        class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent p-0 text-sm font-medium shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        on:click={handleClick}
        aria-haspopup="true"
        aria-expanded={open}
    >
        <div class="relative w-4 h-4">
            <Sun class="absolute inset-0 h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
            <Moon class="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
        </div>
        <span class="sr-only">テーマを切り替える</span>
    </button>

    {#if open}
        <div
            class="absolute right-0 mt-2 w-[200px] rounded-md border bg-popover p-1 shadow-md z-50 max-w-[calc(100vw-1rem)]"
            style="max-width: calc(var(--sidebar-width, 16rem) - 1rem);"
            role="menu"
            tabindex="-1"
            transition:fly={{ y: -5, duration: 200, easing: quintOut }}
            aria-label="テーマ選択メニュー"
        >
            <div class="p-1 isolate">
                <h3 class="mb-2 px-2 text-sm font-semibold">外観</h3>
                {#each menuItems as item, index}
                    <button
                        class={cn(
                            "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                            selectedIndex === index ? "bg-accent" : "hover:bg-accent/50",
                            "focus-visible:bg-accent focus-visible:outline-none"
                        )}
                        role="menuitem"
                        on:click|stopPropagation={() => {
                            theme.setTheme(item);
                            open = false;
                        }}
                        aria-selected={selectedIndex === index}
                    >
                        <div class="flex-shrink-0 w-4 h-4">
                            {#if item === 'light'}
                                <Sun class="h-4 w-4" />
                            {:else if item === 'dark'}
                                <Moon class="h-4 w-4" />
                            {:else}
                                <Monitor class="h-4 w-4" />
                            {/if}
                        </div>
                        <span class="flex-grow truncate">
                            {#if item === 'light'}
                                ライト
                            {:else if item === 'dark'}
                                ダーク
                            {:else}
                                システム
                            {/if}
                        </span>
                        {#if currentTheme === item}
                            <div class="flex-shrink-0" transition:fade={{ duration: 200 }}>
                                <Check class="ml-auto h-4 w-4" />
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>

            <div class="border-t my-1" />

            <div class="p-1">
                <h3 class="mb-2 px-2 text-sm font-semibold">カラー</h3>
                <div class="grid grid-cols-3 gap-1">
                    {#each theme.presets as preset}
                        <button
                            class={cn(
                                "inline-flex items-center justify-center rounded-md p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                currentPreset === preset.name && "border-2 border-primary"
                            )}
                            style="background-color: hsl({preset.colors.light.primary})"
                            on:click|stopPropagation={() => {
                                theme.preset.set(preset.name);
                            }}
                            title={preset.name}
                        >
                            <span class="sr-only">{preset.name}テーマ</span>
                            <Palette class="h-4 w-4" />
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    button {
        -webkit-tap-highlight-color: transparent;
    }

    /* フォーカスリングのカスタマイズ */
    :global(.focus-visible) {
        outline: none;
        box-shadow: 0 0 0 2px var(--ring);
    }

    /* アニメーションの最適化 */
    .transition-all {
        will-change: transform, opacity;
    }
</style>