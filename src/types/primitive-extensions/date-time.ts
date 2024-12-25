import {
    type DateValue,
    type CalendarDate,
    type CalendarDateTime,
    parseDate,
    parseDateTime,
    CalendarDateTime as CalendarDateTimeClass
} from "@internationalized/date";
import { z } from "zod";

export const DateTimeSchema = z.object({
    value: z.union([
        z.custom<CalendarDate>(),
        z.custom<CalendarDateTime>()
    ]),
    isTimeEmpty: z.boolean()
});

export type DateTime = z.infer<typeof DateTimeSchema>;

function normalizeISOString(dateString: string): { datePart: string; timePart?: string } {
    try {
        // 日付と時刻を分割
        const [datePart, timePart] = dateString.split(/\s+|T/);

        if (!datePart) {
            throw new Error('Invalid date format');
        }

        // 日付部分のバリデーション（YYYY-MM-DD）
        if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
            throw new Error('Invalid date format');
        }

        // 時刻部分がある場合
        if (timePart) {
            // 時刻部分のバリデーション（HH:mm:ss）
            const timeMatch = timePart.match(/^(\d{2}:\d{2}:\d{2})/);
            if (!timeMatch) {
                throw new Error('Invalid time format');
            }
            return { datePart, timePart: timeMatch[1] };
        }

        // 時刻部分がない場合は日付のみを返す
        return { datePart };
    } catch {
        throw new Error(`Invalid date string format: ${dateString}`);
    }
}

export function toDateTime(dateString: string): DateTime;
export function toDateTime(date: Date): DateTime;
export function toDateTime(date: DateValue): DateTime;
export function toDateTime(date: string | Date | DateValue): DateTime {
    if (typeof date === 'string') {
        try {
            const { datePart, timePart } = normalizeISOString(date);
            if (timePart) {
                // 日付と時刻を別々に解析してから結合
                const calendarDate = parseDate(datePart);
                const [hours, minutes, seconds] = timePart.split(':').map(Number);
                const value = new CalendarDateTimeClass(
                    calendarDate.calendar,
                    calendarDate.era,
                    calendarDate.year,
                    calendarDate.month,
                    calendarDate.day,
                    hours,
                    minutes,
                    seconds
                );
                return {
                    value,
                    isTimeEmpty: false
                };
            } else {
                const calendarDate = parseDate(datePart);
                return {
                    value: calendarDate,
                    isTimeEmpty: true
                };
            }
        } catch (e) {
            console.error('Failed to parse date:', e);
            throw e;
        }
    } else if (date instanceof Date) {
        return toDateTime(date.toISOString().split('.')[0]); // ミリ秒を除去
    } else {
        if ('timeZone' in date) {
            throw new Error('ZonedDateTime is not supported');
        }

        const value = date as CalendarDate | CalendarDateTime;
        const isTime = 'hour' in value;
        return { value, isTimeEmpty: !isTime };
    }
}

export function toJsDate(dateTime: DateTime): Date | null {
    if (dateTime?.value) {
        const isoString = dateTime.value.toString();
        return new Date(isoString);
    }
    return null;
}

export function toDateValue(dateTime: DateTime): DateValue {
    return dateTime.value;
}

export function toString(dateTime: DateTime): string {
    return dateTime.value.toString();
}

export function toHtml(dateTime: DateTime): string {
    return toString(dateTime);
}

export function toBreakLineHtml(dateTime: DateTime): string {
    const hasTime = dateTime.isTimeEmpty && 'hour' in dateTime.value && 'minute' in dateTime.value;
    if (hasTime) {
        const date = dateTime.value.toString().split('T')[0];
        const time = dateTime.value.toString().split('T')[1];
        return `${date}<br/>${time}`;
    } else {
        return dateTime.value.toString();
    }
}
