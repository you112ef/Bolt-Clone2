import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
// Removed old Header import: import { Header } from '~/components/header/Header';
// import BackgroundRays from '~/components/ui/BackgroundRays'; // Removed BackgroundRays for cleaner chat UI

export const meta: MetaFunction = () => {
  return [{ title: 'AI Assistant | Bolt' }, { name: 'description', content: 'Chat with Bolt, an AI assistant' }];
};

export const loader = () => json({});

export default function AssistantPage() { // Renamed from Index
  return (
    // The main layout in root.tsx will provide necessary padding if TopNavBar is used.
    // If this page needs to be full-bleed without TopNavBar interference (e.g. if TopNavBar is hidden for this route),
    // then specific layout adjustments might be needed here or in root.tsx.
    // For now, assuming it fits within the standard page layout.
    <div className="flex flex-col h-full w-full"> {/* Will inherit bg-background from root layout */}
      {/* <BackgroundRays /> */} {/* Removed */}
      {/* Header is removed, assuming TopNavBar from root layout is sufficient or not desired here */}
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
