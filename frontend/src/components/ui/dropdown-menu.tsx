"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

const DropdownMenuContext = React.createContext<{ open: boolean, setOpen: (open: boolean) => void } | undefined>(undefined);

export function DropdownMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className={cn("relative inline-block text-left", className)} {...props} />
    </DropdownMenuContext.Provider>
  );
}

const useDropdownMenu = () => {
  const context = React.useContext(DropdownMenuContext);
  if (context === undefined) {
    throw new Error('useDropdownMenu must be used within a DropdownMenu');
  }
  return context;
};

export function DropdownMenuTrigger({ className, asChild = false, ...props }: React.HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen } = useDropdownMenu();
  const Comp = asChild ? Slot : "button";
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    />
  );
}

export function DropdownMenuContent({ className, align = "start", ...props }: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }) {
  const { open } = useDropdownMenu();
  
  if (!open) return null;
  
  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuItem({ className, inset, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}
