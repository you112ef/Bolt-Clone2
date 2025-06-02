import { Link, NavLink } from '@remix-run/react'; // NavLink for active styling
import { classNames } from '~/utils/classNames'; // For conditional active styles

// Define navigation items
// Icons are placeholders from Phosphor Icons (ph) or similar, actual icons TBD
const navigationItems = [
  { name: 'Dashboard', to: '/dashboard', icon: 'i-ph:layout-duotone' },
  { name: 'Flows', to: '/flows', icon: 'i-ph:graph-duotone' },
  { name: 'Campaigns', to: '/campaigns', icon: 'i-ph:users-three-duotone' },
  { name: 'AI Assistant', to: '/assistant', icon: 'i-ph:robot-duotone' },
  { name: 'Templates', to: '/templates', icon: 'i-ph:selection-all-duotone' },
  { name: 'Settings', to: '/settings', icon: 'i-ph:gear-duotone' },
];

// Placeholder for User Profile data - to be integrated later
const userProfile = {
  name: 'User Name',
  avatarUrl: 'https://via.placeholder.com/40', // Placeholder avatar
};

export function SidebarNav() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-background border-r border-border text-text fixed inset-y-0">
      {/* Sidebar Header - Logo */}
      <div className="flex items-center justify-center h-16 border-b border-border">
        <Link to="/" className="flex items-center">
          <img src="/logo-light-styled.png" alt="Logo" className="h-8 w-auto dark:hidden" />
          <img src="/logo-dark-styled.png" alt="Logo" className="h-8 w-auto hidden dark:block" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              classNames(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary' // Active link style
                  : 'hover:bg-background/75 hover:text-text/75', // Hover style for inactive links
              )
            }
          >
            <span className={classNames(item.icon, 'mr-3 h-5 w-5')} aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer - User Profile (Simplified) */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <img className="h-10 w-10 rounded-full bg-gray-200" src={userProfile.avatarUrl} alt="User Avatar" />
          <div>
            <p className="text-sm font-medium">{userProfile.name}</p>
            {/* Potentially add a link to profile settings or logout here */}
          </div>
        </div>
      </div>
    </aside>
  );
}
