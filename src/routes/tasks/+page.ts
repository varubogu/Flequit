import type { PageLoad } from "./$types";
import { toDateTime } from "$types/primitive-extensions/date-time";
import { Importance } from "$types/enum/importance";
import { Priority } from "$types/enum/priority";
import { updateProjectTaskTree } from "$lib/stores/project-task-tree.svelte";
import { updateProjects } from "$lib/stores/sidebar-projects.svelte";
import type { ProjectTree } from "$types/tree/project-tree";
import type { SidebarProjects } from "$types/components/sidebar-projects";


export const load = (async () => {
  // 将来的にはここでAPIからデータを取得する
  const data = await initialData();

  // プロジェクトデータをストアに登録
  updateProjectTaskTree(data.projects as ProjectTree[]);
  updateProjects(data.projects as SidebarProjects[]);

  // 呼び出し元で終了検知のため空オブジェクトを返す
  return {};
}) satisfies PageLoad;



// 初期ダミーデータ
const initialData = async (): Promise<any> => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  return {
    projects: [
      {
        id: "main",
        name: "メインタスクリストｄ",
        icon: "📝",
        taskLists: [
          {
            id: "main-list",
            name: "すべてのタスク",
            icon: "📝",
            tasks: [
              {
                id: "task-1",
                icon: "📝",
                name: "今日期限のタスク1",
                description: "今日中に完了すべきタスク",
                importance: Importance.High,
                priority: Priority.High,
                dueDate: toDateTime(today),
                completeDate: null,
                completed: false,
                cycle: "once",
                tags: [
                  { id: "tag-1", name: "重要" }
                ]
              },
              {
                id: "task-2",
                icon: "📝",
                name: "明日期限のタスク",
                description: "明日までのタスク",
                importance: Importance.Medium,
                priority: Priority.Medium,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
                tags: [
                  { id: "tag-2", name: "通常" }
                ]
              },
              {
                id: "task-3",
                icon: "📝",
                name: "期限昨日のタスク",
                description: "昨日までのタスク",
                importance: Importance.Low,
                priority: Priority.Low,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
                tags: [
                  { id: "tag-3", name: "通常" }
                ]
              },
              {
                id: "task-4",
                icon: "📝",
                name: "3日後のタスク",
                description: "3日後のタスク",
                importance: Importance.Low,
                priority: Priority.Low,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
              },
              {
                id: "task-5",
                icon: "📝",
                name: "4日後のタスク",
                description: "4日後のタスク",
                importance: Importance.Low,
                priority: Priority.Low,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
              },
              {
                id: "task-6",
                icon: "📝",
                name: "5日後のタスク",
                description: "5日後のタスク",
                importance: Importance.Low,
                priority: Priority.Low,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
              },
              {
                id: "task-7",
                icon: "📝",
                name: "6日後のタスク",
                description: "6日後のタスク",
                importance: Importance.Low,
                priority: Priority.Low,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
              },
              {
                id: "task-8",
                icon: "📝",
                name: "7日後のタスク",
                description: "7日後のタスク",
                importance: Importance.Low,
                priority: Priority.Low,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
              },
              {
                id: "task-9",
                icon: "📝",
                name: "8日後のタスク",
                description: "8日後のタスク",
                importance: Importance.Low,
                priority: Priority.Low,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
              },
            ]
          }
        ]
      },
      {
        id: "project-1",
        name: "仕事",
        icon: "💼",
        taskLists: [
          {
            id: "list-1",
            name: "進行中のタスク",
            icon: "🏃",
            tasks: [
              {
                id: "project1-task1",
                icon: "📊",
                name: "四半期レポートの作成",
                description: "Q4の業績レポートを作成する",
                importance: Importance.High,
                priority: Priority.High,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
                tags: [{ id: "tag-3", name: "レポート" }],
                subTasks: [
                  {
                    id: "project1-task1-sub1",
                    icon: "📈",
                    name: "データ収集",
                    description: "各部署からのデータを収集",
                    importance: Importance.High,
                    priority: Priority.High,
                    dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999)),
                    completeDate: null,
                    completed: false,
                    cycle: "once"
                  },
                  {
                    id: "project1-task1-sub2",
                    icon: "📊",
                    name: "グラフ作成",
                    description: "収集したデータからグラフを作成",
                    importance: Importance.Medium,
                    priority: Priority.Medium,
                    dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 23, 59, 59, 999)),
                    completeDate: null,
                    completed: false,
                    cycle: "once"
                  }
                ]
              }
            ]
          },
          {
            id: "list-2",
            name: "今週の予定",
            icon: "📅",
            tasks: [
              {
                id: "project1-task2",
                icon: "👥",
                name: "週次ミーティング",
                description: "チームの週次ミーティング",
                importance: Importance.Medium,
                priority: Priority.Medium,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "weekly",
                tags: [{ id: "tag-4", name: "ミーティング" }]
              }
            ]
          }
        ]
      },
      {
        id: "project-2",
        name: "個人",
        icon: "🏠",
        taskLists: [
          {
            id: "list-3",
            name: "買い物リスト",
            icon: "🛒",
            tasks: [
              {
                id: "project2-task1",
                icon: "📝",
                name: "週末の買い物",
                description: "スーパーで食材を購入",
                importance: Importance.Low,
                priority: Priority.Low,
                dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 23, 59, 59, 999)),
                completeDate: null,
                completed: false,
                cycle: "once",
                tags: [{ id: "tag-5", name: "買い物" }],
                subTasks: [
                  {
                    id: "project2-task1-sub1",
                    icon: "🥕",
                    name: "野菜",
                    description: "にんじん、じゃがいも、玉ねぎ",
                    importance: Importance.Low,
                    priority: Priority.Low,
                    dueDate: toDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 23, 59, 59, 999)),
                    completeDate: null,
                    completed: false,
                    cycle: "once"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};