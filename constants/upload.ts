/**
 * Constants for Upload Screen
 * Centralizes all text, messages, and UI values used in upload functionality
 */

import { COLORS } from './theme';

export const UPLOAD_CONSTANTS = {
  // Instructions
  INSTRUCTIONS: {
    TEXT: 'Upload an image of a chess position for the models to analyze',
  },

  // Button labels
  BUTTONS: {
    CAMERA_LABEL: 'Take Photo',
    GALLERY_LABEL: 'Choose from Gallery',
    MAX_WIDTH: 400,
  },

  // Processing
  PROCESSING: {
    MESSAGE: 'Analyzing board position...',
  },

  // Alert messages
  ALERTS: {
    API_CONNECTED: {
      TITLE: 'API Connected',
      getMessage: (status: string) => `Successfully connected to API server!\n\nStatus: ${status}`,
    },
    API_FAILED: {
      TITLE: 'API Connection Failed',
      getMessage: (errorMsg: string) =>
        `Cannot reach API server.\n\nPlease check:\n1. PC and phone on same WiFi\n2. Firewall allows port 8081\n3. Test in phone browser: http://10.0.0.4:8081/health\n\nError: ${errorMsg}`,
    },
    PREDICTION_FAILED: {
      TITLE: 'Prediction Failed',
      getMessage: (errorMsg?: string) => errorMsg || 'Unable to process the image. Please try again.',
    },
  },

  // Icon names
  ICONS: {
    CAMERA: 'camera' as const,
    GALLERY: 'images' as const,
  },

  // Colors
  COLORS: {
    ICON_COLOR: COLORS.PRIMARY,
  },
} as const;
