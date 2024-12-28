import {
    CalendarDays,
    Inbox,
    Plus,
    Settings,
    HelpCircle,
    UserIcon,
    ChevronDown,
} from "lucide-svelte";
import { Daily } from "$src/types/enum/daily";

// デイリータスク
export const dailyItems = [
    {
        title: "今日",
        param: "today",
        paramValue: Daily.Today,
        icon: CalendarDays,
    },
    {
        title: "明日",
        param: "tomorrow",
        paramValue: Daily.Tomorrow,
        icon: CalendarDays,
    },
    {
        title: "今週",
        param: "week",
        paramValue: Daily.Week,
        icon: CalendarDays,
    },
    {
        title: "受信",
        param: "inbox",
        paramValue: Daily.Inbox,
        icon: Inbox,
    },
];