import { z } from "zod";

export enum Importance {
  Low = 0,
  Medium = 1,
  High = 2,
}

export const ImportanceSchema = z.nativeEnum(Importance);

export class ImportanceUtil {
  static toImportance(value: number): Importance {
    return ImportanceSchema.parse(value);
  }

  static fromImportance(value: Importance): number {
    return ImportanceSchema.parse(value);
  }
}
