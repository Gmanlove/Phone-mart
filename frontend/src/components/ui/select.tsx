import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select className={cn("block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none", className)} {...props}>
      {children}
    </select>
  )
}

export interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}
export function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  return (
    <div className={cn("border rounded-md px-3 py-2 cursor-pointer", className)} {...props}>
      {children}
    </div>
  )
}

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {}
export function SelectValue({ className, children, ...props }: SelectValueProps) {
  return (
    <span className={cn("text-sm", className)} {...props}>
      {children}
    </span>
  )
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export function SelectContent({ className, children, ...props }: SelectContentProps) {
  return (
    <div className={cn("absolute mt-1 w-full rounded-md bg-white shadow-lg z-50", className)} {...props}>
      {children}
    </div>
  )
}

export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}
export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <option className={cn("text-sm px-3 py-2", className)} {...props}>
      {children}
    </option>
  )
}
