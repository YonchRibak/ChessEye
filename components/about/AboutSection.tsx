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
  padding = '$5',
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
        paddingHorizontal={padding}
        paddingVertical="$6"
        gap="$5"
        alignItems="center"
      >
        {/* Content Container with max width */}
        <YStack
          width="100%"
          maxWidth={600}
          gap="$5"
        >
          {/* Header Section */}
          <YStack gap="$3" paddingTop="$4">
            <Text
              fontSize="$9"
              fontWeight="700"
              color="$gray12"
              lineHeight={40}
              textAlign="center"
            >
              {header}
            </Text>
            {subtitle && (
              <Text
                fontSize="$5"
                color="$gray11"
                lineHeight={24}
                textAlign="center"
              >
                {subtitle}
              </Text>
            )}
          </YStack>

          {/* Content Section */}
          <YStack gap="$4">
            {children}
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
