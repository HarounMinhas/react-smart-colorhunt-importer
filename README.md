# React Smart ColorHunt Importer 🎨

A smart, efficient React component for importing color palettes directly from ColorHunt.co links. Designed for speed ("Copy, Paste, Done") with automatic duplicate detection.

> **Note:** The documentation and code structure of this repository were refined with the assistance of a Large Language Model (LLM) to ensure clarity, best practices, and robust error handling.

## Features

*   **Auto-Detection:** Instantly parses `colorhunt.co` links upon pasting. No "Submit" button needed.
*   **Duplicate Flash:** If a palette is already added, the input clears and the existing item flashes yellow to alert the user.
*   **Visual Preview:** Immediately shows the 4-color strip of the imported palette.
*   **Dual Modes:** 
    *   `inline` (Default): Shows the full interface.
    *   `widget`: Renders as a floating button (icon) that expands into a popup.

## Usage

### 1. Default (Inline Mode)
Ideal for settings pages or dashboards where the importer should be always visible.

```jsx
import ColorHuntImporter from './ColorHuntImporter';

function App() {
  const handleUpdate = (palettes) => {
    console.log("Current Palettes:", palettes);
  };

  return (
    <div className="App">
      <h1>My Project Settings</h1>
      <ColorHuntImporter onPalettesChange={handleUpdate} />
    </div>
  );
}
```

### 2. Widget Mode (Collapsible)
Ideal for integrating into other websites where screen real estate is limited. It renders a small paint-palette button.

```jsx
// Renders a floating button. Clicking it opens the importer.
<ColorHuntImporter variant="widget" onPalettesChange={handleUpdate} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPalettesChange` | `function` | `null` | Callback fired when list updates. Returns array of palette objects. |
| `variant` | `string` | `'inline'` | `'inline'` for static display, `'widget'` for button/popup mode. |

## Data Structure
The `onPalettesChange` callback returns an array of objects:

```json
[
  {
    "id": 1715694205123,
    "url": "https://colorhunt.co/palette/1c352da6b28bf5c9b0f9f6f3",
    "colors": ["#1C352D", "#A6B28B", "#F5C9B0", "#F9F6F3"],
    "colorKey": "#1C352D-#A6B28B-#F5C9B0-#F9F6F3",
    "timestamp": "10:23:25 AM"
  }
]
```

## Installation

Since this is a single-component module, you can:

1. **Copy directly:** Copy `src/ColorHuntImporter.jsx` into your React project
2. **Clone the repo:** `git clone https://github.com/HarounMinhas/react-smart-colorhunt-importer.git`

## Requirements

- React 17.0.0+ or 18.0.0+
- React DOM 17.0.0+ or 18.0.0+

## License

MIT