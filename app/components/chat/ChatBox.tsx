import React from 'react';
import { ClientOnly } from 'remix-utils/client-only'; // Keep for existing ClientOnly components if any remain on desktop
import { classNames } from '~/utils/classNames';
import { PROVIDER_LIST } from '~/utils/constants'; // Keep if ModelSelector is used on desktop
import { ModelSelector } from '~/components/chat/ModelSelector'; // To be hidden on mobile
import { APIKeyManager } from './APIKeyManager'; // To be hidden on mobile
import { LOCAL_PROVIDERS } from '~/lib/stores/settings'; // Keep if ModelSelector/APIKeyManager used on desktop
import FilePreview from './FilePreview'; // To be hidden on mobile
import { ScreenshotStateManager } from './ScreenshotStateManager'; // To be hidden on mobile
// import { SendButton } from './SendButton.client'; // Old send button, to be removed
import { IconButton } from '~/components/ui/IconButton'; // Keep for existing IconButtons on desktop
import { Button } from '~/components/ui/Button'; // New main action button
import { toast } from 'react-toastify'; // Keep if enhancePrompt is used on desktop
import { SpeechRecognitionButton } from '~/components/chat/SpeechRecognition'; // Keep for desktop
import { ExportChatButton } from '~/components/chat/chatExportAndImport/ExportChatButton'; // Keep for desktop
import { SupabaseConnection } from './SupabaseConnection'; // Keep for desktop (or if needed globally)
import { ExpoQrModal } from '~/components/workbench/ExpoQrModal'; // Keep for desktop (or if needed globally)
import styles from './BaseChat.module.scss'; // For PromptEffectContainer
import type { ProviderInfo } from '~/types/model';

interface ChatBoxProps {
  isModelSettingsCollapsed: boolean;
  setIsModelSettingsCollapsed: (collapsed: boolean) => void;
  provider: any;
  providerList: any[];
  modelList: any[];
  apiKeys: Record<string, string>;
  isModelLoading: string | undefined;
  onApiKeysChange: (providerName: string, apiKey: string) => void;
  uploadedFiles: File[];
  imageDataList: string[];
  textareaRef: React.RefObject<HTMLTextAreaElement> | undefined;
  input: string;
  handlePaste: (e: React.ClipboardEvent) => void;
  TEXTAREA_MIN_HEIGHT: number; // Will be overridden by rows="4" for mobile, but keep for desktop
  TEXTAREA_MAX_HEIGHT: number; // Keep for desktop
  isStreaming: boolean;
  handleSendMessage: (event: React.UIEvent, messageInput?: string) => void;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  chatStarted: boolean;
  exportChat?: () => void;
  qrModalOpen: boolean;
  setQrModalOpen: (open: boolean) => void;
  handleFileUpload: () => void;
  setProvider?: ((provider: ProviderInfo) => void) | undefined;
  model?: string | undefined;
  setModel?: ((model: string) => void) | undefined;
  setUploadedFiles?: ((files: File[]) => void) | undefined;
  setImageDataList?: ((dataList: string[]) => void) | undefined;
  handleInputChange?: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined;
  handleStop?: (() => void) | undefined;
  enhancingPrompt?: boolean | undefined;
  enhancePrompt?: (() => void) | undefined;
  chatMode?: 'discuss' | 'build';
  setChatMode?: (mode: 'discuss' | 'build') => void;
}

export const ChatBox: React.FC<ChatBoxProps> = (props) => {
  return (
    <div
      className={classNames(
        // p-2.5 for 10px padding from mock-up's .section
        'relative bg-bolt-elements-background-depth-2 p-2.5 rounded-lg border border-bolt-elements-borderColor w-full max-w-chat mx-auto z-prompt',
      )}
    >
      {/* PromptEffectContainer hidden on mobile */}
      <svg className={classNames(styles.PromptEffectContainer, 'hidden sm:block')}>
        <defs>
          <linearGradient
            id="line-gradient"
            x1="20%"
            y1="0%"
            x2="-14%"
            y2="10%"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(-45)"
          >
            <stop offset="0%" stopColor="#b44aff" stopOpacity="0%"></stop>
            <stop offset="40%" stopColor="#b44aff" stopOpacity="80%"></stop>
            <stop offset="50%" stopColor="#b44aff" stopOpacity="80%"></stop>
            <stop offset="100%" stopColor="#b44aff" stopOpacity="0%"></stop>
          </linearGradient>
          <linearGradient id="shine-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="0%"></stop>
            <stop offset="40%" stopColor="#ffffff" stopOpacity="80%"></stop>
            <stop offset="50%" stopColor="#ffffff" stopOpacity="80%"></stop>
            <stop offset="100%" stopColor="white" stopOpacity="0%"></stop>
          </linearGradient>
        </defs>
        <rect className={classNames(styles.PromptEffectLine)} pathLength="100" strokeLinecap="round"></rect>
        <rect className={classNames(styles.PromptShine)} x="48" y="24" width="70" height="1"></rect>
      </svg>

      {/* ModelSelector and APIKeyManager - hidden on small screens */}
      <div className="hidden sm:block">
        <ClientOnly>
          {() => (
            <div className={props.isModelSettingsCollapsed ? 'hidden' : ''}>
              <ModelSelector
                key={props.provider?.name + ':' + props.modelList.length}
                model={props.model}
                setModel={props.setModel}
                modelList={props.modelList}
                provider={props.provider}
                setProvider={props.setProvider}
                providerList={props.providerList || (PROVIDER_LIST as ProviderInfo[])}
                apiKeys={props.apiKeys}
                modelLoading={props.isModelLoading}
              />
              {(props.providerList || []).length > 0 &&
                props.provider &&
                (!LOCAL_PROVIDERS.includes(props.provider.name) || 'OpenAILike') && (
                  <APIKeyManager
                    provider={props.provider}
                    apiKey={props.apiKeys[props.provider.name] || ''}
                    setApiKey={(key) => {
                      props.onApiKeysChange(props.provider.name, key);
                    }}
                  />
                )}
            </div>
          )}
        </ClientOnly>
      </div>

      {/* FilePreview and ScreenshotStateManager - hidden on small screens */}
      <div className="hidden sm:block">
        <FilePreview
          files={props.uploadedFiles}
          imageDataList={props.imageDataList}
          onRemove={(index) => {
            props.setUploadedFiles?.(props.uploadedFiles.filter((_, i) => i !== index));
            props.setImageDataList?.(props.imageDataList.filter((_, i) => i !== index));
          }}
        />
        <ClientOnly>
          {() => (
            <ScreenshotStateManager
              setUploadedFiles={props.setUploadedFiles}
              setImageDataList={props.setImageDataList}
              uploadedFiles={props.uploadedFiles}
              imageDataList={props.imageDataList}
            />
          )}
        </ClientOnly>
      </div>

      {/* Textarea container - mock-up doesn't show a border around textarea itself, but rather the whole ChatBox section */}
      {/* The existing border is on the ChatBox's root div. */}
      <div>
        <label htmlFor="customPromptTextarea" className="block mb-[5px] text-xs" style={{ color: 'var(--bolt-text-primary)' }}>
          الوصف المخصص
        </label>
        <textarea
          id="customPromptTextarea"
          ref={props.textareaRef}
          rows={4}
          className={classNames(
            'w-full p-2 rounded-md text-sm', // Simplified padding and border-radius
            'bg-[var(--bolt-input-bg)] text-[var(--bolt-input-text)]', // Colors from CSS vars
            'placeholder-bolt-elements-textTertiary outline-none resize-none', // Kept placeholder and outline/resize
            'transition-all duration-200 hover:border-bolt-elements-focus', // Kept existing transition/hover
          )}
          onDragEnter={(e) => { /* Kept for desktop if needed, but may be less relevant for mobile */
            e.preventDefault();
            e.currentTarget.style.border = '2px solid #1488fc';
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.border = '2px solid #1488fc';
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            // Revert to a default border if any, or remove inline style to use class-based border
            e.currentTarget.style.border = ''; // Assuming class-based border will take over
          }}
          onDrop={(e) => { /* Kept for desktop */
            e.preventDefault();
            e.currentTarget.style.border = '';
            const files = Array.from(e.dataTransfer.files);
            files.forEach((file) => {
              if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e_onload) => {
                  const base64Image = e_onload.target?.result as string;
                  props.setUploadedFiles?.([...props.uploadedFiles, file]);
                  props.setImageDataList?.([...props.imageDataList, base64Image]);
                };
                reader.readAsDataURL(file);
              }
            });
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (event.shiftKey) { // Standard behavior: Shift+Enter for newline
                return;
              }
              event.preventDefault();
              if (props.isStreaming) {
                props.handleStop?.();
                return;
              }
              if (event.nativeEvent.isComposing) {
                return;
              }
              props.handleSendMessage?.(event);
            }
          }}
          value={props.input}
          onChange={(event) => {
            props.handleInputChange?.(event);
          }}
          onPaste={props.handlePaste}
          // style prop for min/max height is removed in favor of rows and default textarea behavior
          placeholder={props.chatMode === 'build' ? 'How can Bolt help you today?' : 'الوصف يدعم اللغة العربية والإنجليزية...'} // Placeholder from mock-up if needed, or keep existing logic
          translate="no" // Keep
        />
        {/* Old SendButton is removed */}
      </div>

      <div className="text-xs mt-[-8px] mb-2.5" style={{ color: 'var(--bolt-text-notice)' }}>
        الوصف يدعم اللغة العربية والإنجليزية ويُستخدم لتوليد استجابات دقيقة وفورية عبر الذكاء الاصطناعي.
      </div>

      {/* New Main Action Button */}
      <Button
        className="w-full text-xs p-2 rounded-md mb-2.5" // p-2 for 8px padding
        style={{
          background: 'linear-gradient(135deg, var(--bolt-button-gradient-start), var(--bolt-button-gradient-end))',
          color: 'var(--bolt-text-primary, #fff)' // Ensure fallback for color
        }}
        // For hover: define a variant or use group hover if Button supports it, or add custom CSS.
        // For now, hover will use default Button hover or be plain.
        onClick={(event) => props.handleSendMessage?.(event as any)} // Cast event if needed by handler
        disabled={props.isStreaming || (!props.input && props.uploadedFiles.length === 0)} // Example disable logic
      >
        🔄 تنفيذ الوصف الآن
      </Button>

      {/* Existing action buttons row - hidden on small screens, visible on sm and up */}
      <div className="hidden sm:flex justify-between items-center flex-wrap text-sm p-2 sm:p-3 sm:pt-2">
        <div className="flex gap-0.5 sm:gap-1 items-center">
          <IconButton title="Upload file" className="transition-all" onClick={() => props.handleFileUpload()}>
            <div className="i-ph:paperclip text-xl"></div>
          </IconButton>
          <IconButton
            title="Enhance prompt"
            disabled={props.input.length === 0 || props.enhancingPrompt}
            className={classNames('transition-all', props.enhancingPrompt ? 'opacity-100' : '')}
            onClick={() => {
              props.enhancePrompt?.();
              toast.success('Prompt enhanced!');
            }}
          >
            {props.enhancingPrompt ? (
              <div className="i-svg-spinners:90-ring-with-bg text-bolt-elements-loader-progress text-xl animate-spin"></div>
            ) : (
              <div className="i-bolt:stars text-xl"></div>
            )}
          </IconButton>
          <SpeechRecognitionButton
            isListening={props.isListening}
            onStart={props.startListening}
            onStop={props.stopListening}
            disabled={props.isStreaming}
          />
          {props.chatStarted && (
            <IconButton
              title="Discuss"
              className={classNames(
                'transition-all flex items-center gap-1 px-1.5',
                props.chatMode === 'discuss'
                  ? '!bg-bolt-elements-item-backgroundAccent !text-bolt-elements-item-contentAccent'
                  : 'bg-bolt-elements-item-backgroundDefault text-bolt-elements-item-contentDefault',
              )}
              onClick={() => {
                props.setChatMode?.(props.chatMode === 'discuss' ? 'build' : 'discuss');
              }}
            >
              <div className={`i-ph:chats text-xl`} />
              {props.chatMode === 'discuss' ? <span>Discuss</span> : <span />}
            </IconButton>
          )}
          {props.chatStarted && <ClientOnly>{() => <ExportChatButton exportChat={props.exportChat} />}</ClientOnly>}
          <IconButton
            title="Model Settings"
            className={classNames('transition-all flex items-center gap-1', {
              'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent':
                props.isModelSettingsCollapsed,
              'bg-bolt-elements-item-backgroundDefault text-bolt-elements-item-contentDefault':
                !props.isModelSettingsCollapsed,
            })}
            onClick={() => props.setIsModelSettingsCollapsed(!props.isModelSettingsCollapsed)}
            disabled={!props.providerList || props.providerList.length === 0}
          >
            <div className={`i-ph:caret-${props.isModelSettingsCollapsed ? 'right' : 'down'} text-lg`} />
            {props.isModelSettingsCollapsed ? <span className="text-xs">{props.model}</span> : <span />}
          </IconButton>
        </div>
        {/* Shift+Return hint - keep for desktop */}
        {props.input.length > 3 ? (
          <div className="text-xs text-bolt-elements-textTertiary">
            Use <kbd className="kdb px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-2">Shift</kbd> +{' '}
            <kbd className="kdb px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-2">Return</kbd> for a new line
          </div>
        ) : null}
        <SupabaseConnection /> {/* Assuming this is for desktop or global state */}
        <ExpoQrModal open={props.qrModalOpen} onClose={() => props.setQrModalOpen(false)} />
      </div>
    </div>
  );
};
