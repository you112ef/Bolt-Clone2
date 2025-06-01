import React, { useState } from "react";
import styles from './BoltDIY.module.scss';

export default function BoltDIY() { const [page, setPage] = useState("chat"); const [darkMode, setDarkMode] = useState(true); const [aiModel, setAiModel] = useState("llama"); const [language, setLanguage] = useState("ar"); const [storage, setStorage] = useState("localStorage"); const [prompt, setPrompt] = useState(""); const [messages, setMessages] = useState([ { id: 1, from: "ai", text: "مرحبًا بك! كيف يمكنني مساعدتك اليوم؟" }, ]); const [code, setCode] = useState("// اكتب كودك هنا
");

const sendPrompt = () => { if (!prompt.trim()) return; setMessages((m) => [...m, { id: Date.now(), from: "user", text: prompt }]); setPrompt(""); setTimeout(() => { setMessages((m) => [ ...m, { id: Date.now() + 1, from: "ai", text: "تم استلام طلبك، جاري المعالجة..." }, ]); }, 900); };

const runCode = () => alert("تشغيل الكود:
" + code);

const Header = ({ title, leftButton, rightButtons }) => ( <header className={styles.header}> {leftButton && <button className={styles.iconBtn} onClick={leftButton.onClick}>{leftButton.icon}</button>} <h1>{title}</h1> <div className={styles.rightButtons}> {rightButtons && rightButtons.map((btn, i) => ( <button key={i} className={styles.iconBtn} onClick={btn.onClick}>{btn.icon}</button> ))} </div> </header> );

const ChatScreen = () => ( <div className={styles.screen}> <Header title="bolt.diy" rightButtons={[{ icon: "⚙️", onClick: () => setPage("settings") }, { icon: "📝", onClick: () => setPage("editor") }]} /> <main className={styles.chatArea}> {messages.map(({ id, from, text }) => ( <div key={id} className={`${styles.chatMessage} ${styles[from]}`}>{text}</div> ))} </main> <footer className={styles.inputArea}> <input type="text" placeholder="Type your prompt…" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendPrompt()} /> <button onClick={sendPrompt} className={styles.sendBtn}>⚡️</button> </footer> </div> );

const SettingsScreen = () => ( <div className={styles.screen}> <Header title="الإعدادات" leftButton={{ icon: "←", onClick: () => setPage("chat") }} /> <main className={styles.settingsArea}> <label> الوضع الليلي <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> </label> <label> نموذج الذكاء الاصطناعي <select value={aiModel} onChange={(e) => setAiModel(e.target.value)}> <option value="llama">LLaMA</option> <option value="gpt">GPT</option> <option value="custom">مخصص</option> </select> </label> <label> اللغة <select value={language} onChange={(e) => setLanguage(e.target.value)}> <option value="ar">العربية</option> <option value="en">English</option> </select> </label> <label> خيارات التخزين <select value={storage} onChange={(e) => setStorage(e.target.value)}> <option value="localStorage">LocalStorage</option> <option value="cloudflareKV">Cloudflare KV</option> </select> </label> </main> </div> );

const EditorScreen = () => ( <div className={styles.screen}> <Header title="المحرر" leftButton={{ icon: "←", onClick: () => setPage("chat") }} rightButtons={[{ icon: "💾", onClick: () => alert("تم الحفظ!") }, { icon: "▶️", onClick: runCode }]} /> <main className={styles.editorArea}> <textarea className={styles.codeEditor} value={code} onChange={(e) => setCode(e.target.value)} /> </main> </div> );

return ( <div className={`${styles.app} ${darkMode ? styles.darkMode : styles.lightMode}`}> {page === "chat" && <ChatScreen />} {page === "settings" && <SettingsScreen />} {page === "editor" && <EditorScreen />}
</div>

); }
