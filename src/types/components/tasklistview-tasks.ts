import { z } from 'zod';
import { TaskSchema, } from '$src/types/components/task';
import { TaskListSchema } from './task-list';

export const TaskListViewTasksSchema = TaskListSchema.extend({
    tasks: z.array(TaskSchema),
});

export type TaskListViewTasks = z.infer<typeof TaskListViewTasksSchema>;
