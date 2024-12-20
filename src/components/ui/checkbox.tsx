import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "border-primary focus-visible:ring-ring peer h-4 w-4 shrink-0 rounded-sm border shadow transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-orange-400 data-[state=checked]:bg-orange-400 data-[state=checked]:text-black data-[state=checked]:hover:border-orange-500 data-[state=checked]:hover:bg-orange-500 data-[state=checked]:focus-visible:ring-2 data-[state=checked]:focus-visible:ring-orange-500 data-[state=checked]:focus-visible:ring-offset-2 data-[state=checked]:focus-visible:ring-offset-orange-500",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <CheckIcon className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
