import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-3 hover:scale-105 justify-center transition ease-in-out whitespace-nowrap duration-200 rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white shadow ",
        outline:
          "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-primary",
        secondary: "bg-slate-100 text-primary shadow-sm hover:bg-slate-100/80",
        ghost: "bg-transparent text-primary hover:text-white hover:bg-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      full: {
        true: "w-full flex-1",
      },
      size: {
        default: "md:p-3 p-2 text-base font-bold",
        icon: "",
      },
      rounded: {
        default: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, as, ...props }, ref) => {
    const Comp = as ? as : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
