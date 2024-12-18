<script lang="ts">
    export let taskName: string;
    export let isCompleted: boolean;
    export let importance: string;
    export let priority: string;
    export let dueDate: string;

    function toggleCompletion() {
        isCompleted = !isCompleted;
    }
</script>

<div class="task" on:click={toggleCompletion}>
    <div class="completion-button" class:completed={isCompleted}></div>
    <span class={isCompleted ? 'completed-task' : ''}>{taskName}</span>
    <div class="task-details">
        <span>{importance}</span>
        <span>{priority}</span>
        <span>{dueDate}</span>
    </div>
</div>

<style>
    .task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .completion-button {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #007bff;
        margin-right: 10px;
        cursor: pointer;
    }
    .completion-button.completed {
        background-color: #007bff;
        background-image: url('checkmark.svg'); /* チェックマークの画像を指定 */
        background-size: cover;
    }
    .completed-task {
        text-decoration: line-through;
        color: #aaa;
    }
    .task-details {
        display: flex;
        gap: 10px;
    }
</style>
