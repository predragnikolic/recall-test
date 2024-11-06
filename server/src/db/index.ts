import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import * as authTables from "./schema/auth-schema.js"
import * as bookTable from "./schema/bookTable.js"

const schema = {
  ...authTables,
  ...bookTable,
} as const

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
  casing: "snake_case",
})
