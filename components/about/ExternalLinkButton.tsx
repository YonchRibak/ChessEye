import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Linking, Pressable } from 'react-native';
import { Text, XStack } from 'tamagui';

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
        Alert.alert('Error', 'Cannot open this URL');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open link');
      console.error('Error opening URL:', error);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <XStack
          backgroundColor={isPrimary ? '$blue10' : 'transparent'}
          paddingVertical="$3"
          paddingHorizontal="$4"
          borderRadius="$3"
          borderWidth={isPrimary ? 0 : 1}
          borderColor={isPrimary ? undefined : '$blue10'}
          alignItems="center"
          justifyContent="center"
          gap="$2"
          opacity={pressed ? 0.7 : 1}
          hoverStyle={{
            backgroundColor: isPrimary ? '$blue11' : '$blue2',
          }}
        >
          <Ionicons
            name={icon}
            size={18}
            color={isPrimary ? 'white' : '#2563EB'}
          />
          <Text
            color={isPrimary ? 'white' : '$blue10'}
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
