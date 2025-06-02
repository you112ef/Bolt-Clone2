import React, { useState, useEffect, useRef } from 'react';
import { Input } from '~/components/boltdiy/ui/Input'; // Path to themed Input
import { Button } from '~/components/boltdiy/ui/Button'; // Path to themed Button
// Placeholder for a WebP Lightning Bolt Icon (20x20px)
// In a real scenario, this would be an <img src="path/to/icon.webp" /> or an SVG component
const LightningBoltIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.96112 13.0389H13.0389L9.36112 22.6389L17.0389 10.9611H10.9611L14.6389 1.36111L6.96112 13.0389Z" />
  </svg>
);

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Welcome to Bolt.DIY AI Chat!', sender: 'ai', timestamp: new Date(Date.now() - 10000) },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    const userMessage: Message = {
      id: String(Date.now()),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    // Simulate AI response
    const aiResponse: Message = {
      id: String(Date.now() + 1),
      text: `AI echoes: ${inputText}`,
      sender: 'ai',
      timestamp: new Date(Date.now() + 1000),
    };
    setMessages(prevMessages => [...prevMessages, userMessage, aiResponse]);
    setInputText('');
  };

  const commonCardStyles: React.CSSProperties = {
    padding: 'calc(var(--boltdiy-spacing) * 2)', // 12px
    marginBottom: 'var(--boltdiy-spacing)', // 6px
    borderRadius: '12px', // Rounded corners
    maxWidth: '85%',
    wordWrap: 'break-word',
    fontSize: 'var(--boltdiy-font-size-min)', // 14px
    lineHeight: '1.4',
  };

  const aiCardStyles: React.CSSProperties = {
    ...commonCardStyles,
    backgroundColor: 'var(--boltdiy-secondary-bg)',
    color: 'var(--boltdiy-primary-text)',
    alignSelf: 'flex-start',
    marginRight: 'auto',
  };

  const userCardStyles: React.CSSProperties = {
    ...commonCardStyles,
    backgroundColor: 'var(--boltdiy-accent-neon)',
    color: 'var(--boltdiy-accent-neon-text)', // Ensure contrast
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  };

  // Wrapper for the entire Bolt.DIY screen content
  // This would typically be part of a layout component that initializes useBoltDiyTheme
  const screenWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full viewport height
    width: '100%',
    backgroundColor: 'var(--boltdiy-primary-bg)', // From theme
    color: 'var(--boltdiy-primary-text)', // From theme
    fontFamily: 'var(--boltdiy-font-family)',
    overflow: 'hidden', // Prevents main container from scrolling, only message list scrolls
  };


  return (
    <div style={screenWrapperStyle} className="boltdiy-theme-wrapper"> {/* Apply theme wrapper class here or higher up */}
      {/* Optional Header - keeping minimal for mobile focus */}
      {/* <header style={{ padding: 'var(--boltdiy-spacing)', textAlign: 'center', borderBottom: `1px solid var(--boltdiy-accent-neon)` }}>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'var(--boltdiy-font-weight-medium)' }}>Bolt.DIY Chat</h1>
      </header> */}

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: `calc(var(--boltdiy-spacing) * 2)` /* 12px */, display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={msg.sender === 'ai' ? aiCardStyles : userCardStyles}
          >
            <p style={{ margin: 0 }}>{msg.text}</p>
            {/* Optional: Timestamp display, could be smaller */}
            {/* <p style={{ margin: 'var(--boltdiy-spacing) 0 0 0', fontSize: '10px', opacity: 0.7, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p> */}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: `var(--boltdiy-spacing) calc(var(--boltdiy-spacing) * 2)`, // 6px vertical, 12px horizontal
          borderTop: `1px solid var(--boltdiy-input-border)`, // Use input border color
          backgroundColor: 'var(--boltdiy-primary-bg)', // Or secondary-bg if distinct area
        }}
        // className="boltdiy-glowingOutlineFocus" // This could be added if the whole bar should glow
      >
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your prompt…"
          onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
          className="flex-grow focus:shadow-[0_0_8px_2px_var(--boltdiy-accent-neon)]" // Ensure input itself has focus glow
          style={{
            marginRight: 'var(--boltdiy-spacing)', // 6px
            // The Input component itself should have its 40px height from its own styles
          }}
        />
        <Button
          onClick={handleSend}
          aria-label="Send prompt"
          size="icon" // Uses the 40x40px icon size from Button (BoltDIY)
          className="hover:shadow-[0_0_8px_2px_var(--boltdiy-accent-neon)]" // Custom hover glow for send button
        >
          <LightningBoltIcon />
        </Button>
      </div>
    </div>
  );
}

export default ChatScreen;
