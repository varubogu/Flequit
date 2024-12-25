<script lang="ts">
  import { ScrollArea } from "$ui/scroll-area";
  import { Calendar } from "$ui/calendar";
  import { Popover, PopoverContent, PopoverTrigger } from "$ui/popover";
  import type { Task } from "$types/task";
  import * as m from "$paraglide/messages";
  import { formatDate } from '$lib/utils/dateUtils';

  export let task: Task | null = null;
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
                <p class="text-sm hover:text-muted-foreground">
                  {formatDate(task.dueDate)}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={5}
              class="w-[280px] p-0"
            >
              <Calendar
                weekStartsOn={0}
                selected={new Date(task.dueDate)}
                mode="single"
                onSelect={(date) => date && (task.dueDate = date.toISOString())}
              />
            </PopoverContent>
          </Popover>
        </div>
        {#if task.tags && task.tags.length > 0}
          <div>
            <h3 class="text-sm font-medium mb-2">タグ</h3>
            <div class="flex flex-wrap gap-2">
              {#each task.tags as tag}
                <span class="text-xs bg-muted px-2 py-1 rounded">{tag.name}</span>
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
