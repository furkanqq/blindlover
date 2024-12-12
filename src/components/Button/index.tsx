import { forwardRef, memo, useId } from 'react';

import { IconLoader } from '@/assets/IconLoader';
import { cn } from '@/utils/cn';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'border'
  | 'text'
  | 'ghost'
  | 'blue'
  | 'green'
  | 'login'
  | 'light'
  | 'close'
  | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  title: string;
  variant?: ButtonVariant | ButtonVariant[];
  size?: ButtonSize;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    type,
    title,
    variant = 'default',
    size = 'large',
    onClick,
    className,
    disabled = false,
    loading = false,
    children,
    ...attributes
  },
  ref
) {
  const id = useId();

  const variantStyles = cn(
    'px-4 py-2 text-[12px] flex justify-center items-center gap-2 rounded-md shadow-md focus:outline-none transition-colors duration-200 active:scale-[0.98]',
    {
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'blue',
      'bg-primaryColor text-white active:bg-primaryDisabled border border-solid border-primaryColor':
        variant === 'primary',
      'border border-solid border-primaryColor text-primaryColor active:bg-primaryDisabled active:text-white':
        variant === 'secondary',
      'border border-solid border-backgroundColor text-backgroundColor active:bg-primaryDisabled': variant === 'border',
      'bg-green-500 text-white hover:bg-green-600': variant === 'green',
      'bg-foreground text-backgroundColor border border-solid border-foreground': variant === 'dark',
      'bg-backgroundColor text-foreground border border-solid border-backgroundColor': variant === 'light',
      'bg-backgroundColor text-primaryColor border border-solid border-backgroundColor': variant === 'login',
      'bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600':
        variant === 'close',
      'px-4 py-2 text-[12px]': size === 'sm',
      'md:px-6 md:py-4 md:text-[14px]': size === 'md',
      'px-8 py-6 text-[16px]': size === 'lg',
    },
    className
  );

  return (
    <button
      ref={ref}
      id={id}
      type={type}
      title={title}
      aria-label={title}
      className={variantStyles}
      onClick={onClick}
      disabled={disabled || loading}
      {...attributes}
    >
      {loading ? <IconLoader className="animate-spin" /> : children}
    </button>
  );
});

export default memo(Button);
