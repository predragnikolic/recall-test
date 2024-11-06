import { rand, randNumber, randParagraph, randWord, toCollection } from "@ngneat/falso"
import { db } from "./index.js"
import { type InsertBook, type BookStatus, bookTable } from "./schema/bookTable.js"

async function run_seed() {
  await db.transaction(async (tx) => {
    const books: InsertBook[] = collection(
      () => ({
        title: `${randWord({ uppercase: true })} ${randWord({ uppercase: true })} ${randWord({ uppercase: true })}`,
        price: randNumber({ min: 100 * 1, max: 100 * 1000, precision: 100 }),
        description: randParagraph({ length: 10 }),
        status: rand(["available", "hidden"] satisfies BookStatus[]),
      }),
      { count: 100 },
    )
    await tx.insert(bookTable).values(books)
  })
}

run_seed()

export function collection<Collection = never>(generateCollection: () => Collection, options: { count: number }): Collection[] {
  return toCollection(generateCollection, {
    length: options.count,
  }) as Collection[]
}
