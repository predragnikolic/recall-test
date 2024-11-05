import { TriangleAlert } from "lucide-react"

export function SomethingBadHappen() {
  return (
    <div className="w-full text-3xl font-thin flex flex-col items-center my-9">
      <TriangleAlert size={90} strokeWidth={0.3} />
      <p className="mb-1">Error</p>
      <p className="text-medium">Please, try again later.</p>
    </div>
  )
}
