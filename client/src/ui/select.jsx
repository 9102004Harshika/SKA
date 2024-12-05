import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={`
      flex h-10 w-full items-center justify-between
      rounded-lg border-2 px-3 py-2
      text-sm font-bold text-blue-800 bg-transparent
      transition-all duration-150 ease-in-out
      outline-none focus:ring-2 focus:ring-blue-200 focus:border-none
      ${className}`}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <FaChevronDown className="h-4 w-4 opacity-70" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef(({ children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className="z-50 max-h-60 w-full rounded-md border bg-white shadow-md overflow-hidden"
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef(({ children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={`
      relative flex items-center py-2 pl-8 pr-2
      text-sm font-medium text-blue-800
      cursor-pointer select-none rounded-md
      hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200
      focus:bg-blue-100`}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <FaCheck className="h-4 w-4 text-blue-800" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectScrollUpButton = React.forwardRef((props, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className="flex items-center justify-center py-1 text-blue-800"
    {...props}
  >
    <FaChevronUp />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef((props, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className="flex items-center justify-center py-1 text-blue-800"
    {...props}
  >
    <FaChevronDown />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

export {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
