import { useState } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Popover } from './Popover';

import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  error?: string;
  className?: string;
}

export function DatePickerInput({ className, error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
       <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 outline-none transition-all text-left relative pt-4',
              error && '!border-red-900',
              className,
            )}
          >
            <span className="text-gray-700 text-xs left-[13px] top-2 pointer-events-none absolute">
              Data
            </span>

            <span className="">
              {formatDate(selectedDate)}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={date => setSelectedDate(date)} />
        </Popover.Content>
       </Popover.Root>

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
}
