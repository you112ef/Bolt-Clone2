import { memo, forwardRef, type ForwardedRef } from 'react';
import { classNames } from '~/utils/classNames';

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface BaseIconButtonProps {
  size?: IconSize;
  className?: string;
  iconClassName?: string;
  disabledClassName?: string;
  title?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

type IconButtonWithoutChildrenProps = {
  icon: string; // Icon must be provided if no children
  children?: undefined;
  'aria-label': string; // Require aria-label for icon-only buttons
} & BaseIconButtonProps;

type IconButtonWithChildrenProps = {
  icon?: undefined; // Icon is optional if children are present
  children: string | JSX.Element | JSX.Element[];
  'aria-label'?: string; // aria-label is optional if children provide text
} & BaseIconButtonProps;

type IconButtonProps = IconButtonWithoutChildrenProps | IconButtonWithChildrenProps;

// Componente IconButton com suporte a refs
export const IconButton = memo(
  forwardRef(
    (
      {
        icon,
        size = 'xl',
        className,
        iconClassName,
        disabledClassName,
        disabled = false,
        title,
        onClick,
        children,
        ...rest // Capture other props like aria-label
      }: IconButtonProps,
      ref: ForwardedRef<HTMLButtonElement>,
    ) => {
      // Determine aria-label: if 'aria-label' is passed in rest, use it. Otherwise, use title.
      // For icon-only buttons, aria-label is required by the type.
      const accessibleName = rest['aria-label'] || title;

      return (
        <button
          ref={ref}
          className={classNames(
            'flex items-center text-text/75 bg-transparent enabled:hover:text-primary rounded-md p-1 enabled:hover:bg-primary/10 disabled:cursor-not-allowed', // Updated colors
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background', // Added visible focus style
            {
              [classNames('opacity-30', disabledClassName)]: disabled,
            },
            className,
          )}
          title={title} // Keep title for tooltip
          aria-label={children ? undefined : accessibleName} // Apply aria-label only if no children, otherwise rely on children for accessible name
          disabled={disabled}
          onClick={(event) => {
            if (disabled) {
              return;
            }

            onClick?.(event);
          }}
        >
          {children ? children : <div className={classNames(icon, getIconSize(size), iconClassName)}></div>}
        </button>
      );
    },
  ),
);

function getIconSize(size: IconSize) {
  if (size === 'sm') {
    return 'text-sm';
  } else if (size === 'md') {
    return 'text-md';
  } else if (size === 'lg') {
    return 'text-lg';
  } else if (size === 'xl') {
    return 'text-xl';
  } else {
    return 'text-2xl';
  }
}
