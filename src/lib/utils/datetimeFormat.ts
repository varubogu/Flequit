import type { DateTime } from "$src/types/primitive-extensions/date-time";
import { toJsDate } from "$src/types/primitive-extensions/date-time";

export function formatDateTimeHtml(
    date: DateTime | null,
    options?: { showTime?: boolean; breakLine?: boolean },
): string | null {
    if (!date) return "期限なし";

    if (options?.showTime) {
        return options.breakLine ? _formatDateTimeHtml(date) : _formatDateTime(date);
    }
    return _formatDate(date);
}

export function getDueDateClass(dueDate: DateTime | null): string | null {
    if (!dueDate) return null;
    const now = new Date();
    const dueJsDate = toJsDate(dueDate);
    if (!dueJsDate) {
        return null;
    }

    const expiredColor = "text-red-500";
    const notExpiredColor = "text-blue-500";
    if (dueDate.isTimeEmpty) {
        const dueDate = new Date(
            dueJsDate.getFullYear(),
            dueJsDate.getMonth() + 1,
            dueJsDate.getDate(),
            23, 59, 59, 999,
        );
        console.log("dueDate", dueDate);
        console.log("now", now);
        return dueDate < now ? expiredColor : notExpiredColor;
    }
    return dueJsDate < now ? expiredColor : notExpiredColor;
}

function _formatDate(date: DateTime): string | null {
    const jsDate = toJsDate(date);
    if (!jsDate) {
        return null;
    } else {
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        }).format(jsDate);
    }
}

function _formatDateTime(date: DateTime): string | null {
    const jsDate = toJsDate(date);
    if (!jsDate) {
        return null;
    } else {
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
        minute: 'numeric'
        }).format(jsDate);
    }
}

function _formatDateTimeHtml(date: DateTime): string | null {
    const jsDate = toJsDate(date);
    if (!jsDate) {
        return null;
    } else {
        const dateStr = new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        }).format(jsDate);

        const timeStr = new Intl.DateTimeFormat('ja-JP', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(jsDate);

        return `${dateStr}<br/>${timeStr}`;
    }
}
