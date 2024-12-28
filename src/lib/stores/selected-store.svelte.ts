import type { ProjectCore } from '$types/core/project';
import type { ProjectId } from '$types/core/project-id';
import type { TaskListCore } from '$types/core/task-list';
import type { TaskListId } from '$types/core/task-list-id';
import type { TaskCore } from '$src/types/core/task';
import type { TaskId } from '$src/types/core/task-id';
import type { SelectedState } from '$types/state/selected-state';
import { Daily, DailyUtil } from '$src/types/enum/daily';

// プロジェクトデータを$stateで管理
export const selectedState = $state<SelectedState>({
    daily: null,
    projectId: null,
    taskListId: null,
    taskId: null,
    subTaskId: null,
});

export function updateSelectedDaily(daily: Daily): void;
export function updateSelectedDaily(daily: string): void;
export function updateSelectedDaily(input: string | Daily): void {
    if (isDaily(input)) {
        selectedState.daily = input;
    } else if (typeof input === 'string') {
        selectedState.daily = DailyUtil.toDaily(input);
    } else if (typeof input === 'number') {
        selectedState.daily = DailyUtil.toDaily(input);
    } else {
        throw new Error('Invalid input type');
    }
}

function isDaily(input: any): input is Daily {
    return typeof input === 'number';
}

export function updateSelectedProject(project: string): void;
export function updateSelectedProject(projectId: ProjectId): void;
export function updateSelectedProject(project: ProjectCore): void;
export function updateSelectedProject(input: string | ProjectCore | ProjectId): void {
    if (isProject(input)) {
        selectedState.projectId = input.id;
    } else if (isProjectId(input)) {
        selectedState.projectId = input;
    } else if (typeof input === 'string') {
        selectedState.projectId = input as ProjectId;
    } else {
        throw new Error('Invalid input type');
    }
}

function isProjectId(input: any): input is ProjectId {
    return typeof input === 'string';
}

function isProject(input: any): input is ProjectCore {
    return typeof input === 'object' && 'id' in input;
}

export function updateSelectedTaskList(taskList: TaskListCore): void;
export function updateSelectedTaskList(taskListId: TaskListId): void;
export function updateSelectedTaskList(taskList: TaskListCore): void;
export function updateSelectedTaskList(input: string | TaskListCore | TaskListId): void {
    if (isTaskList(input)) {
        selectedState.taskListId = input.id;
    } else if (isTaskListId(input)) {
        selectedState.taskListId = input;
    } else if (typeof input === 'string') {
        selectedState.taskListId = input as TaskListId;
    } else {
        throw new Error('Invalid input type');
    }
}

function isTaskListId(input: any): input is TaskListId {
    return typeof input === 'string';
}

function isTaskList(input: any): input is TaskListCore {
    return typeof input === 'object' && 'id' in input;
}

export function updateSelectedTask(task: TaskCore): void;
export function updateSelectedTask(taskId: TaskId): void;
export function updateSelectedTask(task: TaskCore): void;
export function updateSelectedTask(input: string | TaskCore | TaskId): void {
    if (isTask(input)) {
        selectedState.taskId = input.id;
    } else if (isTaskId(input)) {
        selectedState.taskId = input;
    } else if (typeof input === 'string') {
        selectedState.taskId = input as TaskId;
    } else {
        throw new Error('Invalid input type');
    }
}

function isTaskId(input: any): input is TaskId {
    return typeof input === 'string';
}

function isTask(input: any): input is TaskCore {
    return typeof input === 'object' && 'id' in input;
}

export function updateSelectedSubTask(subTask: TaskCore): void;
export function updateSelectedSubTask(subTaskId: TaskId): void;
export function updateSelectedSubTask(subTask: TaskCore): void;
export function updateSelectedSubTask(input: string | TaskCore | TaskId): void {
    if (isTask(input)) {
        selectedState.subTaskId = input.id;
    } else if (isTaskId(input)) {
        selectedState.subTaskId = input;
    } else if (typeof input === 'string') {
        selectedState.subTaskId = input as TaskId;
    } else {
        throw new Error('Invalid input type');
    }
}
