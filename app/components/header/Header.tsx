import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import MobileMenu from './MobileMenu.client';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';

export function Header() {
  const chat = useStore(chatStore);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
      className={classNames('flex items-center p-5 border-b h-[var(--header-height)]', {
        'border-transparent': !chat.started,
        'border-bolt-elements-borderColor': chat.started,
      })}
    >
      <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary">
        {/* Hamburger Menu Button - visible only on small screens */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-bolt-elements-textPrimary hover:bg-bolt-elements-hover-backgroundColor md:hidden"
          aria-label="Open mobile menu"
        >
          <div className="i-ph:sidebar-simple-duotone text-xl" />
        </button>

        {/* Logo - hidden on small screens, visible on medium and up */}
        <a href="/" className="text-2xl font-semibold text-accent hidden md:flex items-center">
          {/* <span className="i-bolt:logo-text?mask w-[46px] inline-block" /> */}
          <img src="/logo-light-styled.png" alt="logo" className="w-[90px] inline-block dark:hidden" />
          <img src="/logo-dark-styled.png" alt="logo" className="w-[90px] inline-block hidden dark:block" />
        </a>
      </div>

      {/* ChatDescription and HeaderActionButtons - hidden on small screens, visible on medium and up if chat started */}
      {chat.started && (
        <div className="hidden md:flex flex-1 items-center justify-between">
          <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
            <ClientOnly>{() => <ChatDescription />}</ClientOnly>
          </span>
          <ClientOnly>
            {() => (
              <div className="mr-1">
                <HeaderActionButtons />
              </div>
            )}
          </ClientOnly>
        </div>
      )}

      {/* Placeholder for right-aligned items on small screens if chat hasn't started, or if no items are shown */}
      {!chat.started && <div className="flex-1 md:hidden" />}

      {/* Fallback for HeaderActionButtons on small screens if chat.started but we want to show some minimal action like a new chat button - currently hidden */}
      {/* {chat.started && (
        <div className="md:hidden">
          <ClientOnly>
            {() => (
              <div className="mr-1">
                <HeaderActionButtons /> // This would need to be a simplified version for mobile
              </div>
            )}
          </ClientOnly>
        </div>
      )} */}
    </header>
    <ClientOnly>
      {() => <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />}
    </ClientOnly>
    </>
  );
}
