
<script lang="ts">
    import { Sidebar } from "$ui/sidebar/index";
    import AppSideBar from "$components/app-sidebar.svelte";
</script>

<Sidebar.Provider>
    <AppSideBar />
    <main>
        <Sidebar.Trigger />
        {@render children?.()}
    </main>
</Sidebar.Provider>