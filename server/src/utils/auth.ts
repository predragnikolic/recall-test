import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";

 
export const auth = betterAuth({
    trustedOrigins: [
        'http://localhost:5173' // @TODO change this in prod
    ],
    emailAndPassword: {  
        enabled: true

    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    })
});
