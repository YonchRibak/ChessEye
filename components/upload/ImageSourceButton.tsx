import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';

import { COLORS } from '@/constants/theme';

type ButtonVariant = 'primary' | 'outline';

interface ImageSourceButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  iconColor?: string;
}

/**
 * Reusable button for image source selection (camera/gallery)
 * Supports primary (filled) and outline variants
 */
export function ImageSourceButton({
  icon,
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  iconColor,
}: ImageSourceButtonProps) {
  const isPrimary = variant === 'primary';
  const finalIconColor = iconColor || (isPrimary ? COLORS.ICON_ON_PRIMARY : COLORS.BUTTON_OUTLINE_ICON);
  const textColor = isPrimary ? COLORS.BUTTON_PRIMARY_TEXT : COLORS.BUTTON_OUTLINE_TEXT;

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      {({ pressed }) => (
        <YStack
          backgroundColor={isPrimary ? COLORS.PRIMARY : COLORS.BUTTON_OUTLINE_BG}
          paddingVertical="$4"
          paddingHorizontal="$5"
          borderRadius="$4"
          borderWidth={isPrimary ? 0 : 1}
          borderColor={isPrimary ? undefined : COLORS.BUTTON_OUTLINE_BORDER}
          opacity={pressed ? 0.8 : disabled ? 0.5 : 1}
        >
          <XStack gap="$3" alignItems="center" justifyContent="center">
            <Ionicons name={icon} size={24} color={finalIconColor} />
            <Text color={textColor} fontSize="$5" fontWeight="600">
              {label}
            </Text>
          </XStack>
        </YStack>
      )}
    </Pressable>
  );
}
