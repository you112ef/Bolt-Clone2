import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { classNames } from '~/utils/classNames';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 shadow-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90', // Primary
        destructive: 'bg-red-500 text-white hover:bg-red-600', // Destructive - Assuming this should remain as is
        outline:
          'border border-border bg-transparent hover:bg-background hover:text-text text-text', // Outline - Using new color vars
        secondary:
          'bg-secondary text-text hover:bg-secondary/90', // Secondary - Changed text-white to text-text for better contrast
        ghost: 'text-primary hover:bg-primary/10 hover:text-primary', // Ghost - Added base text color
        link: 'text-primary underline-offset-4 hover:underline', // Link - Changed to primary color
      },
      size: {
        default: 'h-10 px-4 py-2', // Adjusted height for base spacing (8*5=40)
        sm: 'h-8 rounded-lg px-3 text-xs', // Adjusted height (8*4=32), rounded-lg for consistency
        lg: 'h-12 rounded-lg px-8', // Adjusted height (8*6=48)
        icon: 'h-10 w-10', // Adjusted height (8*5=40)
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
