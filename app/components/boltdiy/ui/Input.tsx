import * as React from 'react';
import { classNames } from '~/utils/classNames'; // Assuming path

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={classNames(
          'min-h-[40px]',
          'w-full', // Take full width by default
          'bg-[var(--boltdiy-input-bg)]',
          'text-[var(--boltdiy-input-text)]',
          'border', // Add base border class
          'border-[var(--boltdiy-input-border)]',
          'rounded-[8px]', // Consistent rounded corners
          'px-[calc(var(--boltdiy-spacing)_*_2)]', // 12px padding horizontal
          'py-[calc(var(--boltdiy-spacing)_*_1.5)]', // 9px padding vertical (9+9+14+2 = 34, needs adjustment for 40px height)
                                                  // Let's adjust py for a 40px height.
                                                  // Target inner height (content + vertical padding) = 40px - 2px (border) = 38px.
                                                  // If font-size is 14px (var(--boltdiy-font-size-min)),
                                                  // then vertical padding needed = (38px - 14px) / 2 = 12px per side.
                                                  // So, py should be calc(var(--boltdiy-spacing) * 2).
          'py-[calc(var(--boltdiy-spacing)_*_2)]', // Adjusted: 12px vertical padding
          'font-[var(--boltdiy-font-family)]',
          'text-[var(--boltdiy-font-size-min)]', // Ensure this var is used, e.g., text-sm or equivalent if not direct var
          'focus:outline-none focus:shadow-[0_0_6px_1px_var(--boltdiy-accent-neon)]', // Subtle glow
          'placeholder:text-[color-mix(in_srgb,var(--boltdiy-input-text)_60%,transparent)]',
          'disabled:cursor-not-allowed disabled:opacity-60', // From original, good to keep
          className, // Allow overriding/extending classes
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input (BoltDIY)';

export { Input };
