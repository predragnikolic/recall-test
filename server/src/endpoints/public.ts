import { Hono } from "hono";
import { auth } from "../utils/auth.js";

export const publicRouter = new Hono()
	.get("/api/ping", (c) => {
		return c.text("Ok");
	})
	.get("/api/auth/*", (c) => auth.handler(c.req.raw))
	.post("/api/auth/*", (c) => auth.handler(c.req.raw));
