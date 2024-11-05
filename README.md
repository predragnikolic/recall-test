# Getting started

1. Install dependencies `cd frontend && npm i && ../server ** npm i`.
2. Create `.env` files in `frontend`. Take a look at `frontend/.env.example` 
3. Create `.env` files in `server`. Take a look at `server/.env.example` 
-  Create a Postgres Database. Give it a name `book_store` and update the `.env` `DATABASE_URL`.
-  Put any string for `BETTER_AUTH_SECRET`, or use this command to generate it `echo -n any string | shasum -a 256 | awk '{ print $1 }'`
4. Run db migrations `cd server && npm run db:migrate`
5. Start apps in development `cd server && npm run dev` and `cd frontend && npm run dev`.
