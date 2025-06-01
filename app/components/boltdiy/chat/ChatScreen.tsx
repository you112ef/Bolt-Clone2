import React, { useState } from 'react';
import styles from '~/styles/boltdiy.module.scss'; // Assuming SCSS modules are set up

// Placeholder for a Lightning Bolt Icon
const LightningBoltIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.96112 13.0389H13.0389L9.36112 22.6389L17.0389 10.9611H10.9611L14.6389 1.36111L6.96112 13.0389Z" />
  </svg>
);

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'ai' },
    { id: '2', text: 'What is bolt.diy?', sender: 'user' },
    { id: '3', text: 'bolt.diy is a smart web app designed for DIY enthusiasts!', sender: 'ai' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;
    const newMessage: Message = {
      id: String(Date.now()),
      text: inputText,
      sender: 'user',
    };
    // Simulate AI response for now
    const aiResponse: Message = {
      id: String(Date.now() + 1),
      text: `You said: "${inputText}". I am a helpful AI.`,
      sender: 'ai',
    };
    setMessages([...messages, newMessage, aiResponse]);
    setInputText('');
  };

  return (
    <div className={`${styles.boltdiyContainer}`} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header (Optional - not specified, keeping minimal for now) */}
      {/* <header style={{ padding: '10px', textAlign: 'center', borderBottom: `1px solid ${styles.boltdiyNeonPurple}` }}>
        <h1 className={styles.h1} style={{ margin: 0, fontSize: '20px' }}>bolt.diy Chat</h1>
      </header> */}

      {/* Message Area */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.roundedCorners}`}
            style={{
              backgroundColor: msg.sender === 'ai' ? 'rgba(255,255,255,0.05)' : 'rgba(160, 32, 240, 0.2)', // AI slightly dimmer, user purple-tinted
              padding: '12px',
              marginBottom: '12px',
              maxWidth: '80%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginLeft: msg.sender === 'user' ? 'auto' : '0',
              marginRight: msg.sender === 'ai' ? 'auto' : '0',
              textAlign: msg.sender === 'user' ? 'right' : 'left', // Align text based on sender
            }}
          >
            <p style={{ margin: 0, color: styles.boltdiyText }}>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div
        className={`${styles.glowingOutlineFocus}`} // Apply focus glow to the container
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          borderTop: `1px solid var(--boltdiy-neon-purple)`, // Neon top border
          backgroundColor: 'var(--boltdiy-bg)', // Ensure consistent bg
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your prompt…"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flexGrow: 1,
            padding: '12px 15px',
            backgroundColor: 'rgba(255,255,255,0.05)', // Slightly different from main bg
            color: 'var(--boltdiy-text)',
            border: '1px solid var(--boltdiy-neon-purple)', // Neon border for input itself
            borderRadius: '20px', // Rounded input field
            marginRight: '10px',
            fontFamily: 'var(--boltdiy-font-family)',
            fontSize: '16px',
            outline: 'none', // Custom focus handled by parent
          }}
        />
        <button
          onClick={handleSend}
          className={`${styles.button} ${styles.iconButton} ${styles.glowingOutline}`}
          aria-label="Send prompt"
          style={{
            borderRadius: '50%', // Circular button
            width: '48px',
            height: '48px',
            padding: '0', // Reset padding for icon button
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LightningBoltIcon />
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
