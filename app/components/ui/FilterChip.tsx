import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '~/utils/classNames';

interface FilterChipProps {
  /** The label text to display */
  label: string;

  /** Optional value to display after the label */
  value?: string | number;

  /** Function to call when the remove button is clicked */
  onRemove?: () => void;

  /** Whether the chip is active/selected */
  active?: boolean;

  /** Optional icon to display before the label */
  icon?: string;

  /** Additional class name */
  className?: string;
}

/**
 * FilterChip component
 *
 * A chip component for displaying filters with optional remove button.
 */
export function FilterChip({ label, value, onRemove, active = false, icon, className }: FilterChipProps) {
  // Animation variants
  const variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.2 }}
      className={classNames(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all', // Base styles are good
        active
          ? 'bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20' // Updated active state with hover
          : 'bg-background/75 text-text/75 border border-border hover:bg-background hover:border-border-active', // Updated inactive state with hover (border-border-active is conceptual)
        onRemove && 'pr-1', // Keep padding adjustment if remove button is present
        className,
      )}
    >
      {/* Icon */}
      {icon && <span className={classNames(icon, 'text-inherit')} />}

      {/* Label and value */}
      <span>
        {label}
        {value !== undefined && ': '}
        {value !== undefined && (
          <span
            className={
              active
                ? 'text-primary font-semibold' // Updated active value color (using primary, could be darker shade if available)
                : 'text-text font-semibold' // Updated inactive value color
            }
          >
            {value}
          </span>
        )}
      </span>

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={classNames(
            'ml-1 p-0.5 rounded-full hover:bg-background-active transition-colors', // Updated hover background (bg-background-active is conceptual)
            active
              ? 'text-primary hover:text-primary-dark' // Updated active remove icon color
              : 'text-text/60 hover:text-text/80', // Updated inactive remove icon color
          )}
          aria-label={`Remove ${label} filter`}
        >
          <span className="i-ph:x w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}
