import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({ className, isLoading, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading ?? disabled}
      className={cn(
        "bg-teal-900 px-6 h-12 rounded-2xl text-white font-medium hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all",
        className
      )}
    />
  )
}
