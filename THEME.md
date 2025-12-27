# Theme System

ChessEye now supports multiple color themes! Switch between themes with a simple one-liner.

## 🎨 How to Change Theme

Open `constants/theme.ts` and change the `ACTIVE_THEME` constant:

```typescript
// Change this line to switch themes:
export const ACTIVE_THEME: 'light' | 'logo' = 'logo';  // 'light' or 'logo'
```

## Available Themes

### 🔵 Light Theme (`'light'`)
The original ChessEye color scheme with blue accents and white backgrounds:
- Primary color: Blue (`#0072F5`)
- Backgrounds: White
- Professional, clean look

### 🟤 Logo Theme (`'logo'`)
ChessEye logo-inspired brown/beige color scheme:
- Primary color: Brown/Rose (`#B47E65`)
- Backgrounds: Beige/Tan (`#F1D18F`)
- Navbar: Light blue (`#f5fdff`) - kept from original
- Warm, distinctive look matching the logo

## Theme-Aware Components

All components automatically adapt to the selected theme:
- ✅ Buttons (all variants: primary, outline, ghost, secondary, danger)
- ✅ Toast notifications
- ✅ Navigation bar
- ✅ Icons and chevrons
- ✅ Cards and containers
- ✅ Toggle/Switch components
- ✅ Service toggler
- ✅ Upload buttons (gallery icon uses primary color)

## Adding New Colors

To add new colors to a theme:

1. Open `constants/theme.ts`
2. Add the color to both `LIGHT_THEME` and `LOGO_THEME` objects
3. Export it in the `COLORS` object
4. Use it in your components: `import { COLORS } from '@/constants/theme'`

Example:
```typescript
// In theme.ts
const LIGHT_THEME = {
  // ... existing colors
  MY_NEW_COLOR: '#FF0000',
};

const LOGO_THEME = {
  // ... existing colors
  MY_NEW_COLOR: '#00FF00',
};

// In your component
import { COLORS } from '@/constants/theme';

<View backgroundColor={COLORS.MY_NEW_COLOR} />
```

## Notes

- All color constants are centralized in `constants/theme.ts`
- All imports use `@/constants/theme` directly
- Screen backgrounds use `COLORS.PRIMARY_BACKGROUND` for theme-aware backgrounds
- No need to restart the dev server - hot reload will apply changes immediately
