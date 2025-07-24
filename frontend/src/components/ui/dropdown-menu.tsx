
import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

const DropdownMenuContext = React.createContext<{ open: boolean, setOpen: (open: boolean) => void } | undefined>(undefined);

export function DropdownMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className={cn("relative", className)} {...props} />
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ className, asChild, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const context = React.useContext(DropdownMenuContext);
  const Comp = asChild ? Slot : "button";
  if (!context) return null;
  return (
    <Comp
      className={cn("", className)}
      {...props}
      onClick={e => {
        context.setOpen(!context.open);
        if (props.onClick) props.onClick(e);
      }}
    />
  );
}

type DropdownMenuContentProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'center' | 'end';
};

export function DropdownMenuContent({ className, align = 'end', ...props }: DropdownMenuContentProps) {
  const context = React.useContext(DropdownMenuContext);
  if (!context || !context.open) return null;
  
  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  };
  
  return <div className={cn("absolute mt-2 w-48 rounded-md bg-white shadow-lg z-50", alignmentClasses[align], className)} {...props} />;
}

export function DropdownMenuItem({ className, asChild, ...props }: React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn("px-4 py-2 cursor-pointer hover:bg-gray-100", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-1 h-px bg-gray-200 w-full", className)} {...props} />;
}
