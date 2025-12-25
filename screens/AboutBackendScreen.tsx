import React from 'react';
import { Text, YStack } from 'tamagui';
import { AboutSection, ExternalLinkButton, TechStack } from '../components/about';
import { ABOUT_BACKEND_CONTENT, ABOUT_UI_TEXT } from '../constants/aboutContent';

/**
 * About Backend Architecture Screen
 * Displays information about the FastAPI backend service
 */
export default function AboutBackendScreen() {
  const { header, summary, features, techStack, externalLink, linkText } = ABOUT_BACKEND_CONTENT;

  return (
    <AboutSection header={header}>
      {/* Summary */}
      {summary && (
        <Text fontSize="$4" color="$gray11" lineHeight="$2" textAlign="center">
          {summary}
        </Text>
      )}

      {/* Tech Stack */}
      {techStack && techStack.length > 0 && (
        <TechStack items={techStack} title="Technology Stack" />
      )}

      {/* External Link */}
      {externalLink && (
        <ExternalLinkButton
          url={externalLink}
          label={linkText || ABOUT_UI_TEXT.BUTTONS.VIEW_REPOSITORY}
          icon="logo-github"
          variant="outline"
        />
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
    </AboutSection>
  );
}
