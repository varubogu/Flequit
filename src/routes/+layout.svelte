<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import "../app.css";

    // 初期表示時のアニメーションを制御
    let isInitialMount = true;

    onMount(() => {
        if (browser) {
            // 初期表示時はアニメーションを無効化
            document.documentElement.classList.add("no-animation");

            // DOMの読み込み完了後にクラスを削除
            requestAnimationFrame(() => {
                document.documentElement.classList.remove("no-animation");
                isInitialMount = false;
            });
        }
    });
</script>

<slot />
