import { z } from 'zod';
import { ProjectIdSchema } from '$types/core/project-id';
import { TaskListIdSchema } from '$types/core/task-list-id';
import { TaskIdSchema } from '$types/core/task-id';
import { DailySchema } from '$types/enum/daily';

export const selectedStateSchema = z.object({
    daily: DailySchema.nullable(),
    projectId: ProjectIdSchema.nullable(),
    taskListId: TaskListIdSchema.nullable(),
    taskId: TaskIdSchema.nullable(),
    subTaskId: TaskIdSchema.nullable(),
});

export type SelectedState = z.infer<typeof selectedStateSchema>;

