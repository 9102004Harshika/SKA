import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast";
import { useToast } from "./use-toast"; // Hook to manage the toasts

export function Toaster() {
  const { toasts } = useToast(); // Get the list of toasts from the hook

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast
          key={id}
          variant={variant}
          title={title}
          description={description}
          action={action}
          {...props}
          style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 10px 30px 10px" }}
        >
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action && action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
