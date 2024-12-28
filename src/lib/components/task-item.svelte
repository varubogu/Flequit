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
    toDateValue,
  } from "$src/types/primitive-extensions/date-time";

  let { task, onUpdate } = $props<{
    task: Task;
  }>();

  let dueDate = $derived(task?.dueDate ?? null);
</script>

<Card class="">
  <div class="cursor-pointer hover:bg-muted/50 p-4" role="button">
    <div class="flex items-center justify-between">
      <Checkbox class="p-2 rounded-full w-4 h-4" checked={task.completed} />
      <span class="w-full p-2 text-sm font-medium">{task.name}</span>
      <Popover>
        <div>
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
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={5} class="w-[280px] p-0">
            <Calendar
              type="single"
              weekStartsOn={0}
              value={dueDate ? toDateValue(dueDate) : undefined}
              onValueChange={(date) => {
                if (date && date !== dueDate) {
                  task.dueDate = toDateTime(date);
                } else {
                  task.dueDate = null;
                }
              }}
            />
          </PopoverContent>
        </div>
      </Popover>
    </div>
  </div>
</Card>
