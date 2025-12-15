// Counter for ensuring unique IDs even with rapid successive calls
let idCounter = 0;

/**
 * Creates a unique key from color array for duplicate detection
 * @param {string[]} colors - Array of hex colors
 * @returns {string} Joined color key
 */
export const makeColorKey = (colors) => colors.join('-');

/**
 * Extracts color palette from ColorHunt URL
 * @param {string} url - ColorHunt palette URL
 * @returns {string[] | null} Array of hex colors or null if invalid
 */
export const extractColors = (url) => {
  try {
    const match = url.match(/palette\/([a-fA-F0-9]+)/);
    if (!match || !match[1]) return null;
    
    const hexString = match[1];
    const colors = hexString.match(/.{1,6}/g);
    
    return (colors && colors.length > 0) 
      ? colors.map(c => `#${c.toUpperCase()}`) 
      : null;
  } catch (e) {
    return null;
  }
};

/**
 * Generates a unique ID by combining timestamp with incrementing counter
 * @returns {number} Unique identifier
 */
const generateUniqueId = () => {
  idCounter++;
  return Date.now() * 1000 + idCounter;
};

/**
 * Creates a new palette object
 * @param {string} url - Original URL
 * @param {string[]} colors - Extracted colors
 * @returns {import('../types/palette').Palette}
 */
export const createPalette = (url, colors) => ({
  id: generateUniqueId(),
  url,
  colors,
  colorKey: makeColorKey(colors),
  timestamp: new Date().toLocaleTimeString()
});
