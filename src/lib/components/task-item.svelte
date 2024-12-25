<script lang="ts">
  import { Checkbox } from "$ui/checkbox";
  import { Card } from "$ui/card";
  import { Calendar } from "$ui/calendar";
  import { Popover, PopoverContent, PopoverTrigger } from "$ui/popover";
  import { buttonVariants } from "$ui/button";
  import { cn } from "$lib/utils";
  import type { Task } from "$types/components/task";
  import TaskCalendar from "./task-calendar.svelte";

  export let task: Task;
  let contentRef: HTMLElement | null = null;
  let dueDate: Date | null = null;
  $: dueDate = task.dueDate ? new Date(task.dueDate) : null;

  function formatDate(date: Date): string {
    return new Date(date).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  function formatTime(date: Date): string {
    return new Date(date).toLocaleString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<Card class="p-4 cursor-pointer hover:bg-muted/50">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      <Checkbox
        checked={task.completed}
        on:click={(e) => e.stopPropagation()}
      />
      <span class="text-sm font-medium">{task.name}</span>
    </div>
    <Popover>
      <PopoverTrigger
        class={cn(buttonVariants({
          variant: "outline",
          class: "w-[180px] justify-start text-left font-normal"
        }),
        !task.dueDate && "text-muted-foreground"
        )}
      >
        <span
          class="text-sm"
          class:text-red-500={dueDate < new Date()}
          class:text-blue-500={dueDate > new Date()}
        >
          {formatDate(dueDate)}
        </span>
        <script>
          console.log(task.dueDate);
        </script>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={5}
        class="w-[280px] p-0"
      >
        <TaskCalendar bind:task={task} />
      </PopoverContent>
    </Popover>
  </div>
</Card>