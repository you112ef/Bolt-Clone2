import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { classNames } from '~/utils/classNames'; // Assuming this path is valid or adjust if needed

// For multiple buttons, ensure 6px margin (var(--boltdiy-spacing)) between them.
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm transition-all duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60',
  // Base classes: transition-all, duration-200, ease-out for hover/active effects
  // disabled:opacity-60 is a bit more visible than 50
  // focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--boltdiy-accent-neon)] // Example focus ring
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--boltdiy-button-bg)]',
          'text-[var(--boltdiy-button-text)]',
          'font-[var(--boltdiy-font-family)]',
          'font-[var(--boltdiy-font-weight-medium)]', // Using medium weight
          'rounded-[8px]', // 8px border radius
          'border border-transparent', // Default no border, or 'border-[var(--boltdiy-accent-neon)]'
          // Hover and active states
          'hover:filter hover:brightness(1.15)', // Increase brightness slightly more
          'active:filter active:brightness(0.9) active:scale-[0.97]', // Slightly more pronounced active state
          // Add focus state with glowing outline (if not using ring)
          'focus-visible:shadow-[0_0_8px_2px_var(--boltdiy-accent-neon)] focus-visible:border-[var(--boltdiy-accent-neon)]',
        ],
        // Other variants like 'outline', 'ghost' can be added later if needed for bolt.diy
        // For now, only 'default' is implemented as per subtask focus.
        // destructive: '...',
        // outline: 'border border-[var(--boltdiy-accent-neon)] text-[var(--boltdiy-accent-neon)] hover:bg-[hsla(var(--boltdiy-accent-neon-hsl),0.1)]',
      },
      size: {
        default: 'min-h-[40px] min-w-[40px] px-[calc(var(--boltdiy-spacing)_*_2)]', // 12px padding
        sm: 'min-h-[40px] min-w-[40px] px-[var(--boltdiy-spacing)] text-xs', // 6px padding
        lg: 'min-h-[40px] min-w-[40px] px-[calc(var(--boltdiy-spacing)_*_3)]', // 18px padding
        icon: 'h-[40px] w-[40px] p-0 flex items-center justify-center', // Ensure padding is 0 for true icon button
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
  _asChild?: boolean; // Keep if using Radix Slot for composition
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, _asChild = false, ...props }, ref) => {
    // const Component = _asChild ? Slot : 'button'; // Keep if using Radix Slot
    return (
      <button // Or <Component> if using Slot
        className={classNames(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button (BoltDIY)'; // Changed display name

export { Button, buttonVariants };
