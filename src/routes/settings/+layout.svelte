
<script lang="ts">
    import { Sidebar } from "$ui/sidebar/index";
    import AppSideBar from "$components/app-sidebar2.svelte";
</script>

<Sidebar.Provider>
    <AppSideBar />
    <main>
        <Sidebar.Trigger />
        {@render children?.()}
    </main>
</Sidebar.Provider>