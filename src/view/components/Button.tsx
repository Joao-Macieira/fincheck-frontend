import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
}

export function Button({ className, isLoading, disabled, children, variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading ?? disabled}
      className={cn(
        "bg-teal-900 px-6 h-12 rounded-2xl text-white font-medium hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center",
        variant === 'danger' && "bg-red-900 hover:bg-red-800",
        variant === 'ghost' && "bg-transparent text-gray-800 border border-gray-800 hover:bg-gray-800/5",
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  )
}
