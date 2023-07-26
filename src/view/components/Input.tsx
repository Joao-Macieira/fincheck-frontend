import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
  name: string;
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        className="bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] pt-4 text-gray-800 peer placeholder-shown:pt-0 focus:border-gray-800 outline-none transition-all"
        id={id ?? name}
        name={name}
        placeholder=" "
        {...props}
      />

      <label
        htmlFor={id ?? name}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>
    </div>
  )
}
