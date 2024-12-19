import type { Action } from 'svelte/action';

interface ClickOutsideConfig {
    handler: () => void;
}

export const clickOutside: Action<HTMLElement, ClickOutsideConfig> = (node, config) => {
    const handleClick = (event: MouseEvent) => {
        if (!node.contains(event.target as Node)) {
            config.handler();
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        },
    };
};