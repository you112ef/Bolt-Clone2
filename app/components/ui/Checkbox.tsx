import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { classNames } from '~/utils/classNames';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={classNames(
      'peer h-4 w-4 shrink-0 rounded-sm border transition-colors',
      'bg-transparent', // Simplified, dark handled by variable if needed
      'border-border', // Updated border color
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-primary focus-visible:ring-offset-background', // Updated focus and ring offset colors
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary', // Updated checked background color
      'data-[state=checked]:border-primary', // Updated checked border color
      'data-[state=checked]:text-white',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = 'Checkbox';

export { Checkbox };
