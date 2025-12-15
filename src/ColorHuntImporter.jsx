import React, { useState, useRef } from 'react';
import { usePaletteManager } from './hooks/usePaletteManager';
import ToggleButton from './components/ToggleButton';
import PaletteList from './components/PaletteList';

/**
 * Smart ColorHunt Importer
 * 
 * A React component that automatically parses ColorHunt.co URLs from user input.
 * 
 * @param {Object} props
 * @param {Function} [props.onPalettesChange] - Callback fired when palette list updates
 * @param {'inline' | 'widget'} [props.variant='inline'] - Display mode
 * 
 * @example
 * // Inline mode
 * <ColorHuntImporter onPalettesChange={(palettes) => console.log(palettes)} />
 * 
 * @example
 * // Widget mode
 * <ColorHuntImporter variant="widget" onPalettesChange={handleUpdate} />
 */
const ColorHuntImporter = ({ onPalettesChange, variant = 'inline' }) => {
  const [isOpen, setIsOpen] = useState(variant === 'inline');
  const containerRef = useRef(null);
  const isWidget = variant === 'widget';

  const {
    inputValue,
    palettes,
    highlightedId,
    handleInputChange,
    removePalette
  } = usePaletteManager(onPalettesChange);

  const styles = {
    inlineContainer: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      border: '1px solid #eee',
      maxWidth: '600px',
      fontFamily: 'sans-serif',
    },
    widgetContainer: {
      position: 'absolute',
      top: '60px',
      right: '0',
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
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    title: {
      margin: 0,
      fontSize: '18px',
      fontWeight: 'bold'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer'
    },
    inputWrapper: {
      marginBottom: '15px'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
      fontSize: '14px'
    },
    hint: {
      fontSize: '11px',
      color: '#888',
      marginTop: '5px'
    }
  };

  const MainInterface = () => (
    <div style={isWidget ? styles.widgetContainer : styles.inlineContainer}>
      <div style={styles.header}>
        <h3 style={styles.title}>ColorHunt Importer</h3>
        {isWidget && (
          <button 
            onClick={() => setIsOpen(false)} 
            style={styles.closeBtn}
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Paste ColorHunt link..."
          style={styles.input}
          autoFocus={isOpen}
          aria-label="ColorHunt URL input"
        />
        <p style={styles.hint}>Paste a link to auto-add. Duplicates will flash.</p>
      </div>

      <PaletteList
        palettes={palettes}
        highlightedId={highlightedId}
        onRemove={removePalette}
      />
    </div>
  );

  if (isWidget && !isOpen) {
    return <ToggleButton isOpen={false} onClick={() => setIsOpen(true)} />;
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {isWidget && isOpen && (
        <div 
          style={styles.overlay} 
          onClick={() => setIsOpen(false)}
          aria-label="Close overlay"
        />
      )}
      <MainInterface />
    </div>
  );
};

export default ColorHuntImporter;
