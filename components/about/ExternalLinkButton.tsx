import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable } from 'react-native';
import { Text, XStack } from 'tamagui';

import { COLORS } from '@/constants/theme';
import { TOAST_CONSTANTS } from '../../constants/toast';
import { ToastUtils } from '../../utils/toast-utils';

interface ExternalLinkButtonProps {
  /** External URL to open */
  url: string;
  /** Button label text */
  label: string;
  /** Optional icon name from Ionicons */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Optional variant for styling */
  variant?: 'primary' | 'outline';
}

/**
 * Button component for opening external links (GitHub, Kaggle, etc.)
 * Handles URL validation and provides user feedback
 *
 * @example
 * ```tsx
 * <ExternalLinkButton
 *   url="https://github.com/YonchRibak/ChessEye"
 *   label="View Repository"
 *   icon="logo-github"
 *   variant="outline"
 * />
 * ```
 */
export function ExternalLinkButton({
  url,
  label,
  icon = 'open-outline',
  variant = 'outline',
}: ExternalLinkButtonProps) {
  const isPrimary = variant === 'primary';

  const handlePress = async () => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        ToastUtils.error('Error', 'Cannot open this URL', TOAST_CONSTANTS.DURATION.SHORT);
      }
    } catch (error) {
      ToastUtils.error('Error', 'Failed to open link', TOAST_CONSTANTS.DURATION.SHORT);
      console.log('Error opening URL:', error);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <XStack
          backgroundColor={isPrimary ? COLORS.BUTTON_PRIMARY_BG : COLORS.BUTTON_OUTLINE_BG}
          paddingVertical="$3"
          paddingHorizontal="$4"
          borderRadius="$3"
          borderWidth={isPrimary ? 0 : 1}
          borderColor={isPrimary ? undefined : COLORS.BUTTON_OUTLINE_BORDER}
          alignItems="center"
          justifyContent="center"
          gap="$2"
          opacity={pressed ? 0.7 : 1}
          hoverStyle={{
            backgroundColor: isPrimary ? COLORS.BUTTON_PRIMARY_HOVER : COLORS.BUTTON_OUTLINE_HOVER_BG,
          }}
        >
          <Ionicons
            name={icon}
            size={18}
            color={isPrimary ? COLORS.ICON_ON_PRIMARY : COLORS.BUTTON_OUTLINE_ICON}
          />
          <Text
            color={isPrimary ? COLORS.BUTTON_PRIMARY_TEXT : COLORS.BUTTON_OUTLINE_TEXT}
            fontSize="$4"
            fontWeight="600"
          >
            {label}
          </Text>
        </XStack>
      )}
    </Pressable>
  );
}
