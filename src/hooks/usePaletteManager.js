import { useState, useEffect, useRef, useCallback } from 'react';
import { extractColors, createPalette, makeColorKey } from '../utils/colorParser';

/**
 * Custom hook for managing palette state and interactions
 * @param {Function} onPalettesChange - Callback when palettes update
 * @returns {Object} Palette manager state and handlers
 */
export const usePaletteManager = (onPalettesChange) => {
  const [inputValue, setInputValue] = useState('');
  const [palettes, setPalettes] = useState([]);
  const [highlightedId, setHighlightedId] = useState(null);
  const timerRef = useRef(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Clear highlight after delay
  const clearHighlight = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setHighlightedId(null);
    }, 1500);
  }, []);

  // Check if palette is duplicate
  const findDuplicate = useCallback((colorKey) => {
    return palettes.find(p => p.colorKey === colorKey);
  }, [palettes]);

  // Add new palette to list
  const addPalette = useCallback((url, colors) => {
    const newPalette = createPalette(url, colors);
    const updatedPalettes = [newPalette, ...palettes];
    setPalettes(updatedPalettes);
    setInputValue('');
    
    if (onPalettesChange) {
      onPalettesChange(updatedPalettes);
    }
  }, [palettes, onPalettesChange]);

  // Handle duplicate with flash effect
  const handleDuplicate = useCallback((existingPalette) => {
    setInputValue('');
    setHighlightedId(existingPalette.id);
    clearHighlight();
  }, [clearHighlight]);

  // Handle input change with auto-add logic
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    const extractedColors = extractColors(value);

    if (extractedColors) {
      const colorKey = makeColorKey(extractedColors);
      const duplicate = findDuplicate(colorKey);

      if (duplicate) {
        handleDuplicate(duplicate);
      } else {
        addPalette(value, extractedColors);
      }
    } else {
      setInputValue(value);
    }
  }, [findDuplicate, handleDuplicate, addPalette]);

  // Remove palette by id
  const removePalette = useCallback((id) => {
    const updatedPalettes = palettes.filter(p => p.id !== id);
    setPalettes(updatedPalettes);
    
    if (onPalettesChange) {
      onPalettesChange(updatedPalettes);
    }
  }, [palettes, onPalettesChange]);

  return {
    inputValue,
    palettes,
    highlightedId,
    handleInputChange,
    removePalette
  };
};
