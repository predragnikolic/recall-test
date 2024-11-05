import { Button, Input, Pagination, Tabs } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { Search } from "lucide-react"
import { DataNotFound } from "~/components/DataNotFound/DataNotFound"
import { SomethingBadHappen } from "~/components/SomethingBadHappen/SomethingBadHappen"
import { TopBar } from "~/components/TopBar/TopBar"
import { honoClient } from "~/utils/honoRpc"
import { useDebounce } from "~/utils/useDebounce"
import { usePagination } from "~/utils/usePagination"
import { useQueryParam } from "~/utils/useQueryParams"
import { BookFormItem } from "./components/BookFormItem"

export default function AdminBooksPage() {
  const [search, setSearch] = useQueryParam("search")
    const { currentPage, getTotalPages, limit, offset, setPage } = usePagination({
      limit: 12,
    })
  const debouncedSearch = useDebounce(search)

  const {data, status, error} = useQuery({
    queryKey: ['getBooks', offset, limit, debouncedSearch],
    queryFn: async () => {
      const res = await honoClient.api.books.$get({
        query: {
          offset: String(offset), // TODO if we can make offset number
          limit: String(limit), // TODO if we can make limit number
          search: debouncedSearch ?? undefined
        }
      })
      return res.json()
    }
  })
  
  return (
    <section>
      <TopBar
        centerContent={
          <Input
            onClear={() => setSearch("")}
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="max-w-[300px] mx-auto"
            startContent={<Search />}
          />
        }
        rightContent={
            <Button color="primary" className="uppercase ml-auto" > 
              Add book
            </Button>
        }
      />

      {status === "error" && <SomethingBadHappen />}
      {status === "success" && (
        <div className="container p-4">
          <AnimatePresence mode="popLayout">
              {data.items.map(book => <BookFormItem key={book.id} book={book} />)}
          </AnimatePresence>
          <DataNotFound totalPageCount={data.totalCount} pageItemsCount={data.items.length} />

          <footer className="flex justify-center mt-4">
            {getTotalPages(data.totalCount) > 1 && (
              <Pagination
                page={currentPage}
                total={getTotalPages(data.totalCount)}
                onChange={(page) => setPage(page)}
              />
            )}
          </footer>
        </div>
      )}
    </section>
  )
}
