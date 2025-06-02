import React, { useState } from 'react';
import { useBoltDiyTheme, BoltDiyTheme } from '~/lib/hooks/useBoltDiyTheme'; // Path to theme hook
import { Button } from '~/components/boltdiy/ui/Button'; // Themed Button
import { Switch } from '~/components/boltdiy/ui/Switch';   // Themed Switch
import { Slider } from '~/components/boltdiy/ui/Slider';   // Themed Slider
// Corrected import for Dropdown parts, assuming Dropdown exports its parts or we use Primitives
import { Dropdown as DropdownRoot, DropdownItem, DropdownMenuPrimitives } from '~/components/boltdiy/ui/Dropdown'; // Themed Dropdown

// Placeholder for a generic Neon Icon (20x20px)
const SettingIcon = ({ char = '◆', size = 20 }: { char?: string, size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      color: 'var(--boltdiy-accent-neon)',
      marginRight: 'calc(var(--boltdiy-spacing) * 2)', // 12px
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${size * 0.8}px`, // Adjust char size within icon
      border: '1px solid var(--boltdiy-accent-neon)', // Optional: if icon itself has a border
      borderRadius: '4px',
    }}
    aria-hidden="true"
  >
    {char}
  </div>
);

// Wrapper for each setting item for consistent spacing and layout
const SettingItemWrapper: React.FC<{label: string, children: React.ReactNode, iconChar?: string}> = ({ label, children, iconChar }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column', // Stack label on top of control
    marginBottom: 'calc(var(--boltdiy-spacing) * 3)', // 18px
  }}>
    <div style={{display: 'flex', alignItems: 'center', marginBottom: 'var(--boltdiy-spacing)' /* 6px */ }}>
      {iconChar && <SettingIcon char={iconChar} />}
      <label style={{
        fontSize: 'var(--boltdiy-font-size-min)',
        fontWeight: 'var(--boltdiy-font-weight-medium)',
        color: 'var(--boltdiy-primary-text)',
        flexGrow: 1,
      }}>
        {label}
      </label>
    </div>
    {children}
  </div>
);


export function SettingsScreen() {
  const { theme, setTheme, availableThemes } = useBoltDiyTheme();

  // Example states for other settings
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [aiModel, setAiModel] = useState('BoltDIY-Turbo');
  const [language, setLanguage] = useState('English'); // Placeholder state
  const [storageOption, setStorageOption] = useState('LocalStorage'); // Placeholder state
  const [dataSyncFrequency, setDataSyncFrequency] = useState(60); // in minutes

  const screenWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    backgroundColor: 'var(--boltdiy-primary-bg)',
    color: 'var(--boltdiy-primary-text)',
    fontFamily: 'var(--boltdiy-font-family)',
    overflowY: 'auto', // Allow vertical scrolling for settings list
    padding: 'calc(var(--boltdiy-spacing) * 3)', // 18px padding for the screen
  };

  // Helper to format theme names for display
  const formatThemeName = (themeName: string) => {
    return themeName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div style={screenWrapperStyle} className="boltdiy-theme-wrapper">
      <h1 style={{
        fontSize: 'calc(var(--boltdiy-font-size-min) + 6px)', // ~20px
        fontWeight: 'var(--boltdiy-font-weight-medium)',
        textAlign: 'center',
        color: 'var(--boltdiy-accent-neon)',
        marginBottom: 'calc(var(--boltdiy-spacing) * 4)', // 24px
      }}>
        Settings
      </h1>

      {/* Theme Selection */}
      <SettingItemWrapper label="Theme" iconChar="🎨">
        <DropdownRoot>
          <DropdownMenuPrimitives.Trigger asChild>
            <Button
              variant="default"
              className="w-full justify-between focus:shadow-[0_0_8px_2px_var(--boltdiy-accent-neon)]"
              style={{ minHeight: '40px', display: 'flex', justifyContent: 'space-between', textAlign: 'left', alignItems: 'center' }}
            >
              <span>{formatThemeName(availableThemes.find(t => t === theme) || theme)}</span>
              <span aria-hidden="true">▼</span>
            </Button>
          </DropdownMenuPrimitives.Trigger>
          <DropdownMenuPrimitives.Content> {/* Assuming Dropdown exports Content or use Primitives.Content */}
            {availableThemes.map((themeOption) => (
              <DropdownItem
                key={themeOption}
                onClick={() => setTheme(themeOption)}
              >
                {formatThemeName(themeOption)}
                {theme === themeOption && <span style={{ marginLeft: 'auto', color: 'var(--boltdiy-accent-neon)'}} aria-hidden="true"> ✓</span>}
              </DropdownItem>
            ))}
          </DropdownMenuPrimitives.Content>
        </DropdownRoot>
      </SettingItemWrapper>

      {/* AI Model Selection */}
      <SettingItemWrapper label="AI Model" iconChar="🧠">
        <DropdownRoot>
          <DropdownMenuPrimitives.Trigger asChild>
            <Button variant="default" className="w-full justify-between focus:shadow-[0_0_8px_2px_var(--boltdiy-accent-neon)]" style={{ minHeight: '40px', display: 'flex', justifyContent: 'space-between', textAlign: 'left', alignItems: 'center' }}>
              <span>{aiModel}</span>
              <span aria-hidden="true">▼</span>
            </Button>
          </DropdownMenuPrimitives.Trigger>
          <DropdownMenuPrimitives.Content>
            {['BoltDIY-Turbo', 'BoltDIY-Creative', 'BoltDIY-PreciseV2'].map(model => (
              <DropdownItem key={model} onClick={() => setAiModel(model)}>
                {model}
                {aiModel === model && <span style={{ marginLeft: 'auto', color: 'var(--boltdiy-accent-neon)'}} aria-hidden="true"> ✓</span>}
              </DropdownItem>
            ))}
          </DropdownMenuPrimitives.Content>
        </DropdownRoot>
      </SettingItemWrapper>

      {/* Language Selection (Placeholder Button) */}
      <SettingItemWrapper label="Language" iconChar="🌐">
         <Button variant="default" className="w-full focus:shadow-[0_0_8px_2px_var(--boltdiy-accent-neon)]" style={{ minHeight: '40px', justifyContent: 'flex-start' }}>
          {language} (Placeholder)
        </Button>
      </SettingItemWrapper>

      {/* Storage Options (Placeholder Button) */}
       <SettingItemWrapper label="Storage Options" iconChar="💾">
         <Button variant="default" className="w-full focus:shadow-[0_0_8px_2px_var(--boltdiy-accent-neon)]" style={{ minHeight: '40px', justifyContent: 'flex-start' }}>
          {storageOption} (Placeholder)
        </Button>
      </SettingItemWrapper>

      {/* Enable Notifications Toggle */}
      <SettingItemWrapper label="Enable Notifications" iconChar="🔔">
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Switch
            checked={enableNotifications}
            onCheckedChange={setEnableNotifications}
            id="notifications-switch" // Important for accessibility if label is linked via htmlFor
          />
        </div>
      </SettingItemWrapper>

      {/* Data Sync Frequency Slider */}
      <SettingItemWrapper label={`Data Sync Frequency: ${dataSyncFrequency} mins`} iconChar="⏱️">
        <Slider
          defaultValue={[dataSyncFrequency]}
          max={120}
          step={15}
          onValueChange={(value) => setDataSyncFrequency(value[0])}
          // className="w-full" // Ensure Slider component is styled to be full width if needed
        />
      </SettingItemWrapper>

      {/* TODO: Add more settings as needed */}
      {/* TODO: Consider a 'Save' button or if settings apply instantly */}
    </div>
  );
}

export default SettingsScreen;
