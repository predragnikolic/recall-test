import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { publicRouter } from "./endpoints/public.js";
import { booksRouter } from "./endpoints/books.js";
import { logger } from 'hono/logger'
import { appLogger } from "./utils/logger.js";

const app = new Hono();
app.use(logger(appLogger))
app.use(
	"*",
	cors({
		origin: ["http://localhost:5173"], // @TODO change this in prod
		credentials: true,
	}),
);

app.route("/", publicRouter);
app.route("/api/books", booksRouter);

// global error handler
app.onError((err, c) => {
	if (err instanceof Error) appLogger.error(err.message, err.stack ?? "")
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse()
  }
  return c.json({message: 'Server Error'}, 500)
})

const port = 3000;
serve({
	fetch: app.fetch,
	port,
});
console.log(`Server is running on http://localhost:${port}`);
