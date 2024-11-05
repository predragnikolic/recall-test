import { Progress } from "@nextui-org/react"
import { useIsFetching } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { classNames } from "~/utils/classNames"

type Props = {
  rightContent?: ReactNode
  centerContent?: ReactNode
  leftContent?: ReactNode
  className?: string
}
export function TopBar({ rightContent, leftContent, centerContent, className = "" }: Props) {
  const isFetching = useIsFetching()

  return (
    <section className={classNames("sticky top-0 z-30 transparent backdrop-blur", className)}>
      <header
        className={classNames(
          "container mx-auto flex items-center gap-4",
          Boolean(rightContent || centerContent || leftContent) && "h-[70px] px-4 pt-4",
        )}
      >
        <section className="grow md:basis-0 whitespace-nowrap flex">{leftContent}</section>
        <section className="grow md:basis-0 whitespace-nowrap flex">{centerContent}</section>
        <section className="grow md:basis-0 whitespace-nowrap flex">{rightContent}</section>
      </header>
      <Progress
        size="sm"
        radius="sm"
        aria-label="network-progress"
        classNames={{
          base: "w-full px-4 mt-4",
          track: "drop-shadow-md",
          indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        isIndeterminate={Boolean(isFetching)}
      />
    </section>
  )
}
