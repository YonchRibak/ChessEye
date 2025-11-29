import React from 'react';
import { Card as TamaguiCard, type CardProps as TamaguiCardProps, YStack } from 'tamagui';
import { UiUtils } from './utils/ui-utils';

export interface CardProps extends TamaguiCardProps {
  variant?: 'elevated' | 'outlined' | 'filled';
}

/**
 * Reusable Card component built with Tamagui
 *
 * @example
 * ```tsx
 * <Card variant="elevated">
 *   <Text>Card content goes here</Text>
 * </Card>
 * ```
 */
export function Card({
  variant = 'elevated',
  children,
  ...props
}: CardProps) {


  const variantStyles = UiUtils.getCardVariantStyles(variant);

  return (
    <TamaguiCard
      {...variantStyles}
      {...props}
    >
      <YStack gap="$3">
        {children}
      </YStack>
    </TamaguiCard>
  );
}
