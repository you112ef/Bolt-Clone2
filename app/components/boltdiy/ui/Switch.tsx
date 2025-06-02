import { memo } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch'; // Corrected import alias
import { classNames } from '~/utils/classNames'; // Assuming path

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  // Keep existing props if they are just pass-throughs, or redefine as needed.
  // className, checked, onCheckedChange are already part of ComponentPropsWithoutRef.
}

export const Switch = memo(({ className, ...props }: SwitchProps) => {
  return (
    <SwitchPrimitives.Root
      className={classNames(
        'group relative h-[24px] w-[44px] cursor-pointer rounded-full', // Dimensions for touch-friendliness
        'transition-colors duration-200 ease-in-out',
        'bg-[var(--boltdiy-secondary-bg)]', // Unchecked background
        'data-[state=checked]:bg-[var(--boltdiy-accent-neon)]', // Checked background
        // Focus styles - using shadow for glow similar to other boltdiy components
        'focus-visible:outline-none focus-visible:shadow-[0_0_6px_2px_var(--boltdiy-accent-neon)]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props} // Pass all props including checked and onCheckedChange
    >
      <SwitchPrimitives.Thumb
        className={classNames(
          'pointer-events-none block h-[20px] w-[20px] rounded-full',
          'bg-[var(--boltdiy-primary-text)]', // Thumb color - white on dark/oled, dark on light
                                                // This might need adjustment if primary-text doesn't contrast well with accent-neon
                                                // Or use a fixed color like #FFFFFF for dark themes, #000000 for light themes if --boltdiy-primary-text is not suitable.
                                                // For now, assuming --boltdiy-primary-text provides good contrast or will be handled by theme variables.
          'shadow-lg', // Basic shadow for depth
          'ring-0 transition-transform duration-200 ease-in-out',
          'translate-x-[2px]', // Initial position for unchecked state (2px from left)
          'data-[state=checked]:translate-x-[22px]', // Position for checked state (44px total width - 20px thumb - 2px right padding)
          'will-change-transform',
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = 'Switch (BoltDIY)';
