import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variant === "secondary"
          ? "bg-gray-200 text-gray-700"
          : "bg-blue-600 text-white",
        className
      )}
      {...props}
    />
  )
}

export default Badge