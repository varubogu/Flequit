import { z } from "zod";

export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export const PrioritySchema = z.nativeEnum(Priority);

export class PriorityUtil {
  static toPriority(value: number): Priority {
    return PrioritySchema.parse(value);
  }

  static fromPriority(value: Priority): number {
    return PrioritySchema.parse(value);
  }
}
