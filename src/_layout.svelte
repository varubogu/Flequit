<script lang="ts" context="module">
    import { waitLocale } from "svelte-i18n";

    export async function preload() {
        await waitLocale();
    }
</script>