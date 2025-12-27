/**
 * Theme System - Simple one-liner to switch between color schemes
 *
 * To switch themes, change the ACTIVE_THEME constant below:
 * - 'light' = Original blue/white color scheme
 * - 'logo' = ChessEye logo-inspired brown/beige scheme
 */

// 🎨 CHANGE THEME HERE :
export const ACTIVE_THEME: 'light' | 'logo' = 'logo';

/**
 * Light Theme - Original blue/white color scheme
 */
const LIGHT_THEME = {
  // Primary Brand Colors
  PRIMARY: '#0072F5',
  PRIMARY_BACKGROUND: '#FFFFFF',

  // Text & Icons
  TEXT_ON_PRIMARY: '#FFFFFF',
  ICON_ON_PRIMARY: '#FFFFFF',

  // Navigation
  NAVBAR_BACKGROUND: '#f5fdff',
  NAVBAR_TEXT: '#000000',
  HAMBURGER_ICON: '#000000',

  // Buttons - Primary variant
  BUTTON_PRIMARY_BG: '#0072F5',
  BUTTON_PRIMARY_TEXT: '#FFFFFF',
  BUTTON_PRIMARY_HOVER: '#0059C1',
  BUTTON_PRIMARY_PRESS: '#0047A3',

  // Buttons - Outline variant
  BUTTON_OUTLINE_BG: 'transparent' as const,
  BUTTON_OUTLINE_BORDER: '#0072F5',
  BUTTON_OUTLINE_TEXT: '#0072F5',
  BUTTON_OUTLINE_ICON: '#0072F5',
  BUTTON_OUTLINE_HOVER_BG: '#E6F1FE',

  // Buttons - Ghost variant
  BUTTON_GHOST_BG: 'transparent' as const,
  BUTTON_GHOST_TEXT: '#0072F5',

  // Buttons - Secondary variant
  BUTTON_SECONDARY_BG: '#6B7280',
  BUTTON_SECONDARY_TEXT: '#FFFFFF',

  // Buttons - Danger variant
  BUTTON_DANGER_BG: '#F31260',
  BUTTON_DANGER_TEXT: '#FFFFFF',

  // Buttons - Special (Lichess, etc.)
  BUTTON_LICHESS_BG: '#A855F7',
  BUTTON_LICHESS_TEXT: '#FFFFFF',

  // Toast Notifications
  TOAST_SUCCESS_BG: '#0072F5',
  TOAST_SUCCESS_TEXT: '#FFFFFF',
  TOAST_SUCCESS_ICON: '#FFFFFF',

  TOAST_ERROR_BG: '#F31260',
  TOAST_ERROR_TEXT: '#FFFFFF',
  TOAST_ERROR_ICON: '#FFFFFF',

  TOAST_WARNING_BG: '#F5A524',
  TOAST_WARNING_TEXT: '#FFFFFF',
  TOAST_WARNING_ICON: '#FFFFFF',

  TOAST_INFO_BG: '#889096',
  TOAST_INFO_TEXT: '#11181C',
  TOAST_INFO_ICON: '#11181C',

  TOAST_SHADOW: '#000',

  // Icons (general)
  ICON_PRIMARY: '#0072F5',
  ICON_SECONDARY: '#6B7280',
  ICON_CHEVRON: '#6B7280',

  // Cards & Containers
  CARD_BACKGROUND: '#FFFFFF',
  CARD_BORDER: '#0072F5',
  CARD_HOVER_BG: '#F5F5F5',

  // Validation States
  VALIDATION_ERROR: '#F31260',
  VALIDATION_WARNING: '#F5A524',
  VALIDATION_SUCCESS: '#0072F5',

  // Toggle/Switch
  TOGGLE_THUMB: '#FFFFFF',
  TOGGLE_TRACK_ACTIVE: '#0072F5',
  TOGGLE_TRACK_INACTIVE: '#6B7280',

  // Shadows
  SHADOW_COLOR: '#000',

  // Special States
  ACTIVE_STATE: '#0072F5',
  HOVER_STATE: '#E6F1FE',
  PRESS_STATE: '#0059C1',

  // Transparent
  TRANSPARENT: 'transparent' as const,
} as const;

/**
 * Logo Theme - ChessEye logo-inspired brown/beige scheme
 */
const LOGO_THEME = {
  // Primary Brand Colors
  PRIMARY: '#9c6045',
  PRIMARY_BACKGROUND: '#f5fdff',

  // Text & Icons (kept as white for contrast)
  TEXT_ON_PRIMARY: '#FFFFFF',
  ICON_ON_PRIMARY: '#FFFFFF',

  // Navigation
  NAVBAR_BACKGROUND: '#f5fdff', 
  NAVBAR_TEXT: '#000000',
  HAMBURGER_ICON: '#000000',

  // Buttons - Primary variant
  BUTTON_PRIMARY_BG: '#B47E65',
  BUTTON_PRIMARY_TEXT: '#f5fdff',
  BUTTON_PRIMARY_HOVER: '#9D6A56',
  BUTTON_PRIMARY_PRESS: '#8B5E4C',

  // Buttons - Outline variant
  BUTTON_OUTLINE_BG: 'transparent' as const,
  BUTTON_OUTLINE_BORDER: '#B47E65',
  BUTTON_OUTLINE_TEXT: '#B47E65',
  BUTTON_OUTLINE_ICON: '#B47E65',
  BUTTON_OUTLINE_HOVER_BG: '#F1D18F',

  // Buttons - Ghost variant
  BUTTON_GHOST_BG: 'transparent' as const,
  BUTTON_GHOST_TEXT: '#B47E65',

  // Buttons - Secondary variant
  BUTTON_SECONDARY_BG: '#F1D18F',
  BUTTON_SECONDARY_TEXT: '#FFFFFF',

  // Buttons - Danger variant (keep red for errors)
  BUTTON_DANGER_BG: '#F31260',
  BUTTON_DANGER_TEXT: '#FFFFFF',

  // Buttons - Special (Lichess, etc.)
  BUTTON_LICHESS_BG: '#A855F7',
  BUTTON_LICHESS_TEXT: '#FFFFFF',

  // Toast Notifications
  TOAST_SUCCESS_BG: '#B47E65',
  TOAST_SUCCESS_TEXT: '#FFFFFF',
  TOAST_SUCCESS_ICON: '#FFFFFF',

  TOAST_ERROR_BG: '#F31260',
  TOAST_ERROR_TEXT: '#FFFFFF',
  TOAST_ERROR_ICON: '#FFFFFF',

  TOAST_WARNING_BG: '#F5A524',
  TOAST_WARNING_TEXT: '#FFFFFF',
  TOAST_WARNING_ICON: '#FFFFFF',

  TOAST_INFO_BG: '#889096',
  TOAST_INFO_TEXT: '#11181C',
  TOAST_INFO_ICON: '#11181C',

  TOAST_SHADOW: '#000',

  // Icons (general)
  ICON_PRIMARY: '#B47E65',
  ICON_SECONDARY: '#6B7280',
  ICON_CHEVRON: '#6B7280',

  // Cards & Containers
  CARD_BACKGROUND: '#F1D18F',
  CARD_BORDER: '#B47E65',
  CARD_HOVER_BG: '#E8C67E',

  // Validation States
  VALIDATION_ERROR: '#F31260',
  VALIDATION_WARNING: '#F5A524',
  VALIDATION_SUCCESS: '#B47E65',

  // Toggle/Switch
  TOGGLE_THUMB: '#FFFFFF',
  TOGGLE_TRACK_ACTIVE: '#B47E65',
  TOGGLE_TRACK_INACTIVE: '#6B7280',

  // Shadows
  SHADOW_COLOR: '#000',

  // Special States
  ACTIVE_STATE: '#B47E65',
  HOVER_STATE: '#E8C67E',
  PRESS_STATE: '#9D6A56',

  // Transparent
  TRANSPARENT: 'transparent' as const,
} as const;

/**
 * Active color constants based on selected theme
 */
export const COLORS = (ACTIVE_THEME as 'light' | 'logo') === 'light' ? LIGHT_THEME : LOGO_THEME;

// Export individual color groups for easier imports
export const BUTTON_COLORS = {
  primary: {
    bg: COLORS.BUTTON_PRIMARY_BG,
    text: COLORS.BUTTON_PRIMARY_TEXT,
    hover: COLORS.BUTTON_PRIMARY_HOVER,
    press: COLORS.BUTTON_PRIMARY_PRESS,
  },
  outline: {
    bg: COLORS.BUTTON_OUTLINE_BG,
    border: COLORS.BUTTON_OUTLINE_BORDER,
    text: COLORS.BUTTON_OUTLINE_TEXT,
    icon: COLORS.BUTTON_OUTLINE_ICON,
    hoverBg: COLORS.BUTTON_OUTLINE_HOVER_BG,
  },
  ghost: {
    bg: COLORS.BUTTON_GHOST_BG,
    text: COLORS.BUTTON_GHOST_TEXT,
  },
  secondary: {
    bg: COLORS.BUTTON_SECONDARY_BG,
    text: COLORS.BUTTON_SECONDARY_TEXT,
  },
  danger: {
    bg: COLORS.BUTTON_DANGER_BG,
    text: COLORS.BUTTON_DANGER_TEXT,
  },
  lichess: {
    bg: COLORS.BUTTON_LICHESS_BG,
    text: COLORS.BUTTON_LICHESS_TEXT,
  },
} as const;

export const TOAST_COLORS = {
  success: {
    bg: COLORS.TOAST_SUCCESS_BG,
    text: COLORS.TOAST_SUCCESS_TEXT,
    icon: COLORS.TOAST_SUCCESS_ICON,
  },
  error: {
    bg: COLORS.TOAST_ERROR_BG,
    text: COLORS.TOAST_ERROR_TEXT,
    icon: COLORS.TOAST_ERROR_ICON,
  },
  warning: {
    bg: COLORS.TOAST_WARNING_BG,
    text: COLORS.TOAST_WARNING_TEXT,
    icon: COLORS.TOAST_WARNING_ICON,
  },
  info: {
    bg: COLORS.TOAST_INFO_BG,
    text: COLORS.TOAST_INFO_TEXT,
    icon: COLORS.TOAST_INFO_ICON,
  },
} as const;
