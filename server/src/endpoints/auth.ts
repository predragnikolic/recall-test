import { Hono } from "hono"
import { auth } from "../utils/auth.js"
import { HTTPException } from "hono/http-exception"
import { createFactory } from "hono/factory"
import type { Role } from "../utils/roles.js"

export function createAuthRouter() {
  const app = new Hono<{
    Variables: {
      user: typeof auth.$Infer.Session.user
      session: typeof auth.$Infer.Session.session
    }
  }>()
  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })
    if (!session) {
      throw new HTTPException(401, { message: "Unauthorized" })
    }
    c.set("user", session.user)
    c.set("session", session.session)
    return next()
  })
  return app
}

const factory = createFactory<{
  Variables: {
    user: typeof auth.$Infer.Session.user
    session: typeof auth.$Infer.Session.session
  }
}>()

export const onlyRoles = (roles: Role[]) =>
  factory.createMiddleware(async (c, next) => {
    const role = c.get("user").role as Role
    if (!roles.includes(role)) {
      throw new HTTPException(403, { message: "Forbidden" })
    }
    await next()
  })
