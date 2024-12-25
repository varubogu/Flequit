<script lang="ts">
  import { Checkbox } from "$ui/checkbox";
  import { Card } from "$ui/card";
  import { Calendar } from "$ui/calendar";
  import { Popover, PopoverContent, PopoverTrigger } from "$ui/popover";
  import { buttonVariants } from "$ui/button";
  import { cn } from "$lib/utils";
  import type { Task } from "$types/components/task";
  import TaskCalendar from "./task-calendar.svelte";
  import {
    formatDateTimeHtml,
    getDueDateClass,
  } from "$src/lib/utils/datetimeFormat";
  import {
    toDateTime,
    toJsDate,
    toDateValue,
    type DateTime,
  } from "$src/types/primitive-extensions/date-time";

  export let task: Task;
  let dueDate: DateTime | null = null;
  let dueDate_Date: Date | null = null;
  $: dueDate = task?.dueDate ?? null;
  $: dueDate_Date = dueDate ? toJsDate(dueDate) : null;
</script>

<Card class="p-4 cursor-pointer hover:bg-muted/50">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      <Checkbox checked={task.completed} />
      <span class="text-sm font-medium">{task.name}</span>
    </div>
    <Popover>
      <PopoverTrigger
        class={cn(
          buttonVariants({
            variant: "outline",
            class: "p-3 justify-start text-right font-normal",
          }),
          !task.dueDate && "text-muted-foreground",
        )}
      >
        <span class="text-sm {getDueDateClass(dueDate)}">
          {@html formatDateTimeHtml(dueDate)}
        </span>
        <script>
          console.log(task.dueDate);
        </script>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={5} class="w-[280px] p-0">
        <Calendar
          type="single"
          weekStartsOn={0}
          value={dueDate ? toDateValue(dueDate) : undefined}
          onValueChange={(date) => {
            if (date) {
              task.dueDate = toDateTime(date);
            } else {
              task.dueDate = null;
            }
          }}
        />
      </PopoverContent>
    </Popover>
  </div>
</Card>
