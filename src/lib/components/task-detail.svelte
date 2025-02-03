<script lang="ts">
  import { ScrollArea } from "$ui/scroll-area";
  import { Calendar } from "$lib/components/ui/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "$lib/components/ui/popover";
  import type { Task } from "$types/components/task";
  import * as m from "$paraglide/messages";
  import {
    formatDateTimeHtml,
    getDueDateClass,
  } from "$src/lib/utils/datetimeFormat";
  import {
    toDateTime,
    toJsDate,
    type DateTime,
  } from "$src/types/primitive-extensions/date-time";
  import type { DateValue } from "@internationalized/date";
  import { createEventDispatcher } from "svelte";
  import { taskDetail } from "../stores/task-detail.svelte";
  const dispatch = createEventDispatcher<{
    update: { task: Task };
  }>();

  let task: Task | null = taskDetail;
  $: dueDate = task?.dueDate ?? null;
  $: dueDate_Date = task && task.dueDate ? toJsDate(task.dueDate) : null;
</script>

<ScrollArea class="h-full">
  <div class="p-4">
    {#if task}
      <h2 class="text-lg font-semibold mb-4">{task.name}</h2>
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">{task.description}</p>
        <div>
          <h3 class="text-sm font-medium mb-2">{m.due_date()}</h3>
          <Popover>
            <PopoverTrigger>
              <div class="cursor-pointer px-1">
                <p
                  class="text-sm hover:text-muted-foreground {getDueDateClass(
                    dueDate
                  )}"
                >
                  {@html formatDateTimeHtml(dueDate)}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={5} class="w-[280px] p-0">
              <Calendar
                type="single"
                weekStartsOn={0}
                value={dueDate?.value}
                onValueChange={(date) => {
                  if (date && task) {
                    task = { ...task, dueDate: toDateTime(date) };
                    dispatch("update", { task });
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {#if task.tags && task.tags.length > 0}
          <div>
            <h3 class="text-sm font-medium mb-2">タグ</h3>
            <div class="flex flex-wrap gap-2">
              {#each task.tags as tag}
                <span class="text-xs bg-muted px-2 py-1 rounded"
                  >{tag.name}</span
                >
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <div class="text-center text-muted-foreground mt-8">
        タスクを選択してください
      </div>
    {/if}
  </div>
</ScrollArea>
