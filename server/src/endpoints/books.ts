import { createAuthRouter } from "./auth.js";

export const booksRouter = createAuthRouter()
booksRouter.get("/", (c) => {
    return c.text("hello authd");
});
