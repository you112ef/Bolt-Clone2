// import { useStore } from '@nanostores/react'; // No longer needed for this simplified version
// import { chatStore } from '~/lib/stores/chat'; // No longer needed
// import { classNames } from '~/utils/classNames'; // No longer needed

export function Header() {
  // const chat = useStore(chatStore); // Removed as chat.started logic is gone

  return (
    <header
      className="flex items-center sticky top-0 z-50" // Added sticky positioning and z-index
      style={{
        backgroundColor: 'var(--bolt-header-bg)', // Use CSS var
        boxShadow: '0 2px 5px rgba(0,0,0,0.5)', // Direct style from mock-up
        padding: 'clamp(0.75rem, 3vw, 1rem)', // Enhanced responsive padding (12px-16px)
        minHeight: 'var(--header-height)', // Use CSS variable for consistent height
      }}
    >
      {/*
        Assuming LTR visual order: Logo then Title.
        For RTL, flexbox behavior with dir="rtl" on a parent (e.g., html tag) will typically reverse visual order of children.
        `ml-2.5` (margin-left) should correctly become margin-right if TailwindCSS is configured for RTL support (e.g. via a plugin like tailwindcss-rtl).
        If not, logical properties (e.g., `ms-2.5`) would be better if supported, or specific RTL variant classes.
        For now, relying on standard flex behavior and typical Tailwind RTL handling.
      */}
      <img
        src="https://bolt-diy.pages.dev/logo.png" // From mock-up
        alt="bolt.diy Logo"
        className="h-[clamp(1.75rem,5vw,2.5rem)] mr-3" // Enhanced responsive height and margin
        style={{ maxWidth: '100%', height: 'auto' }} // Ensure image scales properly
      />
      <h1 
        className="font-semibold truncate" // Added truncate for long text
        style={{ 
          fontSize: 'clamp(1rem, 4vw, 1.25rem)', 
          margin: '0', 
          color: 'var(--bolt-text-primary)',
          lineHeight: '1.2'
        }}
      >
        bolt.diy
      </h1>
      {/* Removed: Hamburger icon, ChatDescription, HeaderActionButtons, MobileMenu logic */}
    </header>
  );
}
