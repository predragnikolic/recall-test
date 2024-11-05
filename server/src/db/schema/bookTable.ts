import { pgTable, uuid, timestamp,text, integer } from "drizzle-orm/pg-core";

export const book = pgTable("book", {
    id: uuid().primaryKey().defaultRandom(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
    title: text().notNull(),
    price: integer().notNull(),
    description: text().notNull(),
});
