import { useNoInitialEffect } from "./useNoInitialEffect"
import { useQueryParam } from "./useQueryParams"
import { useState } from "react"

type Configuration = {
  limit?: number
}
export function usePagination(options?: Configuration) {
  const limit = options?.limit ?? 10

  const [pageQuery, setPageQuery] = useQueryParam("page")
  const numberPageQuery = pageQuery ? Number(pageQuery) : 1

  const [currentPage, setPage] = useState(numberPageQuery)

  const offset = (currentPage - 1) * limit

  useNoInitialEffect(() => {
    setPageQuery(currentPage)
  }, [currentPage, setPageQuery])

  const getTotalPages = (itemsCount: number) => Math.ceil(itemsCount / limit)

  return {
    /** Current page starts from 1 and above. */
    currentPage,
    setPage,
    limit,
    offset,
    getTotalPages,
  }
}
