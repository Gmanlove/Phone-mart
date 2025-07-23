import { cn } from "@/lib/utils"

export type CardProps = React.HTMLAttributes<HTMLDivElement>
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>
export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cn("p-4", className)}
      {...props}
    />
  )
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("p-4 border-b bg-gray-50 rounded-t-lg", className)}
      {...props}
    />
  )
}

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>
export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  )
}

export default Card
