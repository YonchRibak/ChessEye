/**
 * Toast notification type definitions
 */

/**
 * Toast variant types matching alert categories
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast configuration interface
 */
export interface ToastConfig {
  /** The variant/type of toast to display */
  variant: ToastVariant;
  /** The main title of the toast */
  title: string;
  /** Optional detailed message */
  message?: string;
  /** Duration in milliseconds (0 = no auto-dismiss) */
  duration?: number;
  /** Position on screen */
  position?: 'top' | 'bottom';
}
