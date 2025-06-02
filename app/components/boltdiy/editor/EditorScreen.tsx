import React, { useState, useRef, useEffect } from 'react';
import { Button } from '~/components/boltdiy/ui/Button'; // Themed Button

// Placeholder for Icons (20x20px)
const EditorIcon = ({ name, size = 18 }: { name: string, size?: number }) => {
  // Reduced default size slightly for navbar density
  let content = '?';
  if (name === 'Back') content = '←';
  if (name === 'Save') content = '💾'; // Placeholder, consider simple floppy disk or checkmark
  if (name === 'Run') content = '▶';  // Placeholder, consider play icon

  return (
    <span style={{
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${name === 'Back' ? size * 1.2 : size * 0.8}px`, // Make back arrow a bit larger
      color: 'var(--boltdiy-button-text)', // Icon color from button if button has transparent bg
      // If buttons have solid bg, this might need to be var(--boltdiy-accent-neon-text) or similar
    }}>
      {content}
    </span>
  );
};

export function EditorScreen() {
  const [code, setCode] = useState(
    '// Bolt.DIY Mobile Editor\n\nfunction setup() {\n  console.log("Editor Ready!");\n}\n\nsetup();'
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Basic syntax highlighting (very simplified: comments, keywords, strings)
  // For a real app, a lightweight mobile-friendly library or more robust regex would be needed.
  const highlightSyntax = (text: string) => {
    let highlighted = text;
    highlighted = highlighted.replace(/^(\s*\/\/[^
]*)/gm, '<span style="color: #75715E;">$1</span>'); // Comment color
    const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'new', 'class', 'console', 'log'];
    keywords.forEach(kw => {
      const regex = new RegExp(`\b(${kw})\b`, 'g');
      highlighted = highlighted.replace(regex, '<span style="color: var(--boltdiy-accent-neon); font-weight: var(--boltdiy-font-weight-medium);">$1</span>');
    });
    highlighted = highlighted.replace(/(".*?"|'.*?'|`.*?`)/g, '<span style="color: #A6E22E;">$1</span>'); // String color (greenish)
    highlighted = highlighted.replace(/(\(|\)|\{|\}|\[|\])/g, '<span style="color: #FD971F;">$1</span>'); // Brackets/Parentheses (orangeish)
    return highlighted.replace(/\n/g, '<br />');
  };

  const editorWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    backgroundColor: 'var(--boltdiy-primary-bg)',
    color: 'var(--boltdiy-primary-text)',
    fontFamily: 'var(--boltdiy-font-family)',
    overflow: 'hidden', // Main container doesn't scroll
  };

  const navbarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `var(--boltdiy-spacing) calc(var(--boltdiy-spacing) * 2)`, // 6px V, 12px H
    backgroundColor: 'var(--boltdiy-secondary-bg)', // Or a slightly different shade for navbar
    borderBottom: `1px solid var(--boltdiy-input-border)`,
    flexShrink: 0, // Prevent navbar from shrinking
  };

  const editorAreaStyle: React.CSSProperties = {
    flexGrow: 1,
    position: 'relative', // For highlight overlay
    overflow: 'hidden', // Container for textarea and overlay scroll
    backgroundColor: '#080808', // True black or very dark for editor bg
  };

  const commonTextareaStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    padding: 'calc(var(--boltdiy-spacing) * 2)', // 12px
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 'var(--boltdiy-font-size-min)', // 14px
    lineHeight: '1.5',
    whiteSpace: 'pre',
    overflowWrap: 'normal',
    overflow: 'auto', // Enable scrolling for textarea itself
    resize: 'none',
  };

  const highlightOverlayStyles: React.CSSProperties = {
    ...commonTextareaStyles,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: 'none',
    color: 'transparent', // Text is transparent, only spans with color show
    backgroundColor: 'transparent', // Overlay is transparent
    whiteSpace: 'pre-wrap', // Match visual wrapping of textarea
  };

  const textareaStyles: React.CSSProperties = {
    ...commonTextareaStyles,
    position: 'relative',
    zIndex: 2,
    color: 'var(--boltdiy-primary-text)', // Actual text color
    backgroundColor: 'transparent', // Textarea itself is transparent to see overlay
    caretColor: 'var(--boltdiy-accent-neon)', // Glowing cursor
  };

  // Sync scroll
  useEffect(() => {
    const area = textareaRef.current;
    const overlay = document.getElementById('boltdiy-editor-highlight-overlay');
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
    <div style={editorWrapperStyle} className="boltdiy-theme-wrapper">
      <nav style={navbarStyle}>
        <Button size="icon" variant="default" aria-label="Back" className="bg-transparent hover:bg-[color-mix(in_srgb,var(--boltdiy-accent-neon)_15%,transparent)]"> {/* Example transparent button */}
          <EditorIcon name="Back" />
        </Button>
        <div style={{ display: 'flex', gap: 'var(--boltdiy-spacing)' /* 6px */ }}>
          <Button size="default" variant="default" aria-label="Save" className="px-[var(--boltdiy-spacing)] text-sm"> {/* Smaller padding for dense navbar */}
            <EditorIcon name="Save" />
            <span style={{marginLeft: 'var(--boltdiy-spacing)'}}>Save</span>
          </Button>
          <Button size="default" variant="default" aria-label="Run" className="px-[var(--boltdiy-spacing)] text-sm focus:shadow-[0_0_8px_2px_var(--boltdiy-accent-neon)]">
            <EditorIcon name="Run" />
            <span style={{marginLeft: 'var(--boltdiy-spacing)'}}>Run</span>
          </Button>
        </div>
      </nav>

      <div style={editorAreaStyle}>
        <div
          id="boltdiy-editor-highlight-overlay"
          style={highlightOverlayStyles}
          dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}
        />
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          autoCapitalize="none"
          autoCorrect="off"
          style={textareaStyles}
        />
      </div>
    </div>
  );
}

export default EditorScreen;
