import React from 'react';
// import { Link } from '@remix-run/react'; // Or appropriate navigation component

// Placeholder for Material Design Icons (replace with actual icons later)
const IconPlaceholder = ({ name, className }: { name: string, className?: string }) => (
  <div className={`w-6 h-6 bg-gray-400 rounded ${className}`} aria-label={name}></div>
);

const navItems = [
  { id: 'home', label: 'Home', icon: 'home', path: '/' },
  { id: 'search', label: 'Search', icon: 'search', path: '/search' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications', path: '/notifications' },
  { id: 'profile', label: 'Profile', icon: 'person', path: '/profile' },
  // Example of how bolt.diy links could be conceptualized here:
  // { id: 'boltdiyChat', label: 'BoltDIY Chat', icon: 'bolt', path: '/boltdiy/chat' },
  // { id: 'boltdiyEditor', label: 'BoltDIY Editor', icon: 'code', path: '/boltdiy/editor' },
  // TODO: Consider if bolt.diy screens should be part of this global bottom nav or have their own navigation (e.g. a main /boltdiy route that then internally navigates).
  // For now, these are conceptual and not added to the rendered items.
];

export function BottomNavbar() {
  // TODO: Add logic to determine active tab based on current route
  // TODO: Use neon color (purple/blue) for active navigation item's icon and text.
  // TODO: Ensure icons are Material Design v3 icons.
  // TODO: Consider media query to show BottomNavbar only on smaller screens if that's the intent.

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '56px',
      backgroundColor: 'var(--bolt-elements-bg-depth-1, #1C2526)', // Use new dark mode bg
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)', // A subtle top shadow
      zIndex: 1000, // Ensure it's above other content
    }}>
      {navItems.map((item) => (
        <a // Replace with <Link> component if using Remix/React Router
          key={item.id}
          href={item.path} // Replace with 'to' prop for <Link>
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            color: 'var(--bolt-elements-textSecondary, #AAA)', // Default item color
            textDecoration: 'none',
            padding: '4px 0',
            minWidth: '48px', // For touch target
            minHeight: '48px', // For touch target
          }}
          // TODO: Add active state styling (e.g., neon color for icon and text)
        >
          <IconPlaceholder name={item.icon} className="mb-1" />
          {/* Icon comment: <!-- TODO: Replace with Material Design icon for [item.icon] --> */}
          <span style={{ fontSize: '10px' }}>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

export default BottomNavbar;
