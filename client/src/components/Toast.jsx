import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"; // Importing icons

import { cn } from "../libs/utils"; // Utility for conditional class names

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden p-3 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        success:
          "border-l-8 border-primary bg-background text-primary", // Success toast styles with border color
        info:
          "border-l-8 border-secondary bg-background text-secondary", // Info toast styles with border color
        warning:
          "border-l-8 border-accent bg-background text-accent", // Warning toast styles with border color
        destructive:
          "border-l-8 border-error bg-background text-error", // Error toast styles with border color
      },
    },
    defaultVariants: {
      variant: "info", // Default variant
    },
  }
);


const Toast = React.forwardRef(
  ({ className, variant, title, description, action, ...props }, ref) => {
    const isSmallContent = !title || !description; // Determine if content is small

    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {/* Icon for different variants */}
        {variant === "destructive" && (
          <AlertCircle
            className={cn(
              "flex-shrink-0",
              isSmallContent ? "h-5 w-5 ml-2" : "h-6 w-6 mr-1"
            )}
          />
        )}
        {variant === "success" && (
          <CheckCircle
            className={cn(
              "flex-shrink-0 text-primary",
              isSmallContent ? "h-5 w-5 ml-2" : "h-6 w-6 mr-1"
            )}
          />
        )}
        {variant === "info" && (
          <Info
            className={cn(
              "flex-shrink-0 text-secondary",
              isSmallContent ? "h-5 w-5 ml-2" : "h-6 w-6 mr-1"
            )}
          />
        )}
        {variant === "warning" && (
          <AlertTriangle
            className={cn(
              "flex-shrink-0 text-accent",
              isSmallContent ? "h-5 w-5 ml-2" : "h-6 w-6 mr-1"
            )}
          />
        )}
        {/* Toast Content */}
        <div className="flex flex-col gap-1">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription variant={variant}>{description}</ToastDescription>
        </div>
        {action && action}
        <ToastClose variant={variant} />
      </ToastPrimitives.Root>
    );
  }
);
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastClose = React.forwardRef(({ className, variant, ...props }, ref) => {
  let closeButtonColor = "text-gray-600"; // Default close button color
  let focusRingColor = "focus:ring-gray-200"; // Default focus ring color

  // Set colors based on the variant
  switch (variant) {
    case "success":
      closeButtonColor = "text-primary"; // Success variant close button color
      focusRingColor = "focus:ring-primary"; // Success focus ring
      break;
    case "info":
      closeButtonColor = "text-secondary"; // Info variant close button color
      focusRingColor = "focus:ring-secondary"; // Info focus ring
      break;
    case "warning":
      closeButtonColor = "text-accent"; // Warning variant close button color
      focusRingColor = "focus:ring-accent"; // Warning focus ring
      break;
    case "destructive":
      closeButtonColor = "text-error"; // Destructive variant close button color
      focusRingColor = "focus:ring-error"; // Destructive focus ring
      break;
    default:
      break;
  }

  return (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 opacity-100 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2",
        closeButtonColor,
        focusRingColor,
        className
      )}
      {...props}
    >
      <X className="h-5 w-5" />
    </ToastPrimitives.Close>
  );
});
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef(({ className, variant, ...props }, ref) => {
  let descriptionClass = "text-sm opacity-80"; // Default description styling
  switch (variant) {
    case "success":
      descriptionClass = "text-primary text-sm"; // Success variant
      break;
    case "info":
      descriptionClass = "text-secondary text-sm"; // Info variant
      break;
    case "warning":
      descriptionClass = "text-accent text-sm"; // Warning variant
      break;
    case "destructive":
      descriptionClass = "text-error text-sm"; // Destructive variant
      break;
    default:
      break;
  }

  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn(descriptionClass, className)}
      {...props}
    />
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
