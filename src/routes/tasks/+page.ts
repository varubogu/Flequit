import type { Task } from "$types/components/task";
import type { PageLoad } from "./$types";
import { toDateTime } from "$types/primitive-extensions/date-time";
import { Importance } from "$types/enum/importance";
import { Priority } from "$types/enum/priority";
import type { Project } from "$types/components/project";

// 初期データ
const initialData = {
  taskList: {
    id: "1",
    name: "メインタスクリスト",
    icon: "📝",
    tasks: [
      {
        id: "task-1",
        icon: "📝",
        name: "タスク1",
        description: "昨日までに完了すべきタスク",
        importance: Importance.High,
        priority: Priority.High,
        dueDate: toDateTime(new Date(Date.now() - 24 * 60 * 60 * 1000)),
        completeDate: toDateTime(new Date()),
        completed: false,
        cycle: "once",
        tags: [
          { id: "tag-1", name: "重要" },
          { id: "tag-2", name: "期限切れ" }
        ]
      },
      {
        id: "task-2",
        icon: "📝",
        name: "タスク2",
        description: "明日までのタスク",
        importance: Importance.Medium,
        priority: Priority.Medium,
        dueDate: toDateTime(new Date(Date.now() + 24 * 60 * 60 * 1000)),
        completeDate: toDateTime(new Date()),
        completed: false,
        cycle: "once",
        tags: [
          { id: "tag-3", name: "通常" }
        ]
      }
    ]
  },
  projects: [
    {
      id: "1",
      name: "Project 1",
      icon: "🏠",
      taskLists: [
        {
          id: "1",
          name: "Task List 1",
          icon: "🏠",
          tasks: []
        },
        {
          id: "2",
          name: "Task List 2",
          icon: "🏠",
          tasks: []
        }
      ]
    },
    {
      id: "2",
      name: "Project 2",
      icon: "🏢",
      taskLists: [
        {
          id: "3",
          name: "Task List 3",
          icon: "📝",
          tasks: []
        }
      ]
    }
  ]
};

export const load = (async () => {
  // 将来的にはここでAPIからデータを取得する
  return initialData;
}) satisfies PageLoad;