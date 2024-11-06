import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import * as authTables from "./schema/auth-schema.js"
import * as bookTable from "./schema/bookTable.js"

const schema = {
  ...authTables,
  ...bookTable,
} as const

export const db = getDataSource()

function getDataSource() {
  if (process.env.NODE_ENV === "test") {
    // if (!process.env.DATABASE_URL || !process.env.TEST_DATABASE_URL)
    //   throw new Error("Please first specify the DATABASE_URL and the TEST_DATABASE_URL.")
    // if (process.env.TEST_DATABASE_URL === process.env.DATABASE_URL)
    //   throw new Error("TEST_DATABASE_URL cannot be the same as DATABASE_URL.")
    const db = drizzle({
      schema,
      logger: false,
      casing: "snake_case",
      connection: {
        connectionString: process.env.DATABASE_URL, // TODO change for a test database and drop before
        allowExitOnIdle: true, // TODO: when running tests this should close it, but it doesn't
      },
    })
    return db
  }
  // if NOT testing environment
  return drizzle(process.env.DATABASE_URL!, {
    schema,
    casing: "snake_case",
  })
}
