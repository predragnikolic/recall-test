import assert from "assert"
import { honoClient } from "../index.js"
import { before, describe, it } from "node:test"
import type { InsertBook } from "../db/schema/bookTable.js"
import { auth } from "../utils/auth.js"
import { db } from "../db/index.js"

let authCookie = {}

const getAuthCookie = async () => {
  const loginResponse = await auth.api.signInEmail({
    body: {
      email: "idmpepe@gmail.com",
      password: "password123",
    },
    asResponse: true,
  })
  const setCookieHeader = loginResponse.headers.get("set-cookie")
  if (!setCookieHeader) return {}
  return {
    headers: {
      Cookie: setCookieHeader.split(";")[0],
    },
  }
}

describe("booksRouter Endpoints", () => {
  before(async () => {
    authCookie = await getAuthCookie()
  })

  it("GET /api/books - should return status 200", async () => {
    const res = await honoClient.api.books.$get(
      {
        query: {},
      },
      authCookie,
    )
    assert.strictEqual(res.status, 200)
  })

  it("GET /api/books/:id - should return status 200 for valid id", async () => {
    const book = await db.query.bookTable.findFirst()
    const bookId = book?.id
    assert(bookId, "bookId must exist")
    const res = await honoClient.api.books[":id"].$get({ param: { id: bookId } }, authCookie)
    assert.strictEqual(res.status, 200)
  })

  it("POST /api/books - should return status 200 on successful creation", async () => {
    const newBookData: InsertBook = {
      title: "New Book",
      description: "Some desciption",
      price: 1000,
      status: "available",
    }
    const res = await honoClient.api.books.$post({ json: newBookData }, authCookie)
    assert.strictEqual(res.status, 200)
  })

  it("PUT /api/books/:id - should return status 200 on successful update", async () => {
    const book = await db.query.bookTable.findFirst()
    const bookId = book?.id
    assert(bookId, "bookId must exist")
    const updatedBook: InsertBook = {
      title: "New Book",
      description: "Some desciption",
      price: 1000,
      status: "available",
    }
    const res = await honoClient.api.books[":id"].$put({ param: { id: bookId }, json: updatedBook }, authCookie)
    assert.strictEqual(res.status, 200)
  })
})
