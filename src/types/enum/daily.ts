import { z } from "zod";

export enum Daily {
  Today = "today",
  Tomorrow = "tomorrow",
  ThreeDaysLater = "threeDaysLater",
  Week = "week",
  Month = "month",
  Year = "year",
  Inbox = "inbox",
}

export const DailySchema = z.nativeEnum(Daily);

export class DailyUtil {
  static parse(value: number): Daily | null;
  static parse(value: string): Daily | null;
  static parse(input: string | number): Daily | null {
    if (typeof input === "string") {
      const result = DailySchema.safeParse(input);
      return result.success ? result.data : null;
    } else if (typeof input === "number") {
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
