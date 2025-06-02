import React, { useState, useEffect, useRef } from "react";
import styles from './BoltDIY.module.scss';
import { Settings, Edit3, ArrowLeft, Save, Play, Zap } from 'lucide-react';

const boltThemes = {
  defaultLight: {
    themeType: 'light', // For potential future use with styles.darkMode/lightMode classes
    primaryColor: '#007AFF',
    secondaryColor: '#5856D6',
    backgroundColor: '#F9F9F9',
    surfaceColor: '#FFFFFF',
    textPrimaryColor: '#000000',
    textSecondaryColor: 'rgba(60, 60, 67, 0.6)',
    borderColor: '#D1D1D6',
    errorColor: '#FF3B30',
    successColor: '#34C759',
    // Derived/Component-specific
    headerBgColor: '#FFFFFF', // Surface for header
    headerTextColor: '#007AFF', // Primary for header text
    chatAiBgColor: '#FFFFFF',   // Surface for AI chat
    chatUserBgColor: '#007AFF', // Primary for user chat
    chatUserTextColor: '#FFFFFF', // White text on primary
    inputAreaBgColor: '#F9F9F9', // Background for input area
    inputFieldBgColor: '#FFFFFF', // Surface for input fields
    inputFieldTextColor: '#000000', // Primary text for inputs
    buttonPrimaryBgColor: '#007AFF', // Primary for buttons
    buttonPrimaryTextColor: '#FFFFFF', // White text on primary buttons
    iconBtnColor: '#007AFF', // Primary for icon buttons
    settingsLabelColor: 'rgba(60, 60, 67, 0.6)', // Secondary text for labels
  },
  oledDark: {
    themeType: 'dark',
    primaryColor: '#0A84FF',
    secondaryColor: '#5E5CE6',
    backgroundColor: '#000000',
    surfaceColor: '#1C1C1E',
    textPrimaryColor: '#FFFFFF',
    textSecondaryColor: 'rgba(235, 235, 245, 0.6)',
    borderColor: '#38383A',
    errorColor: '#FF453A',
    successColor: '#30D158',
    headerBgColor: '#1C1C1E', // Surface for header
    headerTextColor: '#0A84FF', // Primary for header text
    chatAiBgColor: '#1C1C1E',   // Surface for AI chat
    chatUserBgColor: '#0A84FF', // Primary for user chat
    chatUserTextColor: '#FFFFFF', // White text on primary
    inputAreaBgColor: '#000000', // Background for input area
    inputFieldBgColor: '#1C1C1E', // Surface for input fields
    inputFieldTextColor: '#FFFFFF', // Primary text for inputs
    buttonPrimaryBgColor: '#0A84FF', // Primary for buttons
    buttonPrimaryTextColor: '#FFFFFF', // White text on primary buttons
    iconBtnColor: '#0A84FF', // Primary for icon buttons
    settingsLabelColor: 'rgba(235, 235, 245, 0.6)', // Secondary text for labels
  },
  crimsonWave: {
    themeType: 'light', // Or could be dark depending on specific choices
    primaryColor: '#D90429',
    secondaryColor: '#FFB703',
    backgroundColor: '#FDF0F0',
    surfaceColor: '#FFFFFF',
    textPrimaryColor: '#2B2D42',
    textSecondaryColor: '#8D99AE',
    borderColor: '#EDF2F4',
    errorColor: '#D90429',
    successColor: '#0ead69',
    headerBgColor: '#FFFFFF',
    headerTextColor: '#D90429',
    chatAiBgColor: '#FFFFFF',
    chatUserBgColor: '#D90429',
    chatUserTextColor: '#FFFFFF',
    inputAreaBgColor: '#FDF0F0',
    inputFieldBgColor: '#FFFFFF',
    inputFieldTextColor: '#2B2D42',
    buttonPrimaryBgColor: '#D90429',
    buttonPrimaryTextColor: '#FFFFFF',
    iconBtnColor: '#D90429',
    settingsLabelColor: '#8D99AE',
  }
};

export default function BoltDIY() {
  const appRef = useRef<HTMLDivElement>(null);
  const [currentThemeName, setCurrentThemeName] = useState('defaultLight'); // Default, will be updated by useEffect

  const [page, setPage] = useState("chat");
  const [darkMode, setDarkMode] = useState(true); // This will be replaced by the new theme system
  const [aiModel, setAiModel] = useState("llama");
  const [language, setLanguage] = useState("ar");
  const [storage, setStorage] = useState("localStorage");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([ { id: 1, from: "ai", text: "مرحبًا بك! كيف يمكنني مساعدتك اليوم؟" }, ]);
  const [code, setCode] = useState("// اكتب كودك هنا\n");

  const applyTheme = (themeNameKey, themesObject) => {
    if (!appRef.current || !themesObject[themeNameKey]) {
      // console.warn(`Theme ${themeNameKey} or appRef not found, or themesObject empty.`);
      return;
    }
    const selectedTheme = themesObject[themeNameKey];
    for (const colorKey in selectedTheme) {
      if (Object.hasOwnProperty.call(selectedTheme, colorKey)) {
        // Converts camelCase (e.g., primaryColor) to kebab-case (e.g., --bolt-primary-color)
        const cssVar = `--bolt-${colorKey.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        appRef.current.style.setProperty(cssVar, selectedTheme[colorKey]);
      }
    }
  };

  useEffect(() => {
    const storedThemeName = localStorage.getItem('boltDIYTheme');
    let initialThemeName = 'defaultLight'; // Default fallback

    if (storedThemeName && boltThemes[storedThemeName]) {
      initialThemeName = storedThemeName;
    } else {
      // No valid theme in localStorage, check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && boltThemes.oledDark) {
        initialThemeName = 'oledDark';
      } else if (boltThemes.defaultLight) { // Fallback to defaultLight if oledDark isn't defined or system is light
        initialThemeName = 'defaultLight';
      }
      // If boltThemes is empty initially, initialThemeName will remain 'defaultLight'
      // and the next useEffect will apply it once boltThemes is populated.
    }
    setCurrentThemeName(initialThemeName);

    // Listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const userSetTheme = localStorage.getItem('boltDIYTheme');
      if (!userSetTheme) { // Only change if no theme is explicitly set by the user
        if (e.matches && boltThemes.oledDark) {
          setCurrentThemeName('oledDark');
        } else if (boltThemes.defaultLight) {
          setCurrentThemeName('defaultLight');
        }
      }
    };

    // Check if addEventListener is supported (it is in modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) { // Deprecated but for fallback
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) { // Deprecated but for fallback
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []); // Runs once on mount. boltThemes is assumed stable after definition.

  useEffect(() => {
    // Apply theme whenever currentThemeName changes
    // Ensure boltThemes has keys before trying to apply.
    if (Object.keys(boltThemes).length > 0 && currentThemeName && boltThemes[currentThemeName]) {
      applyTheme(currentThemeName, boltThemes);
      localStorage.setItem('boltDIYTheme', currentThemeName);

      // Optional: Update the old darkMode state for compatibility or other logic
      // if (boltThemes[currentThemeName]?.themeType === 'dark') {
      //   setDarkMode(true);
      // } else {
      //   setDarkMode(false);
      // }
    } else if (Object.keys(boltThemes).length > 0 && !boltThemes[currentThemeName]) {
      // Fallback if currentThemeName is somehow invalid but themes are loaded
      // console.warn(`Theme ${currentThemeName} not found in boltThemes, reverting to defaultLight.`);
      // setCurrentThemeName('defaultLight'); // This could cause a loop if defaultLight also fails. Handle carefully.
    }
  }, [currentThemeName]); // Dependency on currentThemeName


const sendPrompt = () => { if (!prompt.trim()) return; setMessages((m) => [...m, { id: Date.now(), from: "user", text: prompt }]); setPrompt(""); setTimeout(() => { setMessages((m) => [ ...m, { id: Date.now() + 1, from: "ai", text: "تم استلام طلبك، جاري المعالجة..." }, ]); }, 900); };

const runCode = () => alert("تشغيل الكود:\n" + code);

const Header = ({ title, leftButton, rightButtons }) => ( <header className={styles.header}> {leftButton && <button className={styles.iconBtn} onClick={leftButton.onClick}>{leftButton.icon}</button>} <h1>{title}</h1> <div className={styles.rightButtons}> {rightButtons && rightButtons.map((btn, i) => ( <button key={i} className={styles.iconBtn} onClick={btn.onClick}>{btn.icon}</button> ))} </div> </header> );

const ChatScreen = () => ( <div className={styles.screen}> <Header title="bolt.diy" rightButtons={[ { icon: <Settings size={20} />, onClick: () => setPage("settings") }, { icon: <Edit3 size={20} />, onClick: () => setPage("editor") } ]} /> <main className={styles.chatArea}> {messages.map(({ id, from, text }) => ( <div key={id} className={`${styles.chatMessage} ${styles[from]}`}>{text}</div> ))} </main> <footer className={styles.inputArea}> <input type="text" placeholder="Type your prompt…" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendPrompt()} /> <button onClick={sendPrompt} className={styles.sendBtn}><Zap size={20} /></button> </footer> </div> );

const SettingsScreen = () => ( <div className={styles.screen}> <Header title="الإعدادات" leftButton={{ icon: <ArrowLeft size={20} />, onClick: () => setPage("chat") }} /> <main className={styles.settingsArea}>
          <label>
            Theme
            <select value={currentThemeName} onChange={(e) => setCurrentThemeName(e.target.value)}>
              {Object.keys(boltThemes).map((themeKey) => (
                <option key={themeKey} value={themeKey}>
                  {themeKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </option>
              ))}
            </select>
          </label>
          <label>
            الوضع الليلي {/* This is now controlled by theme type, consider removing or making it read-only display of current theme type */}
            <input type="checkbox" checked={boltThemes[currentThemeName]?.themeType === 'dark'} readOnly />
          </label>
          <label>
            نموذج الذكاء الاصطناعي
            <select value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
              <option value="llama">LLaMA</option>
              <option value="gpt">GPT</option>
              <option value="custom">مخصص</option>
            </select>
          </label>
          <label>
            اللغة
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </label>
          <label>
            خيارات التخزين
            <select value={storage} onChange={(e) => setStorage(e.target.value)}>
              <option value="localStorage">LocalStorage</option>
              <option value="cloudflareKV">Cloudflare KV</option>
            </select>
          </label>
        </main> </div> );

const EditorScreen = () => ( <div className={styles.screen}> <Header title="المحرر" leftButton={{ icon: <ArrowLeft size={20} />, onClick: () => setPage("chat") }} rightButtons={[ { icon: <Save size={20} />, onClick: () => alert("تم الحفظ!") }, { icon: <Play size={20} />, onClick: runCode } ]} /> <main className={styles.editorArea}> <textarea className={styles.codeEditor} value={code} onChange={(e) => setCode(e.target.value)} /> </main> </div> );

return ( <div ref={appRef} className={`${styles.app} ${boltThemes[currentThemeName]?.themeType === 'dark' ? styles.darkMode : styles.lightMode}`}>
  {/* The styles.darkMode / styles.lightMode might become redundant if all styling is via CSS vars */}
  {/* Or they can be kept if they apply non-variable styles (e.g. specific body background image) */}
  {page === "chat" && <ChatScreen />}
  {page === "settings" && <SettingsScreen />}
  {page === "editor" && <EditorScreen />}
</div>

); }
