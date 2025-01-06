<script lang="ts">
  import { Checkbox } from "$ui/checkbox";
  import { Card } from "$ui/card";
  import { Calendar } from "$ui/calendar";
  import { Popover, PopoverContent, PopoverTrigger } from "$ui/popover";
  import { buttonVariants } from "$ui/button";
  import { cn } from "$lib/utils";
  import {
    formatDateTimeHtml,
    getDueDateClass,
  } from "$src/lib/utils/datetimeFormat";
  import {
    toDateTime,
    toDateValue,
    type DateTime,
  } from "$src/types/primitive-extensions/date-time";
  import { updateSearchParams } from "$lib/stores/selected-store.svelte";
  import type { TaskTree } from "$src/types/tree/task";
  import type { DateValue } from "@internationalized/date";

  let { task, onUpdate, onSelect } = $props<{
    task: TaskTree;
    onUpdate: (task: TaskTree) => void;
    onSelect: (task: TaskTree) => void;
  }>();

  let _task = $state(task);
  let dueDate: DateTime | null = $derived(_task?.dueDate ?? null);
  let dueDateValue: DateValue | undefined = $derived(dueDate ? toDateValue(dueDate) : undefined);
</script>

<Card class=""
  onclick={() => {
    updateSearchParams({
      selectedTask: task.id,
    });
  }}>
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
              !_task?.dueDate && "text-muted-foreground",
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
              value={dueDateValue}
              onValueChange={(date) => {
                if (date) {
                  _task.dueDate = toDateTime(date);
                } else {
                  _task.dueDate = null;
                }
              }}
            />
          </PopoverContent>
        </div>
      </Popover>
    </div>
  </div>
</Card>
