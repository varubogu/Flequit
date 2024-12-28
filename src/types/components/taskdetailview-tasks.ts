import { z } from 'zod';
import { TaskSchema } from '$src/types/components/task';

export const TaskDetailviewTasksSchema = TaskSchema.extend({
    subTasks: z.array(TaskSchema),
});

export type TaskDetailviewTasks = z.infer<typeof TaskDetailviewTasksSchema>;
