import { Button, Card, CardBody, Popover, PopoverContent, PopoverTrigger, Tab, Tabs, Tooltip } from "@nextui-org/react"

export const BOOK_STATUSES = ["available", "hidden"] as const
export type BookStatus = (typeof BOOK_STATUSES)[number]

export const bookStatusToLabel: Record<
  BookStatus,
  {
    label: string
    description: string
    color: "success" | "warning" | "default"
  }
> = {
  hidden: {
    label: "Hidden",
    description: "The book will not be visible in the store",
    color: "warning",
  },
  available: {
    label: "Available",
    description: "The book will be visible in the store",
    color: "default",
  },
}
type Props = {
  value: BookStatus
  onChange: (v: BookStatus) => void
}
export function BookStatusPopover({ value, onChange }: Props) {
  const selectedStatus = bookStatusToLabel[value]
  return (
    <Popover placement="bottom" offset={10}>
      <PopoverTrigger>
        <Button size="sm" variant="flat" className="uppercase text-[11px] w-[130px]" color={selectedStatus.color}>
          <Tooltip content="Book Status">{selectedStatus.label}</Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] pt-3">
        <Tabs selectedKey={value} color={selectedStatus.color} onSelectionChange={(e) => onChange(e as BookStatus)}>
          {BOOK_STATUSES.map((status) => (
            <Tab key={status} title={bookStatusToLabel[status].label} className="w-full">
              <Card className="text-center">
                <CardBody className="text-center">{bookStatusToLabel[status].description}</CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
