import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { placeholder, name, id, error, className, ...props },
  ref,
) => {
  return (
    <div className="relative">
      <input
        {...props}
        id={id ?? name}
        ref={ref}
        name={name}
        placeholder=" "
        className={cn(
          'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] pt-4 text-gray-800 peer placeholder-shown:pt-0 focus:border-gray-800 outline-none transition-all',
          className,
          error && '!border-red-900'
        )}
      />

      <label
        htmlFor={id ?? name}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">
          {error}
        </span>
        </div>
      )}
    </div>
  )
});

Input.displayName = 'Input';
