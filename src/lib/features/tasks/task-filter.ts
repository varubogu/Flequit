import type { Task } from "$types/components/task";

export function filterTasksByDate(tasks: Task[], filterType: string): Task[] {
    console.log('Filtering tasks:', tasks, 'with filter:', filterType);
    const now = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const filtered = tasks.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        switch (filterType) {
            case 'today':
                const isToday = dueDate.getTime() === today.getTime();
                console.log('Task:', task.title, 'due:', dueDate, 'isToday:', isToday);
                return isToday;
            case 'tomorrow':
                const isTomorrow = dueDate.getTime() === tomorrow.getTime();
                console.log('Task:', task.title, 'due:', dueDate, 'isTomorrow:', isTomorrow);
                return isTomorrow;
            case 'week':
                const isThisWeek = dueDate >= today && dueDate <= weekEnd;
                console.log('Task:', task.title, 'due:', dueDate, 'isThisWeek:', isThisWeek);
                return isThisWeek;
            case 'inbox':
                return true;
            default:
                return false;
        }
    });

    console.log('Filtered result:', filtered);
    return filtered;
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