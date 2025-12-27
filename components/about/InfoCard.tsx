import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';

import { COLORS } from '@/constants/theme';
import { AboutCardData } from '../../types/about';

interface InfoCardProps extends AboutCardData {
  /** Callback when card is pressed */
  onPress: () => void;
  /** Optional variant for styling */
  variant?: 'default' | 'minimal';
}

/**
 * Reusable card component for About section navigation
 * Displays title, summary, and optional navigation arrow
 *
 * @example
 * ```tsx
 * <InfoCard
 *   title="Machine Learning"
 *   summary="Explore ML approaches"
 *   route="AboutML"
 *   onPress={() => navigation.navigate('AboutML')}
 * />
 * ```
 */
export function InfoCard({
  title,
  summary,
  onPress,
  variant = 'default',
}: InfoCardProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <YStack
          backgroundColor={COLORS.PRIMARY_BACKGROUND}
          borderRadius="$4"
          padding="$4"
          borderWidth={1}
          borderColor="$gray6"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.05}
          shadowRadius={4}
          elevation={1}
          opacity={pressed ? 0.7 : 1}
          hoverStyle={{
            borderColor: COLORS.CARD_BORDER,
            shadowOpacity: 0.1,
          }}
        >
          <XStack justifyContent="space-between" alignItems="flex-start" gap="$3">
            <YStack flex={1} gap="$2">
              <Text
                fontSize="$6"
                fontWeight="600"
                color= {COLORS.PRIMARY}                numberOfLines={2}
              >
                {title}
              </Text>
              <Text
                fontSize="$4"
                color="$gray11"
                numberOfLines={variant === 'minimal' ? 2 : 4}
                lineHeight="$1"
              >
                {summary}
              </Text>
            </YStack>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.ICON_CHEVRON}
              style={{ marginTop: 2 }}
            />
          </XStack>
        </YStack>
      )}
    </Pressable>
  );
}
