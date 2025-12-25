import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, YStack } from 'tamagui';
import { AboutSection, InfoCard } from '../components/about';
import { ABOUT_ML_CONTENT } from '../constants/aboutContent';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AboutMLScreenProps {
  navigation: NavigationProp;
}

/**
 * About Machine Learning Approaches Screen
 * Displays overview of ML methodologies and navigates to End-to-End and Pipeline screens
 */
export default function AboutMLScreen({ navigation }: AboutMLScreenProps) {
  const { header, taskDescription, summary, cards } = ABOUT_ML_CONTENT;

  return (
    <AboutSection header={header} subtitle={taskDescription}>
      {/* Summary */}
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
