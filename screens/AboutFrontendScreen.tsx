import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, YStack } from 'tamagui';
import { AboutSection, ExternalLinkButton, InfoCard } from '../components/about';
import { ABOUT_FRONTEND_CONTENT, ABOUT_UI_TEXT } from '../constants/aboutContent';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AboutFrontendScreenProps {
  navigation: NavigationProp;
}

/**
 * About Frontend Architecture Screen
 * Displays information about the ChessEye React Native app and links to Board Editor
 */
export default function AboutFrontendScreen({ navigation }: AboutFrontendScreenProps) {
  const { header, summary, cards, externalLink, linkText } = ABOUT_FRONTEND_CONTENT;

  return (
    <AboutSection header={header}>
      {/* Summary */}
      {summary && (
        <Text fontSize="$5" color="$gray11" lineHeight="$2">
          {summary}
        </Text>
      )}

      {/* External Link */}
      {externalLink && (
        <YStack marginTop="$2">
          <ExternalLinkButton
            url={externalLink}
            label={linkText || ABOUT_UI_TEXT.BUTTONS.VIEW_REPOSITORY}
            icon="logo-github"
            variant="outline"
          />
        </YStack>
      )}

      {/* Feature Focus - Board Editor Card */}
      {cards && cards.length > 0 && (
        <YStack gap="$3" marginTop="$3">
          <Text fontSize="$6" fontWeight="600" color="$gray12">
            Feature Focus
          </Text>
          {cards.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              summary={card.summary}
              onPress={() => {
                if (card.route) {
                  navigation.navigate(card.route as any);
                }
              }}
            />
          ))}
        </YStack>
      )}
    </AboutSection>
  );
}
