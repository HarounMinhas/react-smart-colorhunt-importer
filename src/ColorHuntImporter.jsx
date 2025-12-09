import React, { useState, useEffect, useRef } from 'react';

/**
 * Smart ColorHunt Importer
 * 
 * A React component that automatically parses ColorHunt.co URLs from user input.
 * Features:
 * - Auto-detection of valid URLs
 * - Duplicate detection with visual feedback (flash effect)
 * - Two display modes: 'inline' (default) and 'widget' (collapsible)
 */
const ColorHuntImporter = ({ onPalettesChange, variant = 'inline' }) => {
  // State
  const [inputValue, setInputValue] = useState('');
  const [palettes, setPalettes] = useState([]);
  const [highlightedId, setHighlightedId] = useState(null);
  const [isOpen, setIsOpen] = useState(variant === 'inline');
  
  // Refs
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  // Constants
  const isWidget = variant === 'widget';

  // Logic: Extract colors from URL regex
  const extractColors = (url) => {
    try {
      const match = url.match(/palette\/([a-fA-F0-9]+)/);
      if (!match || !match[1]) return null;
      const hexString = match[1];
      const colors = hexString.match(/.{1,6}/g);
      return (colors && colors.length > 0) ? colors.map(c => `#${c.toUpperCase()}`) : null;
    } catch (e) {
      return null;
    }
  };

  // Logic: Handle Input & Auto-Add
  const handleInputChange = (e) => {
    const value = e.target.value;
    const extractedColors = extractColors(value);

    if (extractedColors) {
      const uniqueColorKey = extractedColors.join('-');
      const existingPalette = palettes.find(p => p.colorKey === uniqueColorKey);

      if (existingPalette) {
        // DUPLICATE FOUND: Flash effect
        setInputValue('');
        setHighlightedId(existingPalette.id);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setHighlightedId(null), 1500);
      } else {
        // NEW PALETTE: Add to list
        const newPalette = {
          id: Date.now(),
          url: value,
          colors: extractedColors,
          colorKey: uniqueColorKey,
          timestamp: new Date().toLocaleTimeString()
        };
        const updatedPalettes = [newPalette, ...palettes];
        setPalettes(updatedPalettes);
        setInputValue('');
        if (onPalettesChange) onPalettesChange(updatedPalettes);
      }
    } else {
      setInputValue(value);
    }
  };

  const removePalette = (id) => {
    const updatedPalettes = palettes.filter(p => p.id !== id);
    setPalettes(updatedPalettes);
    if (onPalettesChange) onPalettesChange(updatedPalettes);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // --- RENDER HELPERS ---

  // Button to toggle widget mode
  const ToggleButton = () => (
    <button 
      onClick={() => setIsOpen(!isOpen)} 
      style={styles.widgetButton}
      title={isOpen ? "Close Importer" : "Open Color Importer"}
    >
      {isOpen ? '✕' : '🎨'}
    </button>
  );

  // The Main Interface
  const MainInterface = () => (
    <div style={isWidget ? styles.widgetContainer : styles.inlineContainer}>
      <div style={styles.header}>
        <h3 style={styles.title}>ColorHunt Importer</h3>
        {isWidget && <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>}
      </div>
      
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Paste ColorHunt link..."
          style={styles.input}
          autoFocus={isOpen}
        />
        <p style={styles.hint}>Paste a link to auto-add. Duplicates will flash.</p>
      </div>

      <div style={styles.listContainer}>
        {palettes.length === 0 ? (
          <div style={styles.emptyState}>No palettes yet.</div>
        ) : (
          palettes.map((palette) => {
            const isHighlighted = palette.id === highlightedId;
            return (
              <div 
                key={palette.id} 
                style={{
                  ...styles.paletteCard,
                  backgroundColor: isHighlighted ? '#fff9c4' : 'white',
                  borderColor: isHighlighted ? '#fbc02d' : '#eee',
                  transform: isHighlighted ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isHighlighted ? '0 4px 12px rgba(251, 192, 45, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div style={styles.previewContainer}>
                  {palette.colors.map((color, idx) => (
                    <div key={idx} style={{...styles.colorBlock, backgroundColor: color}} title={color} />
                  ))}
                </div>
                <div style={styles.infoContainer}>
                  <span style={styles.paletteId}>#{palette.id.toString().slice(-4)}</span>
                  <span style={styles.colorCodes}>{palette.colors.join(', ')}</span>
                </div>
                <button onClick={() => removePalette(palette.id)} style={styles.deleteButton}>✕</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  if (isWidget && !isOpen) {
    return <ToggleButton />;
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {isWidget && isOpen && <div style={styles.overlay} onClick={() => setIsOpen(false)} />}
      <MainInterface />
    </div>
  );
};

// Internal Styles
const styles = {
  inlineContainer: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    border: '1px solid #eee',
    maxWidth: '600px',
    fontFamily: 'sans-serif',
  },
  widgetButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '24px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetContainer: {
    position: 'absolute',
    top: '60px',
    right: '0', // Aligns to the right of the button wrapper
    width: '350px',
    backgroundColor: 'white',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    borderRadius: '12px',
    padding: '20px',
    zIndex: 1000,
    fontFamily: 'sans-serif',
    border: '1px solid #eee',
  },
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 999,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  title: { margin: 0, fontSize: '18px', fontWeight: 'bold' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' },
  inputWrapper: { marginBottom: '15px' },
  input: {
    width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd',
    boxSizing: 'border-box', fontSize: '14px'
  },
  hint: { fontSize: '11px', color: '#888', marginTop: '5px' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' },
  paletteCard: {
    display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '8px',
    border: '1px solid #eee', gap: '10px', transition: 'all 0.5s ease'
  },
  previewContainer: { display: 'flex', width: '80px', height: '30px', borderRadius: '4px', overflow: 'hidden' },
  colorBlock: { flex: 1, height: '100%' },
  infoContainer: { flex: 1, overflow: 'hidden' },
  paletteId: { fontSize: '12px', fontWeight: 'bold', display: 'block' },
  colorCodes: { fontSize: '10px', color: '#666', fontFamily: 'monospace' },
  deleteButton: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '16px' },
  emptyState: { textAlign: 'center', color: '#aaa', fontSize: '13px', padding: '20px' }
};

export default ColorHuntImporter;