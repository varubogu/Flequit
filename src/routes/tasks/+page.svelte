<script lang="ts">
  import TaskDetail from "$lib/components/task-detail.svelte";
  import TaskList from "$lib/components/task-list.svelte";
</script>

<div class="h-screen flex">
  <!-- タスクリスト -->
  <TaskList />
  <!-- タスク詳細 -->
  <div class="flex-1 bg-muted/30 relative flex flex-col">
    <TaskDetail />
  </div>
</div>
