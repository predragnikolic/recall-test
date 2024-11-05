import { SearchSlash } from "lucide-react"

type Props = {
  totalPageCount: number
  pageItemsCount: number
}
/**
 * UI to show when there are no data.
 */
export function DataNotFound({ totalPageCount, pageItemsCount }: Props) {
  return (
    totalPageCount === 0 &&
    pageItemsCount === 0 && (
      <div className="w-full text-3xl font-thin flex flex-col items-center my-9">
        <SearchSlash size={90} strokeWidth={0.3} className="fadeIn translate-y-1  " />
        <span
          className="fadeIn"
          style={{
            animationFillMode: "both",
            animationDelay: "0.1s",
          }}
        >
          No results
        </span>
      </div>
    )
  )
}
