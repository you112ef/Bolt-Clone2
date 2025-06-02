import * as React from 'react';
import * as DropdownMenuPrimitives from '@radix-ui/react-dropdown-menu';
import { classNames } from '~/utils/classNames'; // Assuming path
// It might be good to import the BoltDIY Button if the trigger is always a button
// import { Button as BoltDiyButton } from './Button';

interface DropdownProps extends DropdownMenuPrimitives.DropdownMenuProps {
  trigger: React.ReactNode; // Trigger can be any ReactNode
  align?: DropdownMenuPrimitives.DropdownMenuContentProps['align'];
  sideOffset?: DropdownMenuPrimitives.DropdownMenuContentProps['sideOffset'];
  // children is already part of DropdownMenuProps
}

export const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitives.Item
    ref={ref}
    className={classNames(
      'relative flex cursor-pointer select-none items-center rounded-[var(--boltdiy-spacing)]', // 6px radius for items
      'px-[calc(var(--boltdiy-spacing)_*_2)] py-[var(--boltdiy-spacing)]', // 12px horizontal, 6px vertical padding
      'text-sm outline-none transition-colors',
      'font-[var(--boltdiy-font-family)]',
      'text-[var(--boltdiy-primary-text)]', // Default text color
      // Focus/hover state for items
      'data-[highlighted]:bg-[var(--boltdiy-accent-neon)] data-[highlighted]:text-[var(--boltdiy-accent-neon-text)]',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  />
));
DropdownItem.displayName = DropdownMenuPrimitives.Item.displayName;

export const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitives.Separator
    ref={ref}
    className={classNames(
      'h-px my-[var(--boltdiy-spacing)]', // 6px margin
      'bg-[var(--boltdiy-input-border)]', // Use input border color or a similar subtle separator color
      className,
    )}
    {...props}
  />
));
DropdownSeparator.displayName = DropdownMenuPrimitives.Separator.displayName;

export const Dropdown = ({ trigger, children, align = 'center', sideOffset = 8, ...props }: DropdownProps) => {
  return (
    <DropdownMenuPrimitives.Root {...props}>
      <DropdownMenuPrimitives.Trigger asChild>
        {/* The trigger can be any component, if it's always a boltdiy button,
            wrap with <BoltDiyButton variant="default" size="default"> or similar.
            For now, it's flexible as per original.
            Ensure the trigger itself is styled appropriately where used.
            e.g. if it's a button, it should be a <BoltDiyButton />
        */}
        {trigger}
      </DropdownMenuPrimitives.Trigger>

      <DropdownMenuPrimitives.Portal>
        <DropdownMenuPrimitives.Content
          sideOffset={sideOffset}
          align={align}
          className={classNames(
            'z-50 min-w-[240px] overflow-hidden rounded-[12px]', // Larger radius for the content box
            'border border-[var(--boltdiy-input-border)]', // Neon border, can be --boltdiy-accent-neon directly too
            'bg-[var(--boltdiy-secondary-bg)]',
            'p-[var(--boltdiy-spacing)]', // 6px padding around items
            'text-[var(--boltdiy-primary-text)]',
            'shadow-md', // Standard shadow, or a neon glow: 'shadow-[0_0_10px_var(--boltdiy-accent-neon)]'
            // Animations (can be customized or use Radix defaults if any are built-in)
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
          )}
        >
          {children}
        </DropdownMenuPrimitives.Content>
      </DropdownMenuPrimitives.Portal>
    </DropdownMenuPrimitives.Root>
  );
};
// It's good practice to also export other parts of DropdownMenuPrimitives if they are to be used,
// e.g., CheckboxItem, RadioGroup, RadioItem, Label, etc., and style them similarly.
// For now, only Dropdown, DropdownItem, DropdownSeparator are covered.
// Dropdown.displayName = 'Dropdown (BoltDIY)'; // This would be for the main component if not default export
// Default export of Dropdown means its displayName isn't set this way.
// Let's set displayName on the exported component itself if it's not default.
// Since `Dropdown` is a named export, we can set its displayName.
Dropdown.displayName = "DropdownMenu.Root (BoltDIY)"; // Or a more descriptive name
DropdownItem.displayName = "DropdownMenu.Item (BoltDIY)";
DropdownSeparator.displayName = "DropdownMenu.Separator (BoltDIY)";

export { DropdownMenuPrimitives }; // Exporting all primitives for more advanced composition if needed.
