import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../app/utils/cn';

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return (
    <RadixDropdownMenu.Root>
      {children}
    </RadixDropdownMenu.Root>
  )
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RadixDropdownMenu.Trigger
      className='outline-none'
    >
      {children}
    </RadixDropdownMenu.Trigger>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  classname?: string
}

function DropdownMenuContent({ children, classname }: DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={
          cn(
            'p-2 rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade z-50',
            classname
          )
        }
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  )
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  classname?: string;
  onSelect?(): void;
}

function DropdownMenuItem({ children, classname, onSelect }: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'min-h-[40px] outline-none flex items-center px-4 py-2 text-sm text-gray-800 rounded-2xl data-[highlighted]:bg-gray-50 transition-colors cursor-pointer',
        classname,
      )}
    >
      {children}
    </RadixDropdownMenu.Item>
  )
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
