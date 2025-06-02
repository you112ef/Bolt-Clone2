import { useStore } from '@nanostores/react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import tailwindReset from '@unocss/reset/tailwind-compat.css?url';
import { themeStore } from './lib/stores/theme';
import { stripIndents } from './utils/stripIndent';
import { createHead } from 'remix-island';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ClientOnly } from 'remix-utils/client-only';

import reactToastifyStyles from 'react-toastify/dist/ReactToastify.css?url';
import globalStyles from './styles/index.scss?url';
import xtermStyles from '@xterm/xterm/css/xterm.css?url';

import 'virtual:uno.css';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.svg',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: reactToastifyStyles },
  { rel: 'stylesheet', href: tailwindReset },
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: xtermStyles },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
];

const inlineThemeCode = stripIndents`
  setTutorialKitTheme();

  function setTutorialKitTheme() {
    let theme = localStorage.getItem('bolt_theme');

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.querySelector('html')?.setAttribute('data-theme', theme);
  }
`;

export const Head = createHead(() => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta />
    <Links />
    <script dangerouslySetInnerHTML={{ __html: inlineThemeCode }} />
  </>
));

import { TopNavBar } from '~/components/navigation/TopNavBar';
import { SidebarNav } from '~/components/navigation/SidebarNav';
import { BottomTabNav } from '~/components/navigation/BottomTabNav';

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useStore(themeStore);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ClientOnly>
        {() => (
          <DndProvider backend={HTML5Backend}>
            {/* Desktop Navigation - Sidebar is fixed, shown on md+ */}
            <SidebarNav />
            {/* Content area that flexes */}
            <div className="flex flex-col flex-1 md:ml-64"> {/* Margin for sidebar */}
              {/* Desktop Navigation - Topbar is part of this flex column, shown on md+ */}
              <TopNavBar />
              {/* Main Content Area */}
              {/* Padding: p-4 for all sides on mobile. */}
              {/* pb-20 for mobile to account for BottomTabNav (h-16 + p-4) */}
              {/* On desktop (md+): TopNavBar is h-16, so main content doesn't need pt. Sidebar is handled by ml-64. */}
              <main className="flex-1 p-4 pb-20 md:pb-4 md:pt-4">
                {children}
              </main>
            </div>
            {/* Mobile Navigation - Fixed at bottom, shown unless md+ */}
            <BottomTabNav />
          </DndProvider>
        )}
      </ClientOnly>
      <ScrollRestoration />
      <Scripts />
    </div>
  );
}

import { logStore } from './lib/stores/logs';

export default function App() {
  const theme = useStore(themeStore);

  useEffect(() => {
    logStore.logSystem('Application initialized', {
      theme,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
