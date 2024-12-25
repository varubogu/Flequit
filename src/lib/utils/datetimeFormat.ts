import type { DateTime } from "$src/types/primitive-extensions/date-time";
import { toJsDate } from "$src/types/primitive-extensions/date-time";

export function formatDateTimeHtml(date: DateTime | null, options?: { showTime?: boolean; breakLine?: boolean }): string {
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
    } else {
        return dueJsDate < now ? "text-red-500" : "text-blue-500";
    }
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
