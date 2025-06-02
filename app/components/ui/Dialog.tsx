import * as RadixDialog from '@radix-ui/react-dialog';
import { motion, type Variants } from 'framer-motion';
import React, { memo, type ReactNode, useState, useEffect } from 'react';
import { classNames } from '~/utils/classNames';
import { cubicEasingFn } from '~/utils/easings';
import { IconButton } from './IconButton';
import { Button } from './Button';
import { FixedSizeList } from 'react-window';
import { Checkbox } from './Checkbox';
import { Label } from './Label';

export { Close as DialogClose, Root as DialogRoot } from '@radix-ui/react-dialog';

interface DialogButtonProps {
  type: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
}

export const DialogButton = memo(({ type, children, onClick, disabled }: DialogButtonProps) => {
  return (
    <button
      className={classNames(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors',
        type === 'primary'
          ? 'bg-primary text-white hover:bg-primary/90' // Updated primary type
          : type === 'secondary'
            ? 'bg-transparent text-text hover:bg-background/50' // Updated secondary type
            : 'bg-transparent text-red-500 hover:bg-red-500/10', // Updated danger type (assuming red-500 is the desired danger color)
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export const DialogTitle = memo(({ className, children, ...props }: RadixDialog.DialogTitleProps) => {
  return (
    <RadixDialog.Title
      className={classNames('text-lg font-medium text-text flex items-center gap-2', className)} // Updated text color
      {...props}
    >
      {children}
    </RadixDialog.Title>
  );
});

export const DialogDescription = memo(({ className, children, ...props }: RadixDialog.DialogDescriptionProps) => {
  return (
    <RadixDialog.Description
      className={classNames('text-sm text-text/75 mt-1', className)} // Updated text color
      {...props}
    >
      {children}
    </RadixDialog.Description>
  );
});

const transition = {
  duration: 0.25, // Increased duration from 0.15s to 0.25s (250ms)
  ease: cubicEasingFn,
};

export const dialogBackdropVariants = {
  closed: {
    opacity: 0,
    transition,
  },
  open: {
    opacity: 1,
    transition,
  },
} satisfies Variants;

export const dialogVariants = {
  closed: {
    x: '-50%',
    y: '-40%',
    scale: 0.96,
    opacity: 0,
    transition,
  },
  open: {
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
    transition,
  },
} satisfies Variants;

interface DialogProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  onBackdrop?: () => void;
}

export const Dialog = memo(({ children, className, showCloseButton = true, onClose, onBackdrop }: DialogProps) => {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay asChild>
        <motion.div
          className={classNames('fixed inset-0 z-[9999] bg-black/70 dark:bg-black/80 backdrop-blur-sm')}
          initial="closed"
          animate="open"
          exit="closed"
          variants={dialogBackdropVariants}
          onClick={onBackdrop}
        />
      </RadixDialog.Overlay>
      <RadixDialog.Content asChild>
        <motion.div
          className={classNames(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-2xl shadow-xl border border-border z-[9999] w-[520px] focus:outline-none', // Updated bg, border-radius, border color
            className,
          )}
          initial="closed"
          animate="open"
          exit="closed"
          variants={dialogVariants}
        >
          <div className="flex flex-col">
            {children}
            {showCloseButton && (
              <RadixDialog.Close asChild onClick={onClose}>
                <IconButton
                  icon="i-ph:x"
                  className="absolute top-3 right-3 text-text/50 hover:text-text/75" // Updated icon color
                />
              </RadixDialog.Close>
            )}
          </div>
        </motion.div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});

/**
 * Props for the ConfirmationDialog component
 */
export interface ConfirmationDialogProps {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;

  /**
   * Callback when the dialog is closed
   */
  onClose: () => void;

  /**
   * Callback when the confirm button is clicked
   */
  onConfirm: () => void;

  /**
   * The title of the dialog
   */
  title: string;

  /**
   * The description of the dialog
   */
  description: string;

  /**
   * The text for the confirm button
   */
  confirmLabel?: string;

  /**
   * The text for the cancel button
   */
  cancelLabel?: string;

  /**
   * The variant of the confirm button
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

  /**
   * Whether the confirm button is in a loading state
   */
  isLoading?: boolean;
}

/**
 * A reusable confirmation dialog component that uses the Dialog component
 */
export function ConfirmationDialog({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  isLoading = false,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog showCloseButton={false}>
        <div className="p-6 bg-background relative z-10"> // Updated bg color
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mb-4">{description}</DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button
              variant={variant}
              onClick={onConfirm}
              disabled={isLoading}
              className={
                variant === 'destructive'
                  ? 'bg-red-500 text-white hover:bg-red-600' // Kept destructive as is
                  : 'bg-primary text-white hover:bg-primary/90' // Changed other variants to primary button style
              }
            >
              {isLoading ? (
                <>
                  <div className="i-ph-spinner-gap-bold animate-spin w-4 h-4 mr-2" />
                  {confirmLabel}
                </>
              ) : (
                confirmLabel
              )}
            </Button>
          </div>
        </div>
      </Dialog>
    </RadixDialog.Root>
  );
}

/**
 * Type for selection item in SelectionDialog
 */
type SelectionItem = {
  id: string;
  label: string;
  description?: string;
};

/**
 * Props for the SelectionDialog component
 */
export interface SelectionDialogProps {
  /**
   * The title of the dialog
   */
  title: string;

  /**
   * The items to select from
   */
  items: SelectionItem[];

  /**
   * Whether the dialog is open
   */
  isOpen: boolean;

  /**
   * Callback when the dialog is closed
   */
  onClose: () => void;

  /**
   * Callback when the confirm button is clicked with selected item IDs
   */
  onConfirm: (selectedIds: string[]) => void;

  /**
   * The text for the confirm button
   */
  confirmLabel?: string;

  /**
   * The maximum height of the selection list
   */
  maxHeight?: string;
}

/**
 * A reusable selection dialog component that uses the Dialog component
 */
export function SelectionDialog({
  title,
  items,
  isOpen,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  maxHeight = '60vh',
}: SelectionDialogProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Reset selected items when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedItems([]);
      setSelectAll(false);
    }
  }, [isOpen]);

  const handleToggleItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(items.map((item) => item.id));
      setSelectAll(true);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedItems);
    onClose();
  };

  // Calculate the height for the virtualized list
  const listHeight = Math.min(
    items.length * 60,
    parseInt(maxHeight.replace('vh', '')) * window.innerHeight * 0.01 - 40,
  );

  // Render each item in the virtualized list
  const ItemRenderer = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index];
    return (
      <div
        key={item.id}
        className={classNames(
          'flex items-start space-x-3 p-2 rounded-md transition-colors',
          selectedItems.includes(item.id)
            ? 'bg-primary/10' // Updated selected item background
            : 'bg-background/50 hover:bg-background/75', // Updated item background and hover
        )}
        style={{
          ...style,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Checkbox
          id={`item-${item.id}`}
          checked={selectedItems.includes(item.id)}
          onCheckedChange={() => handleToggleItem(item.id)}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor={`item-${item.id}`}
            className={classNames(
              'text-sm font-medium cursor-pointer',
              selectedItems.includes(item.id)
                ? 'text-primary' // Updated selected item text
                : 'text-text', // Updated item text
            )}
          >
            {item.label}
          </Label>
          {item.description && <p className="text-xs text-text/75">{item.description}</p>} // Updated description text
        </div>
      </div>
    );
  };

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog showCloseButton={false}>
        <div className="p-6 bg-background relative z-10"> // Updated bg color
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mt-2 mb-4">
            Select the items you want to include and click{' '}
            <span className="text-primary font-medium">{confirmLabel}</span>. // Updated text color
          </DialogDescription>

          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text/75"> // Updated text color
                {selectedItems.length} of {items.length} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="text-xs h-8 px-2 text-text hover:text-primary hover:bg-primary/10 bg-background/50" // Updated button style
              >
                {selectAll ? 'Deselect All' : 'Select All'}
              </Button>
            </div>

            <div
              className="pr-2 border rounded-md border-border bg-background/50" // Updated border and bg color
              style={{
                maxHeight,
              }}
            >
              {items.length > 0 ? (
                <FixedSizeList
                  height={listHeight}
                  width="100%"
                  itemCount={items.length}
                  itemSize={60}
                  className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-bolt-elements-bg-depth-3" // Scrollbar style can be reviewed later
                >
                  {ItemRenderer}
                </FixedSizeList>
              ) : (
                <div className="text-center py-4 text-sm text-text/50">No items to display</div> // Updated text color
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-border text-text hover:bg-background/50" // Updated outline button style
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedItems.length === 0}
              className="bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none" // Changed to primary button style
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </Dialog>
    </RadixDialog.Root>
  );
}
