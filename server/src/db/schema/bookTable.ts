import { pgTable, uuid, timestamp, text, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

const BOOK_STATUSES = ["available", "hidden"] as const
export type BookStatus = (typeof BOOK_STATUSES)[number]

export const bookTable = pgTable("book", {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: text().notNull(),
  price: integer().notNull(), // $100.50 is stored like 10050 (in cents)
  description: text().notNull(),
  status: text().notNull().$type<BookStatus>().default("available"),
})

export const insertBookSchema = createInsertSchema(bookTable, {
  status: z.enum(BOOK_STATUSES),
}).omit({
  id: true,
})
export type InsertBook = z.infer<typeof insertBookSchema>
export const bookSchema = createSelectSchema(bookTable, {
  status: z.enum(BOOK_STATUSES),
})
