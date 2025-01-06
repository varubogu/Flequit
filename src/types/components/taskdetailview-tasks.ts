import { z } from 'zod';
import { TaskSchema } from '$src/types/components/task';

export const TaskDetailViewTasksSchema = TaskSchema.extend({
    subTasks: z.array(TaskSchema),
});

export type TaskDetailViewTasks = z.infer<typeof TaskDetailViewTasksSchema>;
