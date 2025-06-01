import React, { useState } from 'react';
import styles from '~/styles/boltdiy.module.scss'; // Assuming SCSS modules are set up

// Placeholder for Neon-Style Icons (simple divs for now)
const NeonIconPlaceholder = ({ name, size = 24 }: { name: string, size?: number }) => (
  <div
    aria-label={`${name} icon`}
    className={styles.neonIcon} // Apply general neon color
    style={{
      width: size,
      height: size,
      border: `2px solid var(--boltdiy-neon-purple)`, // Example visual
      borderRadius: '50%',
      marginRight: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${size * 0.5}px`
    }}
  >
    {name.substring(0,1).toUpperCase()} {/* Placeholder visual: first letter */}
  </div>
);

// Placeholder for a custom styled Toggle Switch
const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (checked: boolean) => void }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
    <span className={styles.label} style={{ marginBottom: 0 }}>{label}</span>
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${styles.button} ${checked ? styles.glowingOutline : ''}`}
      style={{
        width: '60px',
        height: '34px',
        borderRadius: '17px',
        position: 'relative',
        padding: '2px', // to contain the inner circle
        backgroundColor: checked ? 'var(--boltdiy-neon-purple)' : 'rgba(255,255,255,0.1)',
      }}
    >
      <span style={{
        display: 'block',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: 'var(--boltdiy-text)',
        position: 'absolute',
        top: '3px',
        left: checked ? '29px' : '3px',
        transition: 'left 0.2s ease-in-out',
      }}></span>
    </button>
  </div>
);

// Placeholder for a custom styled Slider
const Slider = ({ label, value, onChange }: { label: string, value: number, onChange: (value: number) => void }) => (
  <div style={{ marginBottom: '20px' }}>
    <label className={styles.label} htmlFor={`${label}-slider`}>{label}: {value}</label>
    <input
      type="range"
      id={`${label}-slider`}
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: '100%',
        accentColor: 'var(--boltdiy-neon-purple)', // Styles the thumb and track in modern browsers
        cursor: 'pointer',
      }}
    />
  </div>
);

// Placeholder for a custom styled Dropdown
const Dropdown = ({ label, options, selected, onChange }: { label:string, options: string[], selected: string, onChange: (value: string) => void }) => (
  <div style={{ marginBottom: '20px' }}>
    <label className={styles.label} htmlFor={`${label}-dropdown`}>{label}</label>
    <select
      id={`${label}-dropdown`}
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.button} ${styles.glowingOutlineFocus}`} // Apply focus glow
      style={{
        width: '100%',
        padding: '12px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: 'var(--boltdiy-text)',
        border: `1px solid var(--boltdiy-neon-purple)`,
        borderRadius: '8px',
        fontFamily: 'var(--boltdiy-font-family)',
      }}
    >
      {options.map(opt => <option key={opt} value={opt} style={{ backgroundColor: 'var(--boltdiy-bg)', color: 'var(--boltdiy-text)' }}>{opt}</option>)}
    </select>
  </div>
);


export function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [aiModel, setAiModel] = useState('BoltDIY-Turbo');
  const [language, setLanguage] = useState('English');
  const [storageOption, setStorageOption] = useState('LocalStorage');
  const [sliderValue, setSliderValue] = useState(50); // Example slider

  const settingSections = [
    {
      title: 'Appearance',
      icon: 'palette',
      settings: [
        { type: 'toggle', label: 'Dark Theme', checked: isDarkTheme, action: setIsDarkTheme },
        // Add more appearance settings if needed
      ]
    },
    {
      title: 'AI Configuration',
      icon: 'brain',
      settings: [
        { type: 'dropdown', label: 'AI Model', options: ['BoltDIY-Turbo', 'BoltDIY-Creative', 'BoltDIY-Precise'], selected: aiModel, action: setAiModel },
        { type: 'slider', label: 'AI Temperature', value: sliderValue, action: setSliderValue }, // Example
      ]
    },
    {
      title: 'General',
      icon: 'settings',
      settings: [
        { type: 'dropdown', label: 'Language', options: ['English', 'Spanish', 'Arabic (Placeholder)'], selected: language, action: setLanguage },
        { type: 'dropdown', label: 'Storage', options: ['LocalStorage', 'Cloudflare KV', 'None'], selected: storageOption, action: setStorageOption },
      ]
    }
  ];

  return (
    <div className={`${styles.boltdiyContainer}`} style={{ paddingTop: '20px' }}>
      <h1 className={styles.h1} style={{ textAlign: 'center', marginBottom: '30px' }}>Settings</h1>

      {settingSections.map(section => (
        <div key={section.title} className={`${styles.roundedCorners}`} style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <NeonIconPlaceholder name={section.icon} />
            <h2 className={styles.h1} style={{ fontSize: '20px', color: 'var(--boltdiy-neon-purple)', margin: 0 }}>{section.title}</h2>
          </div>

          {section.settings.map(setting => (
            <div key={setting.label}>
              {setting.type === 'toggle' && (
                <ToggleSwitch label={setting.label} checked={(setting as any).checked} onChange={(setting as any).action} />
              )}
              {setting.type === 'dropdown' && (
                <Dropdown label={setting.label} options={(setting as any).options} selected={(setting as any).selected} onChange={(setting as any).action} />
              )}
              {setting.type === 'slider' && (
                <Slider label={setting.label} value={(setting as any).value} onChange={(setting as any).action} />
              )}
            </div>
          ))}
        </div>
      ))}
      {/* TODO: Add a 'Save Settings' button if needed, or settings could apply instantly */}
    </div>
  );
}

export default SettingsScreen;
