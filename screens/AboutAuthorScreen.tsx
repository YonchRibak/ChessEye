import React from 'react';
import { Image, Linking, ScrollView } from 'react-native';
import { Button, Text, YStack } from 'tamagui';

import { COLORS } from '@/constants/theme';
import { ABOUT_AUTHOR_CONTENT } from '../constants/aboutContent';

/**
 * About Author Screen
 * Displays information about the developer
 */
export default function AboutAuthorScreen() {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${ABOUT_AUTHOR_CONTENT.links.email.address}`);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.PRIMARY_BACKGROUND }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <YStack
        flex={1}
        backgroundColor={COLORS.PRIMARY_BACKGROUND}
        paddingHorizontal="$4"
        paddingVertical="$6"
        alignItems="center"
        gap="$4"
      >
        {/* Author Image */}
        <Image
          source={ABOUT_AUTHOR_CONTENT.imageSource}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
          }}
          resizeMode="cover"
        />

        {/* Author Name */}
        <Text fontSize="$8" fontWeight="700" color={COLORS.PRIMARY} textAlign="center">
          {ABOUT_AUTHOR_CONTENT.name}
        </Text>

        {/* Author Description */}
        <Text
          fontSize="$5"
          color="$gray11"
          textAlign="center"
          lineHeight="$6"
          paddingHorizontal="$2"
        >
          {ABOUT_AUTHOR_CONTENT.description}
        </Text>

        {/* Links */}
        <YStack gap="$3" marginTop="$4" width="100%" maxWidth={300}>
          {/* GitHub Link */}
          <Button
            size="$4"
            backgroundColor="$gray12"
            color="$gray1"
            onPress={() => handleLinkPress(ABOUT_AUTHOR_CONTENT.links.github.url)}
            pressStyle={{ opacity: 0.8 }}
          >
            {ABOUT_AUTHOR_CONTENT.links.github.label}
          </Button>

          {/* LinkedIn Link */}
          <Button
            size="$4"
            backgroundColor="#0077B5"
            color="white"
            onPress={() => handleLinkPress(ABOUT_AUTHOR_CONTENT.links.linkedin.url)}
            pressStyle={{ opacity: 0.8 }}
          >
            {ABOUT_AUTHOR_CONTENT.links.linkedin.label}
          </Button>

          {/* Email Link */}
          <Button
            size="$4"
            backgroundColor="$gray10"
            color="white"
            onPress={handleEmailPress}
            pressStyle={{ opacity: 0.8 }}
          >
            {ABOUT_AUTHOR_CONTENT.links.email.label}
          </Button>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
