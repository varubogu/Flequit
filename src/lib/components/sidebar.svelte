
<script lang="ts">
    import * as Sidebar from "$components/ui/sidebar/index";
    import AppSideBar from "$components/app-sidebar.svelte";
</script>

<Sidebar.Provider>
    <AppSideBar />
</Sidebar.Provider>