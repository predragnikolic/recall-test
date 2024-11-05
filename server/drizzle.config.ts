import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  casing: "snake_case",
  schema: './src/db/schema/',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
});
