import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost"
  size?: "icon" | "default"
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          variant === "outline"
            ? "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
            : variant === "ghost"
            ? "bg-transparent text-gray-900 hover:bg-gray-100"
            : "bg-blue-600 text-white hover:bg-blue-700",
          size === "icon" ? "w-10 h-10 p-0" : "",
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export default Button
