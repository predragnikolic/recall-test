import type { honoClient } from "~/utils/honoRpc"
import type { InferResponseType } from "hono"

type Book = InferResponseType<typeof honoClient.api.books.$get>['items'][number]


export function BookFormItem({book}: {
    book: Book
}) {
  return <div>{book.title}</div>
}
