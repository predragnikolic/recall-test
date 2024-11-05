import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as authTables from './schema/auth-schema.js'

const schema = {
    ...authTables
} as const

export const db = drizzle(process.env.DATABASE_URL!, {
    schema,
    casing: "snake_case",
});
