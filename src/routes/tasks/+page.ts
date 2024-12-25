import type { Task } from "$types/task";
import type { PageLoad } from "./$types";

// 初期データ
const initialData = {
  taskList: {
    id: "1",
    name: "メインタスクリスト",
    icon: "📝",
    url: "/tasks",
    tasks: [
      {
        id: "task-1",
        name: "タスク1",
        description: "昨日までに完了すべきタスク",
        importance: 3,
        priority: 5,
        dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 昨日
        completeDate: new Date().toISOString(),
        completed: false,
        cycle: "once",
        tags: [
          { id: "tag-1", name: "重要" },
          { id: "tag-2", name: "期限切れ" }
        ],
        url: "/tasks/task-1"
      },
      {
        id: "task-2",
        name: "タスク2",
        description: "明日までのタスク",
        importance: 2,
        priority: 3,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 明日
        completeDate: new Date().toISOString(),
        completed: false,
        cycle: "once",
        tags: [
          { id: "tag-3", name: "通常" }
        ],
        url: "/tasks/task-2"
      }
    ]
  }
};

export const load = (async () => {
  // 将来的にはここでAPIからデータを取得する
  return {
    taskList: initialData.taskList
  };
}) satisfies PageLoad;