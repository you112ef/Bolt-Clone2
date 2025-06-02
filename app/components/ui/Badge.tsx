'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { classNames } from '~/utils/classNames';

const badgeVariants = cva(
  'inline-flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2', // Updated focus ring
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-background text-text hover:bg-background/80', // Updated colors
        secondary:
          'border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20', // Updated colors
        destructive: 'border-transparent bg-red-500/10 text-red-500 hover:bg-red-500/20', // Kept as is
        outline: 'text-text border border-border', // Updated colors and added border
        primary: 'border-transparent bg-primary/10 text-primary hover:bg-primary/20', // Updated colors
        success: 'border-transparent bg-green-500/10 text-green-600 hover:bg-green-500/20', // Kept as is, specific green
        warning: 'border-transparent bg-accent/10 text-accent hover:bg-accent/20', // Using accent color
        danger: 'border-transparent bg-red-500/10 text-red-600 hover:bg-red-500/20', // Kept as is (same as destructive but specific "danger" variant name)
        info: 'border-transparent bg-blue-500/10 text-blue-600 hover:bg-blue-500/20', // Kept as is, specific blue
        subtle:
          'border border-border/30 bg-background/50 backdrop-blur-sm text-text/75', // Updated colors
      },
      size: {
        default: 'rounded-full px-2.5 py-0.5 text-xs font-semibold', // No change
        sm: 'rounded-full px-1.5 py-0.5 text-xs', // No change
        md: 'rounded-lg px-2 py-1 text-xs font-medium', // Updated rounding
        lg: 'rounded-lg px-2.5 py-1.5 text-sm', // Updated rounding
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  icon?: string;
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={classNames(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className={icon} />}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
