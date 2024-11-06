import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"
import { publicRouter } from "./endpoints/public.js"
import { booksRouter } from "./endpoints/books.js"
import { logger } from "hono/logger"
import { appLogger } from "./utils/logger.js"
import { hc } from "hono/client"

const app = new Hono()
  .use(logger(appLogger))
  .use(
    "*",
    cors({
      origin: ["http://localhost:5173"], // @TODO change this in prod
      allowHeaders: ["Content-Type", "Authorization"],
      maxAge: 600,
      credentials: true,
      exposeHeaders: ["Content-Length"],
    }),
  )
  .route("/", publicRouter)
  .route("/api/books", booksRouter)

// global error handler
app.onError((err, c) => {
  if (err instanceof Error) appLogger.error(err.message, err.stack ?? "")
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse()
  }
  return c.json({ message: "Server Error" }, 500)
})

const port = 3000
serve({
  fetch: app.fetch,
  port,
})
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`)
export type AppType = typeof app

export const honoClient = hc<AppType>(`http://localhost:${port}`, {
  init: {
    credentials: "include",
  },
})
