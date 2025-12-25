import React from 'react';
import { Text, YStack } from 'tamagui';
import { AboutSection } from '../components/about';
import { ABOUT_BACKEND_CONTENT, ABOUT_UI_TEXT } from '../constants/aboutContent';

/**
 * About Backend Architecture Screen
 * Displays information about the FastAPI backend service
 * Note: This is currently a placeholder screen
 */
export default function AboutBackendScreen() {
  const { header, summary, features } = ABOUT_BACKEND_CONTENT;

  return (
    <AboutSection header={header}>
      {/* Summary */}
      {summary && (
        <Text fontSize="$5" color="$gray11" lineHeight="$2">
          {summary}
        </Text>
      )}

      {/* Key Features */}
      {features && features.length > 0 && (
        <YStack gap="$3">
          <Text fontSize="$6" fontWeight="600" color="$gray12">
            {ABOUT_UI_TEXT.SECTIONS.KEY_FEATURES_TITLE}
          </Text>
          <YStack gap="$2" paddingLeft="$3">
            {features.map((feature, index) => (
              <Text key={index} fontSize="$4" color="$gray11" lineHeight="$2">
                • {feature}
              </Text>
            ))}
          </YStack>
        </YStack>
      )}

      {/* Placeholder note */}
      <YStack
        backgroundColor="$blue2"
        padding="$3"
        borderRadius="$3"
        borderWidth={1}
        borderColor="$blue6"
        marginTop="$2"
      >
        <Text fontSize="$3" color="$blue11" fontStyle="italic">
          Note: Detailed backend documentation coming soon.
        </Text>
      </YStack>
    </AboutSection>
  );
}
