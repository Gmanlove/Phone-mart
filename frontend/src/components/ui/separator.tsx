import * as React from "react"
import { cn } from "@/lib/utils"

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement>

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "h-px w-full bg-gray-200 my-4",
        className
      )}
      {...props}
    />
  )
)

Separator.displayName = "Separator"

export default Separator
