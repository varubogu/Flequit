<script lang="ts">
    import { createCollapsible, melt } from "@melt-ui/svelte";
    const {
        elements: { root, content, trigger },
        states: { open }
    } = createCollapsible();
</script>

<div use:melt={$root} class="sidebar">
    <button use:melt={$trigger} class="sidebar-trigger">
        <span>☰</span> <!-- アイコン表示 -->
    </button>
    <div use:melt={$content} class="sidebar-content">
        <slot></slot> <!-- 外側から注入される内容 -->
    </div>
</div>

<style>
    .sidebar {
        width: 250px;
        background-color: #f6f6f6;
        transition: width 0.3s;
    }
    .sidebar-trigger {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 24px;
        padding: 10px;
    }
    .sidebar-content {
        padding: 10px;
    }
</style>
