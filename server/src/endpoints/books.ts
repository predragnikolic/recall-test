import { z } from "zod";
import { createAuthRouter, onlyRoles } from "./auth.js";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db/index.js";
import { asc, eq, ilike } from "drizzle-orm";
import { bookTable, bookSchema, insertBookSchema } from "../db/schema/bookTable.js";
import { validate } from "../utils/validate.js";

export const booksRouter = createAuthRouter();
// GET books
booksRouter.get(
	"/",
	onlyRoles(["user", "admin"]),
	zValidator(
		"query",
		z.object({
			search: z.string().default(""),
			offset: z.coerce.number().default(0),
			limit: z.coerce.number().default(10),
		}),
	),
	async (c) => {
		const queryParams = c.req.valid("query");
		const whereOptions = queryParams.search
			? ilike(bookTable.title, queryParams.search)
			: undefined;

		const [books, totalCount] = await Promise.all([
			db.query.bookTable.findMany({
				where: whereOptions,
				orderBy: [asc(bookTable.title)],
				offset: queryParams.offset,
				limit: queryParams.limit,
			}),
			db.$count(bookTable, whereOptions),
		]);

		const responseSchema = z.object({
			items: z.array(bookSchema),
			totalCount: z.number(),
		});
		return c.json(
			validate(responseSchema, {
				items: books,
				totalCount,
			}),
		);
	},
);

// GET book
booksRouter.get(
	"/:id",
	onlyRoles(["user", "admin"]),
	zValidator(
		"param",
		z.object({
			id: z.string(),
		}),
	),
	async (c) => {
		const {id} = c.req.valid("param");
		const book = await db.query.bookTable.findFirst({
			where: eq(bookTable.id, id)
		})
		if (!book) return c.notFound()
		const responseSchema = z.object({
			book: bookSchema,
		});
		return c.json(
			validate(responseSchema, { book }),
		);
	},
);

// Update book
booksRouter.put(
	"/:id",
	onlyRoles(["admin"]),
	zValidator(
		"param",
		z.object({
			id: z.string(),
		}),
	),
	zValidator(
		"json",
		insertBookSchema,
	),
	async (c) => {
		const {id} = c.req.valid("param");
		const input = c.req.valid("json");
		await db.update(bookTable).set(input).where(eq(bookTable.id, id))
	},
);
