import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Text, YStack } from 'tamagui';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItemProps {
  label: string;
  onPress: () => void;
}

/**
 * Individual menu item component
 */
function MenuItem({ label, onPress }: MenuItemProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <YStack
          paddingVertical="$3"
          paddingHorizontal="$4"
          backgroundColor={pressed ? '$gray4' : 'transparent'}
          borderRadius="$2"
        >
          <Text
            color="$gray12"
            fontSize="$5"
            fontWeight="500"
          >
            {label}
          </Text>
        </YStack>
      )}
    </Pressable>
  );
}

/**
 * Collapsible hamburger menu with navigation links
 *
 * @example
 * ```tsx
 * <HamburgerMenu />
 * ```
 */
export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (screen: keyof RootStackParamList) => {
    setIsOpen(false);
    navigation.navigate(screen as any);
  };

  return (
    <YStack position="relative">
      {/* Hamburger Button */}
      <Pressable onPress={toggleMenu}>
        {({ pressed }) => (
          <YStack
            padding="$2"
            backgroundColor={pressed ? '$gray4' : 'transparent'}
            borderRadius="$2"
          >
            <Ionicons
              name={isOpen ? 'close' : 'menu'}
              size={28}
              color="$gray12"
            />
          </YStack>
        )}
      </Pressable>

      {/* Collapsible Menu */}
      {isOpen && (
        <YStack
          position="absolute"
          top="$6"
          right={0}
          backgroundColor="$background"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$gray6"
          padding="$2"
          minWidth={200}
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.15}
          shadowRadius={12}
          elevation={4}
          zIndex={1000}
        >
          <MenuItem
            label="New Position"
            onPress={() => handleNavigation('Upload')}
          />
          <MenuItem
            label="About Project"
            onPress={() => handleNavigation('AboutProject')}
          />
          <MenuItem
            label="About Author"
            onPress={() => handleNavigation('AboutAuthor')}
          />
        </YStack>
      )}
    </YStack>
  );
}
