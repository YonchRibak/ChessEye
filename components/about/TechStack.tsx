import React from 'react';
import { Text, XStack, YStack } from 'tamagui';
import { TechStackItem } from '../../types/about';

interface TechStackProps {
  /** Array of tech stack items */
  items: TechStackItem[];
  /** Optional title for the section */
  title?: string;
}

/**
 * Compact, modern component for displaying technology stack
 * Shows technologies in a clean, readable format
 *
 * @example
 * ```tsx
 * <TechStack
 *   title="Tech Stack"
 *   items={[
 *     { category: 'Framework', technologies: ['React Native', 'Expo'] },
 *     { category: 'Language', technologies: ['TypeScript'] }
 *   ]}
 * />
 * ```
 */
export function TechStack({ items, title = 'Tech Stack' }: TechStackProps) {
  return (
    <YStack
      gap="$2.5"
      backgroundColor="linear-gradient(135deg, $blue1 0%, $background 100%)"
      padding="$3.5"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$blue7"
    >
      {/* Section Title */}
      <Text fontSize="$5" fontWeight="700" color="$blue11" letterSpacing={0.3}>
        {title}
      </Text>

      {/* Tech Stack List - Compact */}
      <YStack gap="$1.5">
        {items.map((item, index) => (
          <XStack key={index} gap="$2.5" alignItems="baseline">
            {/* Category */}
            <Text
              fontSize="$2"
              fontWeight="700"
              color="$blue10"
              minWidth={85}
              textTransform="uppercase"
              letterSpacing={0.3}
            >
              {item.category}
            </Text>

            {/* Technologies */}
            <Text
              fontSize="$3"
              color="$gray12"
              flex={1}
              fontWeight="500"
            >
              {item.technologies.join('  •  ')}
            </Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
}
