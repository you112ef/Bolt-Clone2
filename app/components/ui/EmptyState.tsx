// This component is designed to be used on pages or sections that have no content yet,
// or for onboarding new users. It provides a clear visual cue with an icon,
// a title, a descriptive message, and optional call-to-action buttons.
//
// Example usage in a page component (e.g., Dashboard, Flows, Campaigns):
// if (isEmptyData) {
//   return (
//     <EmptyState
//       icon="i-ph:rocket-launch-duotone"
//       title="Blast Off with Your First Campaign!"
//       description="It looks like you haven't created any campaigns yet. Get started by launching your first one."
//       actionLabel="Create New Campaign"
//       onAction={() => navigate('/campaigns/new')}
//     />
//   );
// }
import React from 'react';
import { classNames } from '~/utils/classNames';
import { Button } from './Button';
import { motion } from 'framer-motion';

// Variant-specific styles
const VARIANT_STYLES = {
  default: {
    container: 'py-8 p-6',
    icon: {
      container: 'w-12 h-12 mb-3',
      size: 'w-6 h-6',
    },
    title: 'text-base',
    description: 'text-sm mt-1',
    actions: 'mt-4',
    buttonSize: 'default' as const,
  },
  compact: {
    container: 'py-4 p-4',
    icon: {
      container: 'w-10 h-10 mb-2',
      size: 'w-5 h-5',
    },
    title: 'text-sm',
    description: 'text-xs mt-0.5',
    actions: 'mt-3',
    buttonSize: 'sm' as const,
  },
};

interface EmptyStateProps {
  /** Icon class name */
  icon?: string;

  /** Title text */
  title: string;

  /** Optional description text */
  description?: string;

  /** Primary action button label */
  actionLabel?: string;

  /** Primary action button callback */
  onAction?: () => void;

  /** Secondary action button label */
  secondaryActionLabel?: string;

  /** Secondary action button callback */
  onSecondaryAction?: () => void;

  /** Additional class name */
  className?: string;

  /** Component size variant */
  variant?: 'default' | 'compact';
}

/**
 * EmptyState component
 *
 * A component for displaying empty states with optional actions.
 */
export function EmptyState({
  icon = 'i-ph:folder-simple-dashed',
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
  variant = 'default',
}: EmptyStateProps) {
  // Get styles based on variant
  const styles = VARIANT_STYLES[variant];

  // Animation variants for buttons
  const buttonAnimation = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center text-center', // Added text-center for overall content alignment
        'text-text/75', // Default text color for the container (secondary-like)
        'bg-background/50 rounded-lg', // Updated background
        styles.container,
        className,
      )}
    >
      {/* Icon */}
      <div
        className={classNames(
          'rounded-full bg-primary/10 flex items-center justify-center', // Updated icon container background
          styles.icon.container,
        )}
      >
        <span
          className={classNames(
            icon,
            styles.icon.size,
            'text-primary', // Updated icon color
          )}
        />
      </div>

      {/* Title */}
      <p className={classNames('font-medium text-text', styles.title)}>{title}</p> {/* Title uses primary text color */}

      {/* Description */}
      {description && (
        <p
          className={classNames(
            'text-text/60 text-center max-w-xs', // Updated description text color
            styles.description,
          )}
        >
          {description}
        </p>
      )}

      {/* Action buttons */}
      {(actionLabel || secondaryActionLabel) && (
        <div className={classNames('flex items-center gap-3', styles.actions)}> {/* Increased gap slightly */}
          {actionLabel && onAction && (
            <motion.div {...buttonAnimation}>
              <Button
                onClick={onAction}
                variant="default" // This will now use the new primary button style
                size={styles.buttonSize}
                // Removed direct bg-purple classes, relies on variant="default"
              >
                {actionLabel}
              </Button>
            </motion.div>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <motion.div {...buttonAnimation}>
              <Button
                onClick={onSecondaryAction}
                variant="outline" // This will use the new outline button style
                size={styles.buttonSize}
              >
                {secondaryActionLabel}
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
