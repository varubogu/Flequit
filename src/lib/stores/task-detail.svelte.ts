import type { TaskDetailViewTasks } from '$src/types/components/taskdetailview-tasks';
import { Importance } from '$src/types/enum/importance';
import { Priority } from '$src/types/enum/priority';

const initialTaskDetail: TaskDetailViewTasks = {
    id: '',
    icon: '',
    name: '',
    description: '',
    importance: Importance.Low,
    priority: Priority.Low,
    dueDate: null,
    completeDate: null,
    completed: false,
    cycle: '',
    subTasks: []
}

let taskDetail = $state<TaskDetailViewTasks>(initialTaskDetail);

export function setTaskDetail(task: TaskDetailViewTasks) {
    Object.assign(taskDetail, task);
}

export { taskDetail };