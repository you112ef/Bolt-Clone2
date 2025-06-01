import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { classNames } from '~/utils/classNames';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bolt-elements-borderColor disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-bolt-elements-background text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-2',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline:
          'border border-bolt-elements-borderColor bg-transparent hover:bg-bolt-elements-background-depth-2 hover:text-bolt-elements-textPrimary text-bolt-elements-textPrimary dark:border-bolt-elements-borderColorActive',
        secondary:
          'bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-2',
        ghost: 'hover:bg-bolt-elements-background-depth-1 hover:text-bolt-elements-textPrimary',
        link: 'text-bolt-elements-textPrimary underline-offset-4 hover:underline',
        'neon-purple': 'bg-[var(--neon-purple)] text-white hover:bg-[color-mix(in_srgb,_var(--neon-purple)_90%,_black)]',
        'neon-blue': 'bg-[var(--neon-blue)] text-white hover:bg-[color-mix(in_srgb,_var(--neon-blue)_90%,_black)]',
        'outline-neon-purple':
          'border border-[var(--neon-purple)] text-[var(--neon-purple)] hover:bg-[color-mix(in_srgb,_var(--neon-purple)_10%,_transparent)]',
        'outline-neon-blue':
          'border border-[var(--neon-blue)] text-[var(--neon-blue)] hover:bg-[color-mix(in_srgb,_var(--neon-blue)_10%,_transparent)]',
      },
      size: {
        default: 'min-h-[48px] px-4',
        sm: 'min-h-[48px] px-3 text-xs',
        lg: 'min-h-[48px] px-8',
        icon: 'h-[48px] w-[48px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  _asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, _asChild = false, ...props }, ref) => {
    return <button className={classNames(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
