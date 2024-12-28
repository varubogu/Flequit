import { z } from 'zod';
import { TaskSchema, } from '$src/types/components/task';
import { TaskListSchema } from './task-list';

export const TaskListviewTasksSchema = TaskListSchema.extend({
    tasks: z.array(TaskSchema),
});

export type TaskListviewTasks = z.infer<typeof TaskListviewTasksSchema>;
