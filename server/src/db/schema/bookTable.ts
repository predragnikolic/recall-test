import { pgTable, uuid, timestamp,text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod"


export const bookTable = pgTable("book", {
    id: uuid().primaryKey().defaultRandom(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
    title: text().notNull(),
    price: integer().notNull(),
    description: text().notNull(),
});

export const insertBookSchema = createInsertSchema(bookTable).omit({
    id: true
})
export const bookSchema = createSelectSchema(bookTable)
