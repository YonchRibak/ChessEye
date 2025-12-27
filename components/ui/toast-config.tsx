/**
 * Custom toast configuration with Tamagui styling
 * Matches ChessEye's clean, card-based design aesthetic
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import type { ToastConfigParams } from 'react-native-toast-message';
import { Text, XStack, YStack } from 'tamagui';

import { TOAST_COLORS, COLORS } from '@/constants/theme';

/**
 * Icon configuration for each toast variant
 */
const TOAST_ICONS = {
  success: 'checkmark-circle' as const,
  error: 'alert-circle' as const,
  warning: 'warning' as const,
  info: 'information-circle' as const,
};

// Toast colors are now imported from @/constants/theme

/**
 * Custom toast component for a specific variant
 */
function CustomToast({
  variant,
  text1,
  text2,
}: {
  variant: keyof typeof TOAST_ICONS;
  text1?: string;
  text2?: string;
}) {
  const colors = TOAST_COLORS[variant];
  const iconName = TOAST_ICONS[variant];

  return (
    <XStack
      backgroundColor={colors.bg}
      paddingVertical="$3"
      paddingHorizontal="$4"
      borderRadius="$3"
      alignItems="center"
      gap="$2"
      maxWidth="90%"
      style={styles.toastContainer}
    >
      {/* Icon */}
      <Ionicons name={iconName} size={20} color={colors.icon} />

      {/* Text content */}
      <YStack flex={1} gap="$1">
        {/* Title */}
        {text1 && (
          <Text
            color={colors.text}
            fontSize="$4"
            fontWeight="600"
            numberOfLines={2}
          >
            {text1}
          </Text>
        )}

        {/* Optional message */}
        {text2 && (
          <Text
            color={colors.text}
            fontSize="$3"
            numberOfLines={3}
            opacity={0.9}
          >
            {text2}
          </Text>
        )}
      </YStack>
    </XStack>
  );
}

/**
 * Styles for toast container
 * Using StyleSheet for shadow properties
 */
const styles = StyleSheet.create({
  toastContainer: {
    elevation: 2,
    shadowColor: COLORS.TOAST_SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

/**
 * Toast configuration object for react-native-toast-message
 * Defines custom render functions for each variant
 */
export const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <CustomToast variant="success" text1={props.text1} text2={props.text2} />
  ),
  error: (props: ToastConfigParams<any>) => (
    <CustomToast variant="error" text1={props.text1} text2={props.text2} />
  ),
  warning: (props: ToastConfigParams<any>) => (
    <CustomToast variant="warning" text1={props.text1} text2={props.text2} />
  ),
  info: (props: ToastConfigParams<any>) => (
    <CustomToast variant="info" text1={props.text1} text2={props.text2} />
  ),
};
