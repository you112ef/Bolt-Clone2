import React, { useState } from 'react';
import { ThemeSwitch } from '~/components/ui/ThemeSwitch';
import ControlPanel from '~/components/@settings/core/ControlPanel';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!isOpen && !isSettingsOpen) { // Keep component alive if settings are open
    return null;
  }

  const handleSettingsClick = () => {
    // console.log('Settings button clicked');
    setIsSettingsOpen(true);
    onClose(); // Close the mobile menu itself
  };

  return (
    <>
      {isOpen && ( // Only render the menu panel if isOpen is true
        <div
          className="absolute top-[var(--header-height)] left-0 right-0 bg-white dark:bg-gray-800 shadow-md md:hidden"
          style={{ zIndex: 'var(--z-mobile-menu, 45)' }} // Use CSS var, fallback to 45
        >
          <div className="p-4">
            <p className="mb-4">Mobile Menu</p>
            <div className="mb-4">
              <ThemeSwitch />
            </div>
            <button
              onClick={handleSettingsClick}
              className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Settings
            </button>
            <a
              href="/"
              onClick={onClose} // Close menu on navigation
              className="block w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 mt-2"
            >
              Start New Chat
            </a>
            {/* Add other menu items here */}
          </div>
        </div>
      )}
      <ControlPanel open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default MobileMenu;
