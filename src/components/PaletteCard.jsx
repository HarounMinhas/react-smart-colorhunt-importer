import React from 'react';

/**
 * Single palette card with color preview
 * @param {Object} props
 * @param {import('../types/palette').Palette} props.palette
 * @param {boolean} props.isHighlighted
 * @param {Function} props.onRemove
 */
const PaletteCard = ({ palette, isHighlighted, onRemove }) => {
  const styles = {
    card: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderRadius: '8px',
      border: `1px solid ${isHighlighted ? '#fbc02d' : '#eee'}`,
      gap: '10px',
      transition: 'all 0.5s ease',
      backgroundColor: isHighlighted ? '#fff9c4' : 'white',
      transform: isHighlighted ? 'scale(1.02)' : 'scale(1)',
      boxShadow: isHighlighted 
        ? '0 4px 12px rgba(251, 192, 45, 0.3)' 
        : '0 2px 4px rgba(0,0,0,0.05)',
    },
    previewContainer: {
      display: 'flex',
      width: '80px',
      height: '30px',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    colorBlock: {
      flex: 1,
      height: '100%'
    },
    infoContainer: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    },
    paletteId: {
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'block',
      color: '#333'
    },
    colorCodes: {
      fontSize: '10px',
      color: '#666',
      fontFamily: 'monospace',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    deleteButton: {
      background: 'none',
      border: 'none',
      color: '#ff4d4d',
      cursor: 'pointer',
      fontSize: '16px',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.previewContainer}>
        {palette.colors.map((color, idx) => (
          <div 
            key={idx} 
            style={{ ...styles.colorBlock, backgroundColor: color }} 
            title={color}
            aria-label={`Color ${color}`}
          />
        ))}
      </div>
      <div style={styles.infoContainer}>
        <span style={styles.paletteId}>#{palette.id}</span>
        <span style={styles.colorCodes}>{palette.colors.join(', ')}</span>
      </div>
      <button 
        onClick={() => onRemove(palette.id)} 
        style={styles.deleteButton}
        aria-label="Remove palette"
        title="Remove palette"
      >
        ✕
      </button>
    </div>
  );
};

export default PaletteCard;
