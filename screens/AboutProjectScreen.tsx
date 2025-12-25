import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, YStack } from 'tamagui';
import { AboutSection, InfoCard } from '../components/about';
import { ABOUT_PROJECT_CONTENT } from '../constants/aboutContent';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AboutProjectScreenProps {
  navigation: NavigationProp;
}

/**
 * About Project Screen - Main Landing Page
 * Displays ChessEye project overview and navigates to ML and Frontend sections
 */
export default function AboutProjectScreen({ navigation }: AboutProjectScreenProps) {
  const { header, summary, cards } = ABOUT_PROJECT_CONTENT;

  return (
    <AboutSection header={header}>
      {/* Project Summary */}
      {summary && (
        <Text fontSize="$4" color="$gray11" lineHeight="$2" textAlign="center">
          {summary}
        </Text>
      )}

      {/* Navigation Cards */}
      {cards && cards.length > 0 && (
        <YStack gap="$3">
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
