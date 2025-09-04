# CustomLoader Component

A custom React loader component with a sophisticated 7-step animation sequence using Framer Motion and TailwindCSS.

## Features

- **7-Step Animation Sequence**: Smooth transitions between different visual states
- **Framer Motion**: Professional animations with easing and timing control
- **TailwindCSS**: Utility-first styling approach
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Supports reduced motion preferences
- **RTL Support**: Right-to-left language compatibility
- **Auto-unmount**: Automatically hides after animation completes

## Animation Sequence

1. **Initial State**: White background with small brown circle (25px)
2. **Background Transition**: Background changes to brown (#65471E)
3. **Logo Appearance**: Logo appears in center on brown background
4. **Logo Scale Up**: Logo scales up with zoom effect (1.3x)
5. **Logo Scale Down**: Logo scales back to normal size
6. **Background to White**: Background transitions back to white
7. **Final Circle**: Small circle appears, then loader unmounts

## Usage

### Basic Usage

```jsx
import React, { useState } from 'react';
import { CustomLoader } from './Components/CustomLoader';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    // Show your main app content
  };

  return (
    <div>
      {showLoader && <CustomLoader onComplete={handleLoaderComplete} />}
      {/* Your main app content */}
    </div>
  );
}
```

### With App Initialization

```jsx
import React, { useState, useEffect } from 'react';
import { CustomLoader } from './Components/CustomLoader';

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Initialize your app (load data, setup, etc.)
    initializeApp().then(() => {
      setIsAppReady(true);
    });
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  if (!isAppReady || showLoader) {
    return <CustomLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <div>
      {/* Your main app content */}
    </div>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onComplete` | `function` | No | Callback function called when animation completes |

## Customization

### Replace Logo

In `CustomLoader.jsx`, replace the placeholder logo:

```jsx
// Replace this placeholder
<div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-lg">
  <span className="text-2xl font-bold text-gray-800">LOGO</span>
</div>

// With your actual logo
<img 
  src="/path/to/your/logo.png" 
  alt="Company Logo" 
  className="w-20 h-20 object-contain"
/>
```

### Adjust Animation Timing

Modify the `steps` array in `CustomLoader.jsx`:

```jsx
const steps = [
  {
    id: 0,
    name: "Initial Circle",
    duration: 1000, // Adjust duration in milliseconds
    description: "Full white background with small circle in center"
  },
  // ... other steps
];
```

### Change Colors

Update the color values in the component:

```jsx
// Background colors
backgroundColor: "#FFFFFF" // White
backgroundColor: "#65471E" // Brown

// Circle color
style={{ backgroundColor: "#65471E" }}
```

## Styling

The component uses TailwindCSS classes. Key classes used:

- `fixed inset-0 z-50`: Full screen overlay
- `flex items-center justify-center`: Center content
- `w-6 h-6 rounded-full`: Small circle
- `w-20 h-20`: Logo size
- `bg-white rounded-lg shadow-lg`: Logo container

## Browser Support

- Modern browsers with CSS3 support
- Framer Motion requires React 16.8+
- TailwindCSS requires modern browser support

## Performance

- Uses `AnimatePresence` for smooth unmounting
- Optimized animations with `easeInOut` transitions
- Minimal DOM manipulation
- Auto-cleanup on unmount

## Development

### Debug Mode

In development mode, a debug panel shows:
- Current animation step
- Step name and description
- Duration timing

### Testing

Use the `CustomLoaderDemo` component to test the loader:

```jsx
import { CustomLoaderDemo } from './Components/CustomLoader';

// Use in your app for testing
<CustomLoaderDemo />
```

## Dependencies

- React 16.8+
- Framer Motion
- TailwindCSS

## License

This component is part of your project and follows the same license terms.
