import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../app/utils/cn';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  open: boolean;
  title: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
  onClose?(): void;
}

export function Modal({ children, title, rightAction, open, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
            'data-[state=open]:animate-overlay-show'
          )}
        />

        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[50] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none',
            'data-[state=open]:animate-content-show',
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button
              className='h-12 w-12 flex items-center justify-center outline-none'
              onClick={onClose}
            >
              <Cross2Icon className='w-6 h-6'/>
            </button>

            <span className='text-lg font-bold tracking-[-1px]'>
              {title}
            </span>

            <div className='h-12 w-12 flex items-center justify-center'>
              {rightAction}
            </div>
          </header>
          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
