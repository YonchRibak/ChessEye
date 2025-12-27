import React from 'react';
import { Button as TamaguiButton, type ButtonProps as TamaguiButtonProps, Text } from 'tamagui';

import { COLORS } from '@/constants/theme';
import { UiUtils } from './utils/ui-utils';
export interface ButtonProps extends Omit<TamaguiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

/**
 * Reusable Button component built with Tamagui
 *
 * @example
 * ```tsx
 * <Button variant="primary" onPress={() => console.log('Pressed')}>
 *   Click Me
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  children,
  disabled,
  ...props
}: ButtonProps) {

    const variantStyles = UiUtils.getButtonVariantStyles(variant);

    // Determine text color based on variant
    const getTextColor = () => {
      switch (variant) {
        case 'primary':
          return COLORS.BUTTON_PRIMARY_TEXT;
        case 'secondary':
          return COLORS.BUTTON_SECONDARY_TEXT;
        case 'danger':
          return COLORS.BUTTON_DANGER_TEXT;
        case 'outline':
          return COLORS.BUTTON_OUTLINE_TEXT;
        case 'ghost':
          return COLORS.BUTTON_GHOST_TEXT;
        default:
          return COLORS.BUTTON_PRIMARY_TEXT;
      }
    };

    return (
        <TamaguiButton
        {...variantStyles}
        disabled={disabled}
        opacity={disabled ? 0.5 : 1}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        {...props}
        >
        <Text color={getTextColor()}>{children}</Text>
        </TamaguiButton>
  );
}
