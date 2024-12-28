
import { z } from "zod";

export enum Daily {
  Today = "today",
  Tomorrow = "tomorrow",
  Week = "week",
  Month = "month",
  Year = "year",
  Inbox = "inbox",
}

export const DailySchema = z.nativeEnum(Daily);

export class DailyUtil {
  static toDaily(value: number): Daily | null;
  static toDaily(value: string): Daily | null;
  static toDaily(input: string | number): Daily | null {
    if (typeof input === 'string') {
      const result = DailySchema.safeParse(input);
      return result.success ? result.data : null;
    } else if (typeof input === 'number') {
      const result = DailySchema.safeParse(input);
      return result.success ? result.data : null;
    } else {
      return null;
    }
  }

  static fromDaily(value: Daily): string {
    return DailySchema.parse(value);
  }
}
