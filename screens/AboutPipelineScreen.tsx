import React from 'react';
import { Text, YStack } from 'tamagui';
import { AboutSection, ExternalLinkButton } from '../components/about';
import { ABOUT_PIPELINE_CONTENT, ABOUT_UI_TEXT } from '../constants/aboutContent';

/**
 * About Preprocessing Pipeline Screen
 * Displays information about the YOLO-based pipeline approach
 */
export default function AboutPipelineScreen() {
  const { header, summary, features, externalLink, linkText } = ABOUT_PIPELINE_CONTENT;

  return (
    <AboutSection header={header}>
      {/* Summary */}
      {summary && (
        <Text fontSize="$4" color="$gray11" lineHeight="$2" textAlign="center">
          {summary}
        </Text>
      )}

      {/* Pipeline Steps */}
      {features && features.length > 0 && (
        <YStack gap="$3">
          <Text fontSize="$6" fontWeight="600" color="$gray12">
            Pipeline Steps
          </Text>
          <YStack gap="$2" paddingLeft="$3">
            {features.map((feature, index) => (
              <Text key={index} fontSize="$4" color="$gray11" lineHeight="$2">
                {index + 1}. {feature}
              </Text>
            ))}
          </YStack>
        </YStack>
      )}

      {/* External Link */}
      {externalLink && (
        <ExternalLinkButton
          url={externalLink}
          label={linkText || ABOUT_UI_TEXT.BUTTONS.VIEW_NOTEBOOK}
          icon="logo-python"
          variant="outline"
        />
      )}
    </AboutSection>
  );
}
