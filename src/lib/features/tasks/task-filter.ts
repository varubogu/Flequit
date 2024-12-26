import type { Task } from "$types/components/task";

export function filterTasksByDate(tasks: Task[], filterType: string): Task[] {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    switch (filterType) {
        case "today":
            return tasks.filter((task) => isTaskDueOn(task, today));
        case "tomorrow":
            return tasks.filter((task) => isTaskDueOn(task, tomorrow));
        case "week":
            return tasks.filter((task) => isTaskDueInRange(task, today, nextWeek));
        case "inbox":
            return tasks.filter((task) => !task.dueDate);
        default:
            return [];
    }
}

function isTaskDueOn(task: Task, date: Date): boolean {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate.value.toString());
    const taskDay = new Date(
        taskDate.getFullYear(),
        taskDate.getMonth(),
        taskDate.getDate()
    );
    return taskDay.getTime() === date.getTime();
}

function isTaskDueInRange(task: Task, start: Date, end: Date): boolean {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate.value.toString());
    const taskDay = new Date(
        taskDate.getFullYear(),
        taskDate.getMonth(),
        taskDate.getDate()
    );
    return taskDay >= start && taskDay < end;
}