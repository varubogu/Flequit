<script lang="ts">
    import Sidebar from '$lib/ui/component/tasks/sidebar.svelte';
    import List from '$lib/ui/component/tasks/list.svelte';
    import Detail from '$lib/ui/component/tasks/detail.svelte';
</script>

<div class="layout">
    <Sidebar />
    <div class="main-content">
        <Detail />
    </div>
</div>

<style>
    .layout {
        display: flex;
        flex-direction: row;
    }
    .main-content {
        flex-grow: 1;
        padding: 20px;
    }
</style>
