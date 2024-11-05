import { Hono } from "hono";
import { auth } from "../utils/auth.js";

export const publicRouter = new Hono();
publicRouter.get("/api/ping", (c) => {
    return c.text("Ok");
});
publicRouter.get("/api/auth/*", (c) => auth.handler(c.req.raw));
publicRouter.post("/api/auth/*", (c) => auth.handler(c.req.raw));
