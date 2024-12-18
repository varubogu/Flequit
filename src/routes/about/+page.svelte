<script lang="ts">
    import { createCollapsible, melt } from "@melt-ui/svelte";
    const {
        elements: { root, content, trigger },
        states: { open }
    } = createCollapsible();
</script>

<div use:melt={$root}>
    <button use:melt={$trigger}>
        <span>hello</span>
    </button>
    <div use:melt={$content}>
        <p>hello</p>
    </div>
</div>