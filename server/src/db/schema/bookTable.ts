import { pgTable, uuid, timestamp,text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod";

const BOOK_STATUSES = ['available', 'hidden'] as const
type BookStatus = typeof BOOK_STATUSES[number]

export const bookTable = pgTable("book", {
    id: uuid().primaryKey().defaultRandom(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
    title: text().notNull(),
    price: integer().notNull(),
    description: text().notNull(),
    status: text().notNull().$type<BookStatus>().default('available'),
});

export const insertBookSchema = createInsertSchema(bookTable, {
    status: z.enum(BOOK_STATUSES)
}).omit({
    id: true
})
export const bookSchema = createSelectSchema(bookTable,{
    status: z.enum(BOOK_STATUSES)
})
