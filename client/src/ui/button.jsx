// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cva } from "class-variance-authority";

// import { cn } from "../libs/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-background hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-secondary",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: "hover:bg-secondary hover:text-black",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-md px-3",
//         lg: "h-11 rounded-md px-8",
//         icon: "h-10 w-10",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// const Button = React.forwardRef(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button, buttonVariants };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../libs/utils";

const buttonVariants = cva(
  "button relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold uppercase cursor-pointer text-[#0f1923] transition-all duration-150 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-[#0f1923] text-[#fff] hover:bg-[#ff4655]",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="button_text">{props.children}</span>
        <span className="button_sl absolute top-0 bottom-[-1px] left-[-8px] w-0 bg-[#ff4655] skew-x-[-15deg] transition-all duration-200 ease"></span>
        <span className="button_lg absolute inset-0 bg-[#0f1923]">
          <span className="absolute top-0 left-0 w-[2px] h-[2px] bg-[#0f1923]"></span>
          <span className="absolute bottom-0 right-0 w-[4px] h-[4px] bg-[#0f1923] transition-all duration-200 ease"></span>
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
