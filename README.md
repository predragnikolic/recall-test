# Getting started

Clone this ```
git clone git@github.com:predragnikolic/recall-test.git
cd recall-test
npm install
```

1. Create `.env` files in `frontend`. Take a look at `frontend/.env.example` 
2. Create `.env` files in `server`. Take a look at `server/.env.example` 
-  Create a Postgres Database. Give it a name `book_store` and update the `.env` `DATABASE_URL`.
-  Put any string for `BETTER_AUTH_SECRET`, or use this command to generate it `echo -n any string | shasum -a 256 | awk '{ print $1 }'`
3. Run db migrations `cd server && npm run db:migrate` (Optinally you can seed the database by running `npm run db:seed` in the server folder)
4. Start both apps in development `npm run dev` ,or start them separably `cd server && npm run dev` and `cd frontend && npm run dev`.

Apps:
Store - http://localhost:5173/ 
Admin - http://localhost:5173/admin

> [!NOTE]
> For the admin app you need to have a user with admin role. First create a regular user http://localhost:5173/sign-in, than in the server folder run `db:unsafe:make-all-users-admins`

