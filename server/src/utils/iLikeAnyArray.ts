import { sql } from "drizzle-orm"
import type { PgColumn } from "drizzle-orm/pg-core"

// Function to replicate ILIKE ANY(ARRAY[:...strArray])
export const ILikeAnyArray = (column: PgColumn, strArray: string[]) => {
  const finalSql = sql.join(strArray, sql.raw(", "))

  return sql`${column} ILIKE ANY(ARRAY[${finalSql}])`
}

export function createSearchArray(search: string): string[] {
  return search
    .toLowerCase()
    .trim()
    .replace(/  +/g, " ")
    .split(" ")
    .map((v) => `%${v}%`)
}
