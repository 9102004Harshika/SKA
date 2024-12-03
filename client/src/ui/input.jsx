import * as React from "react";
import { cn } from "../libs/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg ring-2 ring-primary border border-input bg-background px-3 placeholder:text-primary py-2 text-sm ring-offset-background file:border-0 file:bg-background file:text-primary file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:shadow-md focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
