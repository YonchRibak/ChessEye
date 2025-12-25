import React from 'react';
import { Text, YStack } from 'tamagui';
import { AboutSection, ExternalLinkButton } from '../components/about';
import { ABOUT_END_TO_END_CONTENT, ABOUT_UI_TEXT } from '../constants/aboutContent';

/**
 * About End-to-End CNN Screen
 * Displays information about the ResNeXt-101 end-to-end approach
 */
export default function AboutEndToEndScreen() {
  const { header, summary, features, externalLink, linkText } = ABOUT_END_TO_END_CONTENT;

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

      {/* External Link */}
      {externalLink && (
        <YStack marginTop="$2">
          <ExternalLinkButton
            url={externalLink}
            label={linkText || ABOUT_UI_TEXT.BUTTONS.VIEW_NOTEBOOK}
            icon="logo-python"
            variant="outline"
          />
        </YStack>
      )}
    </AboutSection>
  );
}
