<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import Sun from 'lucide-svelte/icons/sun';
    import Moon from 'lucide-svelte/icons/moon';
    import Monitor from 'lucide-svelte/icons/monitor';
    import Check from 'lucide-svelte/icons/check';
    import { cn } from '$lib/utils';
    import { clickOutside } from '$lib/actions/click-outside';

    let currentTheme: 'light' | 'dark' | 'system';
    theme.subscribe(value => {
        currentTheme = value;
    });

    let open = false;
    let menuRef: HTMLDivElement;

    function handleClickOutside() {
        open = false;
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            open = false;
        }
    }

    function handleClick(event: Event) {
        event.stopPropagation();
        open = !open;
    }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="relative" bind:this={menuRef} use:clickOutside={{ handler: handleClickOutside }}>
    <button
        class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent p-0 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        on:click={handleClick}
    >
        <Sun class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">テーマを切り替える</span>
    </button>

    {#if open}
        <div
            class="absolute right-0 mt-2 w-[200px] rounded-md border bg-popover p-1 shadow-md"
            role="menu"
            tabindex="-1"
        >
            <button
                class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent"
                role="menuitem"
                on:click={() => {
                    theme.setTheme('light');
                    open = false;
                }}
            >
                <Sun class="h-4 w-4" />
                <span>ライト</span>
                {#if currentTheme === 'light'}
                    <Check class="ml-auto h-4 w-4" />
                {/if}
            </button>
            <button
                class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent"
                role="menuitem"
                on:click={() => {
                    theme.setTheme('dark');
                    open = false;
                }}
            >
                <Moon class="h-4 w-4" />
                <span>ダーク</span>
                {#if currentTheme === 'dark'}
                    <Check class="ml-auto h-4 w-4" />
                {/if}
            </button>
            <button
                class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent"
                role="menuitem"
                on:click={() => {
                    theme.setTheme('system');
                    open = false;
                }}
            >
                <Monitor class="h-4 w-4" />
                <span>システム</span>
                {#if currentTheme === 'system'}
                    <Check class="ml-auto h-4 w-4" />
                {/if}
            </button>
        </div>
    {/if}
</div>