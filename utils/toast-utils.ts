/**
 * Toast notification utility service
 * Centralized API for displaying toast notifications throughout the app
 * Follows the existing utility class pattern (ImageUtils, UploadUtils)
 */

import Toast from 'react-native-toast-message';
import { TOAST_CONSTANTS } from '../constants/toast';
import type { ToastConfig, ToastVariant } from '../types/toast';

/**
 * ToastUtils - Static class for managing toast notifications
 *
 * @example
 * ```tsx
 * // Show success toast
 * ToastUtils.success('Success!', 'Your changes have been saved');
 *
 * // Show error with custom duration
 * ToastUtils.error('Error', 'Something went wrong', TOAST_CONSTANTS.DURATION.LONG);
 *
 * // Show warning
 * ToastUtils.warning('Warning', 'Please grant camera permissions');
 * ```
 */
export class ToastUtils {
  /**
   * Show a success toast notification
   * @param title - Main title text
   * @param message - Optional detailed message
   * @param duration - Duration in milliseconds (defaults to SHORT)
   */
  static success(
    title: string,
    message?: string,
    duration: number = TOAST_CONSTANTS.DURATION.SHORT
  ): void {
    this.show({
      variant: 'success',
      title,
      message,
      duration,
      position: TOAST_CONSTANTS.POSITION.DEFAULT,
    });
  }

  /**
   * Show an error toast notification
   * @param title - Main title text
   * @param message - Optional detailed message
   * @param duration - Duration in milliseconds (defaults to MEDIUM)
   */
  static error(
    title: string,
    message?: string,
    duration: number = TOAST_CONSTANTS.DURATION.MEDIUM
  ): void {
    this.show({
      variant: 'error',
      title,
      message,
      duration,
      position: TOAST_CONSTANTS.POSITION.DEFAULT,
    });
  }

  /**
   * Show a warning toast notification
   * @param title - Main title text
   * @param message - Optional detailed message
   * @param duration - Duration in milliseconds (defaults to MEDIUM)
   */
  static warning(
    title: string,
    message?: string,
    duration: number = TOAST_CONSTANTS.DURATION.MEDIUM
  ): void {
    this.show({
      variant: 'warning',
      title,
      message,
      duration,
      position: TOAST_CONSTANTS.POSITION.DEFAULT,
    });
  }

  /**
   * Show an info toast notification
   * @param title - Main title text
   * @param message - Optional detailed message
   * @param duration - Duration in milliseconds (defaults to MEDIUM)
   */
  static info(
    title: string,
    message?: string,
    duration: number = TOAST_CONSTANTS.DURATION.MEDIUM
  ): void {
    this.show({
      variant: 'info',
      title,
      message,
      duration,
      position: TOAST_CONSTANTS.POSITION.DEFAULT,
    });
  }

  /**
   * Show a toast with custom configuration
   * @param config - Toast configuration object
   */
  static show(config: ToastConfig): void {
    const {
      variant,
      title,
      message,
      duration = TOAST_CONSTANTS.DURATION.MEDIUM,
      position = TOAST_CONSTANTS.POSITION.DEFAULT,
    } = config;

    Toast.show({
      type: variant,
      text1: title,
      text2: message,
      visibilityTime: duration,
      position,
      topOffset: TOAST_CONSTANTS.OFFSET.TOP,
      bottomOffset: TOAST_CONSTANTS.OFFSET.BOTTOM,
    });
  }

  /**
   * Hide the currently visible toast
   */
  static hide(): void {
    Toast.hide();
  }
}
