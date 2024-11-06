import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db/index.js"
import type { Role } from "./roles.js"

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:5173", // @TODO change this in prod
  ],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    // add role filed
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user" satisfies Role,
        input: false, // don't allow user to set role
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
})
