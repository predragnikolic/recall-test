import { db } from "./index.js"
import { user } from "./schema/auth-schema.js"

async function runMod() {
  await db.update(user).set({ role: "admin" })
  process.exit(0)
}

runMod()
