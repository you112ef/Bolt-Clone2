import * as React from 'react';
import * as SliderPrimitives from '@radix-ui/react-slider';
import { classNames } from '~/utils/classNames'; // Assuming path

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitives.Root> {
  // Add any specific props if needed
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitives.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <SliderPrimitives.Root
    ref={ref}
    className={classNames(
      'relative flex w-full touch-none select-none items-center group', // group for thumb focus states
      className,
    )}
    {...props}
  >
    <SliderPrimitives.Track
      className={classNames(
        'relative h-1.5 w-full grow overflow-hidden rounded-full',
        // Use a mixed color for the track background for subtlety
        'bg-[color-mix(in_srgb,var(--boltdiy-secondary-bg)_80%,transparent)]',
      )}
    >
      <SliderPrimitives.Range
        className={classNames(
          'absolute h-full',
          'bg-[var(--boltdiy-accent-neon)]', // Active range color
        )}
      />
    </SliderPrimitives.Track>
    <SliderPrimitives.Thumb
      className={classNames(
        'block h-5 w-5 rounded-full border-2',
        'border-[var(--boltdiy-accent-neon)]', // Border for the thumb
        'bg-[var(--boltdiy-primary-bg)]', // Background of the thumb (contrasts with track/range)
        'ring-offset-[var(--boltdiy-primary-bg)]', // Offset for the focus ring
        'transition-colors',
        // Focus styles: neon glow
        'focus-visible:outline-none focus-visible:shadow-[0_0_8px_3px_var(--boltdiy-accent-neon)]',
        'disabled:pointer-events-none disabled:opacity-50',
      )}
    />
    {/* If multiple thumbs are needed, map over props.value.length for them if value is an array */}
  </SliderPrimitives.Root>
));
Slider.displayName = 'Slider (BoltDIY)';

export { Slider };
