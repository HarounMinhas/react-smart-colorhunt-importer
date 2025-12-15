import React from 'react';

/**
 * Toggle button for widget mode
 * @param {Object} props
 * @param {boolean} props.isOpen - Current open state
 * @param {Function} props.onClick - Click handler
 */
const ToggleButton = ({ isOpen, onClick }) => {
  const styles = {
    button: {
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
    }
  };

  return (
    <button 
      onClick={onClick} 
      style={styles.button}
      title={isOpen ? "Close Importer" : "Open Color Importer"}
      aria-label={isOpen ? "Close Color Importer" : "Open Color Importer"}
    >
      {isOpen ? '✕' : '🎨'}
    </button>
  );
};

export default ToggleButton;
