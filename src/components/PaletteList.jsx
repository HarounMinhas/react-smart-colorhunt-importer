import React from 'react';
import PaletteCard from './PaletteCard';

/**
 * List of palette cards with empty state
 * @param {Object} props
 * @param {import('../types/palette').Palette[]} props.palettes
 * @param {number | null} props.highlightedId
 * @param {Function} props.onRemove
 */
const PaletteList = ({ palettes, highlightedId, onRemove }) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxHeight: '400px',
      overflowY: 'auto'
    },
    emptyState: {
      textAlign: 'center',
      color: '#aaa',
      fontSize: '13px',
      padding: '20px'
    }
  };

  if (palettes.length === 0) {
    return <div style={styles.emptyState}>No palettes yet.</div>;
  }

  return (
    <div style={styles.container}>
      {palettes.map((palette) => (
        <PaletteCard
          key={palette.id}
          palette={palette}
          isHighlighted={palette.id === highlightedId}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default PaletteList;
