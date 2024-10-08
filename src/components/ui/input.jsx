import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, children, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {children && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
          {children}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
