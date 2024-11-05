import { Hono } from "hono";
import { auth } from "../utils/auth.js";
import { HTTPException } from "hono/http-exception";

export function createAuthRouter() {
	const app = new Hono<{
		Variables: {
			user: typeof auth.$Infer.Session.user;
			session: typeof auth.$Infer.Session.session;
		};
	}>();
	app.use("*", async (c, next) => {
		const session = await auth.api.getSession({ headers: c.req.raw.headers });
		if (!session) {
			throw new HTTPException(401, { message: "Unauthorized" });
		}
		c.set("user", session.user);
		c.set("session", session.session);
		return next();
	});
	return app;
}
