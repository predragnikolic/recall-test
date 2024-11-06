import { Button, Input, Pagination } from "@nextui-org/react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { DataNotFound } from "~/components/DataNotFound/DataNotFound"
import { SomethingBadHappen } from "~/components/SomethingBadHappen/SomethingBadHappen"
import { TopBar } from "~/components/TopBar/TopBar"
import { honoClient } from "~/utils/honoRpc"
import { useDebounce } from "~/utils/useDebounce"
import { usePagination } from "~/utils/usePagination"
import { useBooleanQueryParam, useQueryParam } from "~/utils/useQueryParams"
import { BookFormItem } from "./components/BookFormItem"

export default function AdminBooksPage() {
  const [showCreateForm, setShowCreateForm] = useBooleanQueryParam("showCreateForm")
  const [search, setSearch] = useQueryParam("search")
  const { currentPage, getTotalPages, limit, offset, setPage } = usePagination({
    limit: 12,
  })
  const debouncedSearch = useDebounce(search)

  const { data, status } = useQuery({
    queryKey: ["getBooks", offset, limit, debouncedSearch],
    queryFn: async () => {
      const res = await honoClient.api.books.$get({
        query: {
          offset: String(offset), // TODO if we can make offset number
          limit: String(limit), // TODO if we can make limit number
          search: debouncedSearch ?? undefined,
        },
      })
      return res.json()
    },
    placeholderData: keepPreviousData,
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
          <Button color="primary" className="uppercase ml-auto" onClick={() => setShowCreateForm(true)}>
            Add book
          </Button>
        }
      />

      {status === "error" && <SomethingBadHappen />}
      {status === "success" && (
        <div className="container mx-auto p-3 pt-8">
          <div>
            {showCreateForm && (
              <motion.div
                key={"new_product"}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "tween" }}
              >
                <BookFormItem isExpanded className="mb-3" onReset={() => setShowCreateForm(false)} onSave={() => setShowCreateForm(false)} />
              </motion.div>
            )}
            {data.items.map((book) => (
              <BookFormItem key={book.id} book={book} />
            ))}
          </div>
          <DataNotFound totalPageCount={data.totalCount} pageItemsCount={data.items.length} />

          <footer className="flex justify-center mt-4">
            {getTotalPages(data.totalCount) > 1 && (
              <Pagination page={currentPage} total={getTotalPages(data.totalCount)} onChange={(page) => setPage(page)} />
            )}
          </footer>
        </div>
      )}
    </section>
  )
}
