import React, { useState, useEffect, useRef } from 'react';
import styles from '~/styles/boltdiy.module.scss';

// Placeholder for Icons (e.g., from a library or SVGs)
const Icon = ({ name, size = 20 }: { name: string, size?: number }) => {
  // In a real app, this would render an actual icon
  const style = {
    width: size,
    height: size,
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: name === 'Back' ? '5px' : '0', // Specific margin for back button text
    // backgroundColor: 'var(--boltdiy-neon-purple)', // Simple placeholder visual
    // WebkitMask: `url(path/to/${name.toLowerCase()}.svg) no-repeat center`, // For SVG icons
    // mask: `url(path/to/${name.toLowerCase()}.svg) no-repeat center`,
    color: 'var(--boltdiy-neon-purple)', // For font icons or SVGs using currentColor
  };
  if (name === 'Back') return <span style={style}>&lt;</span>; // Simple back arrow
  if (name === 'Save') return <span style={style}>💾</span>; // Floppy disk emoji
  if (name === 'Run') return <span style={style}>▶️</span>; // Play button emoji
  return <span style={style}>?</span>;
};


export function EditorScreen() {
  const [code, setCode] = useState('// Welcome to the bolt.diy Editor!\nfunction greet() {\n  console.log("Hello, bolt.diy world!");\n}\ngreet();');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Basic syntax highlighting (very simplified: keywords, comments, strings)
  const highlightSyntax = (text: string) => {
    let highlighted = text;
    // Comments (lines starting with //)
    highlighted = highlighted.replace(/^(\s*\/\/[^
]*)/gm, '<span style="color: #777777;">$1</span>');
    // Keywords (simple list)
    const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'new', 'class'];
    keywords.forEach(kw => {
      const regex = new RegExp(`\b(${kw})\b`, 'g');
      highlighted = highlighted.replace(regex, '<span style="color: var(--boltdiy-neon-purple); font-weight: bold;">$1</span>');
    });
    // Strings (simple quoted strings)
    highlighted = highlighted.replace(/(".*?"|'.*?'|`.*?`)/g, '<span style="color: #A0D8EF;">$1</span>'); // Light blue for strings
    return highlighted.replace(/\n/g, '<br />');
  };

  // Glowing cursor effect (CSS only for simplicity here)
  // More advanced effects might need JS or a library
  const editorStyles: React.CSSProperties = {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#080808', // Slightly different from main bg for contrast
    color: 'var(--boltdiy-text)',
    border: 'none',
    outline: 'none',
    padding: '15px',
    fontFamily: "'Courier New', Courier, monospace", // Monospace font
    fontSize: '14px',
    lineHeight: '1.5',
    whiteSpace: 'pre', // Preserve whitespace and newlines
    overflowWrap: 'normal', // Prevent wrapping for code
    overflow: 'auto', // Allow scrolling
    caretColor: 'var(--boltdiy-neon-purple)', // Basic glowing cursor color
  };

  // For the overlay div used for highlighting
  const highlightOverlayStyles: React.CSSProperties = {
    ...editorStyles,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: 'none', // Allows clicks to pass through to the textarea
    whiteSpace: 'pre-wrap', // So it wraps like the textarea visually
    color: 'transparent', // Hide the actual text, only show highlights
    overflow: 'hidden', // Match textarea scroll
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  useEffect(() => {
    // Sync scroll between textarea and highlight overlay
    const area = textareaRef.current;
    const overlay = document.getElementById('highlight-overlay');
    if (area && overlay) {
      const syncScroll = () => {
        overlay.scrollTop = area.scrollTop;
        overlay.scrollLeft = area.scrollLeft;
      };
      area.addEventListener('scroll', syncScroll);
      return () => area.removeEventListener('scroll', syncScroll);
    }
  }, []);


  return (
    <div className={`${styles.boltdiyContainer}`} style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 0 /* Remove container padding */ }}>
      {/* Top Navbar */}
      <nav
        className={`${styles.smoothTransition}`}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 15px',
          backgroundColor: 'rgba(10,10,10,0.8)', // Darker shade for navbar
          borderBottom: `1px solid var(--boltdiy-neon-purple)`,
          backdropFilter: 'blur(5px)', // Optional: blur effect for navbar
        }}
      >
        <button className={`${styles.button} ${styles.iconButton}`} style={{ backgroundColor: 'transparent', color: 'var(--boltdiy-neon-purple)' }}>
          <Icon name="Back" /> <span style={{marginLeft: '5px'}}>Back</span>
        </button>
        <div>
          <button className={`${styles.button}`} style={{ marginRight: '10px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <Icon name="Save" /> Save
          </button>
          <button className={`${styles.button} ${styles.glowingOutline}`}>
            <Icon name="Run" /> Run
          </button>
        </div>
      </nav>

      {/* Editor Area */}
      <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' /* Container for textarea and overlay */ }}>
        <div
          id="highlight-overlay"
          style={highlightOverlayStyles}
          dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}
        />
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          spellCheck="false"
          autoCapitalize="none"
          autoCorrect="off"
          style={{...editorStyles, position: 'relative', zIndex: 2, background: 'transparent' /* Make textarea bg transparent */ }}
        />
      </div>
       {/* CSS for glowing cursor (simplified) - more advanced might need JS */}
      <style jsx global>{`
        textarea:focus {
          // The caret-color is the primary way. For additional glow:
          // This is tricky with just CSS on a native caret.
          // Libraries like CodeMirror handle this by rendering a custom cursor.
        }
        .token-comment { color: #777777; }
        .token-keyword { color: var(--boltdiy-neon-purple); font-weight: bold; }
        .token-string { color: #A0D8EF; }
      `}</style>
    </div>
  );
}

export default EditorScreen;
