import React from 'react';
import { Button as TamaguiButton, type ButtonProps as TamaguiButtonProps, Text } from 'tamagui';
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
        case 'secondary':
        case 'danger':
          return 'white';
        case 'outline':
        case 'ghost':
          return '$blue10';
        default:
          return 'white';
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
