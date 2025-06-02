import { NavLink } from '@remix-run/react';
import { classNames } from '~/utils/classNames';

// Define tab items
// Icons are placeholders from Phosphor Icons (ph) or similar
const tabItems = [
  { name: 'Dashboard', to: '/dashboard', icon: 'i-ph:layout-duotone' },
  { name: 'Flows', to: '/flows', icon: 'i-ph:graph-duotone' },
  { name: 'Campaigns', to: '/campaigns', icon: 'i-ph:users-three-duotone' },
  { name: 'Assistant', to: '/assistant', icon: 'i-ph:robot-duotone' },
  // Consider a "More" tab for Search, Profile, Settings, ThemeToggle if needed
  // { name: 'More', to: '/more', icon: 'i-ph:dots-three-outline-fill' },
];

export function BottomTabNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border shadow-lg text-text"> {/* Changed shadow-top to shadow-lg */}
      <div className="flex justify-around items-center h-full">
        {tabItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              classNames(
                'flex flex-col items-center justify-center w-full h-full px-2 py-1 transition-colors',
                isActive ? 'text-primary' : 'text-text/75 hover:text-text',
              )
            }
          >
            <span className={classNames(item.icon, 'text-2xl mb-0.5')} aria-hidden="true" />
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
