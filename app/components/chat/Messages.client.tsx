import type { Message } from 'ai';
import { Fragment } from 'react';
import { classNames } from '~/utils/classNames';
import { AssistantMessage } from './AssistantMessage';
import { UserMessage } from './UserMessage';
import { useLocation } from '@remix-run/react';
import { db, chatId } from '~/lib/persistence/useChatHistory';
import { forkChat } from '~/lib/persistence/db';
import { toast } from 'react-toastify';
import { useStore } from '@nanostores/react';
import { profileStore } from '~/lib/stores/profile';
import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import type { ProviderInfo } from '~/types/model';

interface MessagesProps {
  id?: string;
  className?: string;
  isStreaming?: boolean;
  messages?: Message[];
  append?: (message: Message) => void;
  chatMode?: 'discuss' | 'build';
  setChatMode?: (mode: 'discuss' | 'build') => void;
  model?: string;
  provider?: ProviderInfo;
}

export const Messages = forwardRef<HTMLDivElement, MessagesProps>(
  (props: MessagesProps, ref: ForwardedRef<HTMLDivElement> | undefined) => {
    const { id, isStreaming = false, messages = [] } = props;
    const location = useLocation();
    const profile = useStore(profileStore);

    const handleRewind = (messageId: string) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('rewindTo', messageId);
      window.location.search = searchParams.toString();
    };

    const handleFork = async (messageId: string) => {
      try {
        if (!db || !chatId.get()) {
          toast.error('Chat persistence is not available');
          return;
        }

        const urlId = await forkChat(db, chatId.get()!, messageId);
        window.location.href = `/chat/${urlId}`;
      } catch (error) {
        toast.error('Failed to fork chat: ' + (error as Error).message);
      }
    };

    return (
      <div id={id} className={props.className} ref={ref}>
        {messages.length > 0
          ? messages.map((message, index) => {
              const { role, content, id: messageId, annotations } = message;
              const isUserMessage = role === 'user';
              const isFirst = index === 0;
              const isLast = index === messages.length - 1;
              const isHidden = annotations?.includes('hidden');

              if (isHidden) {
                return <Fragment key={index} />;
              }

              return (
                <div
                  key={index}
                  className={classNames(
                    'flex gap-3 p-4 rounded-lg w-full', // Adjusted padding, gap, and rounding
                    {
                      'bg-primary/10': isUserMessage, // User message background
                      'bg-background-hover': !isUserMessage && (!isStreaming || (isStreaming && !isLast)), // AI message background
                      'bg-gradient-to-b from-background-hover from-30% to-transparent': !isUserMessage && isStreaming && isLast, // AI streaming last message
                      'mt-4': !isFirst,
                    },
                  )}
                >
                  {isUserMessage ? (
                    // User Message Alignment (content first, then avatar)
                    <>
                      <div className="flex-1 grid grid-col-1 w-full order-1"> {/* Content container */}
                        <UserMessage content={content} />
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-background text-text/75 rounded-full shrink-0 self-start order-2"> {/* Avatar container, smaller */}
                        {profile?.avatar ? (
                          <img
                            src={profile.avatar}
                            alt={profile?.username || 'User'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="i-ph:user-fill text-lg" /> // Icon size adjusted
                        )}
                      </div>
                    </>
                  ) : (
                    // AI Message Alignment (avatar first, then content)
                    <>
                      <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-secondary/20 text-secondary rounded-full shrink-0 self-start order-1"> {/* AI Avatar, distinct color */}
                        <span className="i-ph:robot-duotone text-lg" /> {/* AI icon */}
                      </div>
                      <div className="flex-1 grid grid-col-1 w-full order-2"> {/* Content container */}
                        <AssistantMessage
                          content={content}
                          annotations={message.annotations}
                          messageId={messageId}
                          onRewind={handleRewind}
                          onFork={handleFork}
                          append={props.append}
                          chatMode={props.chatMode}
                          setChatMode={props.setChatMode}
                          model={props.model}
                          provider={props.provider}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })
          : null}
        {isStreaming && (
          <div className="text-center w-full text-primary i-svg-spinners:3-dots-fade text-4xl mt-4"></div>
        )}
      </div>
    );
  },
);
