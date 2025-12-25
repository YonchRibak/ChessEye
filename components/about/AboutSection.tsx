import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { Text, YStack } from 'tamagui';

interface AboutSectionProps {
  /** Section header/title */
  header: string;
  /** Optional subtitle or task description */
  subtitle?: string;
  /** Section content */
  children: ReactNode;
  /** Optional padding override */
  padding?: string;
}

/**
 * Wrapper component for About section screens
 * Provides consistent layout with header, optional subtitle, and scrollable content
 *
 * @example
 * ```tsx
 * <AboutSection header="Machine Learning" subtitle="Extraction approaches">
 *   <InfoCard ... />
 *   <InfoCard ... />
 * </AboutSection>
 * ```
 */
export function AboutSection({
  header,
  subtitle,
  children,
  padding = '$4',
}: AboutSectionProps) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <YStack
        flex={1}
        backgroundColor="$background"
        padding={padding}
        gap="$4"
      >
        {/* Header Section */}
        <YStack gap="$2">
          <Text
            fontSize="$8"
            fontWeight="700"
            color="$gray12"
            lineHeight="$1"
          >
            {header}
          </Text>
          {subtitle && (
            <Text
              fontSize="$5"
              color="$gray11"
              lineHeight="$2"
            >
              {subtitle}
            </Text>
          )}
        </YStack>

        {/* Content Section */}
        <YStack gap="$4" flex={1}>
          {children}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
