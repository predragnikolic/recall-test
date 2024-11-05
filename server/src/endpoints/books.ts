import { z } from "zod";
import { createAuthRouter, onlyRoles } from "./auth.js";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db/index.js";
import { asc, ilike } from "drizzle-orm";
import { book, bookSchema } from "../db/schema/bookTable.js";
import { validate } from "../utils/validate.js";

export const booksRouter = createAuthRouter();
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
			? ilike(book.title, queryParams.search)
			: undefined;

		const [books, totalCount] = await Promise.all([
			db.query.book.findMany({
				where: whereOptions,
				orderBy: [asc(book.title)],
				offset: queryParams.offset,
				limit: queryParams.limit,
			}),
			db.$count(book, whereOptions),
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
