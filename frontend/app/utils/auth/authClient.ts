import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000", // the base url of your auth server
    plugins: [inferAdditionalFields({ // Extend User with Role https://www.better-auth.com/docs/concepts/database#extending-core-schema
      user: {
        role: {
          type: "string",
          required: false,
        }
      }
  })],
})
