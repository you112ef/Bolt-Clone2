import React, { useState } from "react";

export default function BoltDIY() {
  const [page, setPage] = useState("chat");

  // Settings state
  const [darkMode, setDarkMode] = useState(true);
  const [aiModel, setAiModel] = useState("llama");
  const [language, setLanguage] = useState("ar");
  const [storage, setStorage] = useState("localStorage");

  // Chat state
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, from: "ai", text: "مرحبًا بك! كيف يمكنني مساعدتك اليوم؟" },
  ]);

  // Editor state
  const [code, setCode] = useState("// اكتب كودك هنا\n");

  // Handlers
  const sendPrompt = () => {
    if (!prompt.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "user", text: prompt }]);
    setPrompt("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: "ai", text: "تم استلام طلبك، جاري المعالجة..." },
      ]);
    }, 900);
  };

  const runCode = () => alert("تشغيل الكود:\n" + code);

  // UI Components
  const Header = ({ title, leftButton, rightButtons }) => (
    <header className="header">
      {leftButton && <button className="icon-btn" onClick={leftButton.onClick} aria-label={leftButton.label}>{leftButton.icon}</button>}
      <h1>{title}</h1>
      <div className="right-buttons">
        {rightButtons && rightButtons.map((btn, i) => (
          <button
            key={i}
            className="icon-btn"
            onClick={btn.onClick}
            aria-label={btn.label}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </header>
  );

  // Screens
  const ChatScreen = () => (
    <div className="screen">
      <Header
        title="bolt.diy"
        rightButtons={[
          { icon: "⚙️", label: "Settings", onClick: () => setPage("settings") },
          { icon: "📝", label: "Editor", onClick: () => setPage("editor") },
        ]}
      />

      <main className="chat-area" role="log" aria-live="polite">
        {messages.map(({ id, from, text }) => (
          <div
            key={id}
            className={`chat-message ${from === "ai" ? "ai" : "user"}`}
          >
            {text}
          </div>
        ))}
      </main>

      <footer className="input-area">
        <input
          type="text"
          placeholder="Type your prompt…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendPrompt()}
          spellCheck={false}
          autoComplete="off"
          aria-label="Prompt input"
        />
        <button onClick={sendPrompt} className="send-btn" aria-label="Send prompt">
          ⚡️
        </button>
      </footer>
    </div>
  );

  const SettingsScreen = () => (
    <div className="screen">
      <Header
        title="الإعدادات"
        leftButton={{ icon: "←", label: "Back", onClick: () => setPage("chat") }}
      />
      <main className="settings-area">
        <label className="setting-item">
          الوضع الليلي
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          />
          <span className="slider" />
        </label>

        <label className="setting-item">
          نموذج الذكاء الاصطناعي
          <select
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            aria-label="Select AI model"
          >
            <option value="llama">LLaMA</option>
            <option value="gpt">GPT</option>
            <option value="custom">مخصص</option>
          </select>
        </label>

        <label className="setting-item">
          اللغة
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select language"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </label>

        <label className="setting-item">
          خيارات التخزين
          <select
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            aria-label="Select storage option"
          >
            <option value="localStorage">LocalStorage</option>
            <option value="cloudflareKV">Cloudflare KV</option>
          </select>
        </label>
      </main>
    </div>
  );

  const EditorScreen = () => (
    <div className="screen">
      <Header
        title="المحرر"
        leftButton={{ icon: "←", label: "Back", onClick: () => setPage("chat") }}
        rightButtons={[
          { icon: "💾", label: "Save", onClick: () => alert("تم الحفظ!") },
          { icon: "▶️", label: "Run", onClick: runCode },
        ]}
      />

      <main className="editor-area">
        <textarea
          className="code-editor"
          spellCheck={false}
          autoComplete="off"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-label="Code editor"
        />
      </main>
    </div>
  );

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`} role="main">
      {page === "chat" && <ChatScreen />}
      {page === "settings" && <SettingsScreen />}
      {page === "editor" && <EditorScreen />}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        /* Root app container simulating Android phone frame */
        .app {
          font-family: 'Orbitron', sans-serif, monospace, monospace;
          max-width: 420px;
          height: 100vh;
          margin: 0 auto;
          border: 12px solid #1c003c;
          border-radius: 36px;
          box-shadow: 0 0 40px #bb33ff88;
          display: flex;
          flex-direction: column;
  background: #000000; /* MODIFIED for OLED */
          color: #eee;
          user-select: none;
          overflow: hidden;
        }

        .dark-mode {
          background: #000000; /* MODIFIED for OLED */
          color: #eee;
        }
        .light-mode {
          background: #f5f5f5;
          color: #222;
        }

        /* Screen wrapper */
        .screen {
          display: flex;
          flex-direction: column;
          height: 100%; /* Changed from 100vh to fill available space */
          padding: 12px 16px 16px;
          box-sizing: border-box;
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #330066;
          padding-bottom: 6px;
          margin-bottom: 12px;
        }
        .header h1 {
          flex-grow: 1;
          text-align: center;
          font-weight: 700;
          font-size: 1.4rem; /* MODIFIED for better fit */
          color: #bb33ff;
          margin: 0;
          user-select: none;
          word-wrap: break-word; /* ADDED */
          word-break: break-word; /* ADDED */
        }
        .icon-btn {
          background: transparent;
          border: none;
          color: #bb33ff;
  font-size: 1.6rem; /* Icon size */
  padding: 10px; /* MODIFIED for larger touch target */
          border-radius: 50%;
          cursor: pointer;
          transition: box-shadow 0.2s ease;
          user-select: none;
  min-width: 44px; /* ADDED */
  min-height: 44px; /* ADDED */
  display: inline-flex; /* ADDED */
  align-items: center; /* ADDED */
  justify-content: center; /* ADDED */
        }
        .icon-btn:hover,
        .icon-btn:focus {
          box-shadow: 0 0 12px #bb33ff88;
          outline: none;
        }
        .right-buttons {
          display: flex;
          gap: 8px;
        }

        /* Chat area */
        .chat-area {
          flex-grow: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-right: 4px; /* For scrollbar visibility */
        }
        .chat-message {
          max-width: 75%;
          padding: 12px 16px;
          border-radius: 18px;
          font-weight: 700;
          font-size: 1rem;
          line-height: 1.3;
          user-select: text; /* Allow text selection for messages */
          box-shadow: 0 4px 8px rgba(187, 51, 255, 0.3);
          transition: box-shadow 0.3s ease;
          word-wrap: break-word; /* Ensure long words break */
          word-break: break-word; /* Ensure long words break - for CJK etc. */
        }
        .chat-message.ai {
          background: #2a0055; /* Darker purple for AI */
          align-self: flex-start;
          color: #bb99ff; /* Lighter purple text for AI */
          border: 1.5px solid #bb33ff; /* Neon purple border */
          box-shadow: 0 0 12px #bb33ffaa; /* Neon purple glow */
        }
        .chat-message.user {
          background: #440077; /* Slightly lighter purple for User */
          align-self: flex-end;
          color: #fff; /* White text for user */
          border: 1.5px solid #bb33ff; /* Neon purple border */
          box-shadow: 0 0 14px #bb33ffdd; /* Brighter neon purple glow */
        }

        /* Input area */
        .input-area {
          display: flex;
          align-items: center; /* Vertically center items */
          padding: 12px 0; /* Padding top and bottom */
          border-top: 1px solid #330066; /* Separator line */
          gap: 8px; /* Space between input and button */
        }
        .input-area input[type="text"] {
          flex-grow: 1; /* Input field takes available space */
          padding: 12px 16px;
          border-radius: 20px; /* Rounded corners */
          border: 1.5px solid #bb33ff; /* Neon purple border */
          background: #1c003c; /* Dark input background */
          color: #eee; /* Light text color */
          font-size: 1rem;
          font-family: inherit; /* Use app's font */
          box-shadow: inset 0 0 8px #bb33ff66; /* Inner glow */
          outline: none; /* Remove default focus outline */
          transition: box-shadow 0.3s ease;
        }
        .input-area input[type="text"]:focus {
          box-shadow: inset 0 0 10px #bb33ffaa, 0 0 10px #bb33ffaa; /* Enhanced glow on focus */
        }
        .input-area input[type="text"]::placeholder {
          color: #bb99ffaa; /* Lighter, slightly transparent placeholder */
          font-style: italic;
        }
        .send-btn {
          background: #bb33ff; /* Neon purple background */
          color: #1c003c; /* Dark icon color */
          font-size: 1.8rem; /* Larger icon */
  padding: 12px; /* MODIFIED for better shape and touch target */
          border-radius: 50%; /* Circular button */
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px #bb33ffcc; /* Neon glow */
  min-width: 48px; /* ADDED */
  min-height: 48px; /* ADDED */
        }
        .send-btn:hover,
        .send-btn:focus {
          background-color: #cc66ff; /* Lighter purple on hover/focus */
          box-shadow: 0 0 15px #bb33ff; /* Enhanced glow */
          outline: none;
        }

        /* Settings Screen Specifics */
        .settings-area {
          display: flex;
          flex-direction: column;
          gap: 20px; /* Space between setting items */
          padding: 16px;
          overflow-y: auto; /* Scroll if content overflows */
        }
        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          color: #bb99ff; /* Lighter purple for setting text */
          padding: 10px 0;
          border-bottom: 1px solid #33006633; /* Subtle separator */
          word-break: break-word; /* ADDED to allow text label to wrap */
        }
        .setting-item:last-child {
          border-bottom: none; /* No border for the last item */
        }
        .setting-item select,
        .setting-item input[type="checkbox"] {
          font-family: inherit;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid #bb33ff;
          background: #1c003c;
          color: #eee;
          font-size: 1rem;
          min-width: 120px; /* Ensure select boxes have a decent width */
  min-height: 44px; /* ADDED for touch target */
  box-sizing: border-box; /* ADDED to include padding and border in min-height */
        }
        .setting-item input[type="checkbox"] {
          min-width: auto; /* Reset min-width for checkboxes */
          appearance: none;
  width: 24px; /* MODIFIED */
  height: 24px; /* MODIFIED */
          border-radius: 4px;
          position: relative;
          cursor: pointer;
          outline: none;
          transition: background-color 0.2s, border-color 0.2s;
        }
        .setting-item input[type="checkbox"]:checked {
          background-color: #bb33ff;
          border-color: #cc66ff;
        }
        .setting-item input[type="checkbox"]::before {
          content: '✔';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
  font-size: 16px; /* MODIFIED for larger checkbox */
          color: #1c003c;
          visibility: hidden;
        }
        .setting-item input[type="checkbox"]:checked::before {
          visibility: visible;
        }
        /* Simple slider for checkbox - can be enhanced */
        .slider {
          /* Basic styling if needed, often handled by checkbox itself or ::before/::after */
        }

        /* Editor Screen Specifics */
        .editor-area {
          flex-grow: 1; /* Take available vertical space */
          display: flex; /* Allow textarea to fill */
          padding-top: 8px;
        }
        .code-editor {
          flex-grow: 1; /* Fill available space */
          background: #0d001a; /* Very dark purple, almost black */
          color: #f0f0f0; /* Light grey text for code */
          border: 1px solid #330066;
          border-radius: 8px;
          padding: 12px;
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace; /* Monospaced font for code */
          font-size: 0.95rem;
          line-height: 1.5;
          outline: none;
          resize: none; /* Disable manual resizing */
          box-shadow: inset 0 0 10px #bb33ff33; /* Subtle inner glow */
        }
        .code-editor::selection {
          background: #bb33ff88; /* Purple selection color */
        }

        /* Scrollbar styling for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px; /* Thinner scrollbar */
        }
        ::-webkit-scrollbar-track {
          background: #1c003c; /* Dark track */
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: #bb33ff; /* Neon purple thumb */
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #cc66ff; /* Lighter purple on hover */
        }

        /* General accessibility improvements */
        [role="button"], button, input[type="button"], input[type="submit"], select {
          cursor: pointer; /* Ensure cursor indicates interactivity */
        }
        [aria-label] {
          /* Consider adding visual cues for aria-labels in a debug mode */
        }
      `}</style>  {/* Added backtick here */}
    </div>
  );
}
