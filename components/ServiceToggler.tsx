import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { useCurrentService, useServiceSwitchMutation } from '../hooks/api';
import { Button } from './ui/button';

interface ServiceTogglerProps {
  /** Optional callback fired when service switch is successful */
  onSwitchSuccess?: () => void;
}

/**
 * ServiceToggler Component
 * Displays current prediction service and allows switching between available services
 */
export function ServiceToggler({ onSwitchSuccess }: ServiceTogglerProps = {}) {
  const { data: currentServiceData, isLoading, isError, error } = useCurrentService();
  const switchMutation = useServiceSwitchMutation();

  // Log the data for debugging
  console.log('[ServiceToggler] Query state:', { isLoading, isError, hasData: !!currentServiceData });
  console.log('[ServiceToggler] Current service data:', currentServiceData);

  if (isLoading) {
    return (
      <XStack
        paddingHorizontal="$3"
        paddingVertical="$2"
        backgroundColor="$gray2"
        borderRadius="$3"
        alignItems="center"
        gap="$2"
        alignSelf="center"
      >
        <ActivityIndicator size="small" />
        <Text fontSize="$2" color="$gray11">
          Loading services...
        </Text>
      </XStack>
    );
  }

  if (isError || !currentServiceData) {
    console.error('[ServiceToggler] Error fetching current service:', error);
    return (
      <XStack
        paddingHorizontal="$3"
        paddingVertical="$2"
        backgroundColor="$red2"
        borderRadius="$3"
        alignItems="center"
        gap="$2"
        alignSelf="center"
      >
        <Text fontSize="$2" color="$red11">
          Failed to load services
        </Text>
      </XStack>
    );
  }

  const { service_type, available_services, service_info } = currentServiceData;

  // Backend sometimes returns empty string for service_type, fallback to service_info
  const actualServiceType = service_type || service_info?.service_type || null;

  // Map backend service class names to frontend-friendly names
  const getDisplayName = (serviceType: string | null): string => {
    if (!serviceType) return 'Unknown';

    // Map class names to user-friendly names
    const serviceMap: Record<string, string> = {
      'EndToEndPipelineService': 'End-to-End',
      'MultiModelPipelineService': 'Pipeline',
      'end_to_end': 'End-to-End',
      'multi_model_pipeline': 'Pipeline',
    };

    return serviceMap[serviceType] || serviceType;
  };

  // Map backend service type to API service identifier
  const getServiceIdentifier = (serviceType: string | null): string | null => {
    if (!serviceType) return null;

    const identifierMap: Record<string, string> = {
      'EndToEndPipelineService': 'end_to_end',
      'MultiModelPipelineService': 'multi_model_pipeline',
      'end_to_end': 'end_to_end',
      'multi_model_pipeline': 'multi_model_pipeline',
    };

    return identifierMap[serviceType] || serviceType;
  };

  // If only one service is available, don't show the toggler
  if (available_services.length <= 1) {
    console.log('[ServiceToggler] Only one service available, hiding toggler');
    return null;
  }

  const handleToggle = () => {
    const currentIdentifier = getServiceIdentifier(actualServiceType);

    if (!currentIdentifier) {
      console.warn('[ServiceToggler] Cannot toggle: service_type is null or unknown');
      return;
    }

    // Find the next service in the list
    const currentIndex = available_services.indexOf(currentIdentifier);
    const nextIndex = (currentIndex + 1) % available_services.length;
    const nextService = available_services[nextIndex];

    console.log('[ServiceToggler] Switching service:', {
      from: currentIdentifier,
      to: nextService,
      available: available_services,
    });

    switchMutation.mutate(nextService, {
      onSuccess: (data) => {
        console.log('[ServiceToggler] Switch successful:', data);
        // Call the callback if provided
        if (onSwitchSuccess) {
          console.log('[ServiceToggler] Triggering onSwitchSuccess callback');
          onSwitchSuccess();
        }
      },
      onError: (error) => {
        console.error('[ServiceToggler] Switch failed:', error);
      },
    });
  };

  return (
    <YStack gap="$2" alignItems="center">
      <XStack
        paddingHorizontal="$3"
        paddingVertical="$2"
        backgroundColor="$gray2"
        borderRadius="$3"
        alignItems="center"
        gap="$3"
      >
        <Text fontSize="$2" color="$gray11" fontWeight="500">
          Model:
        </Text>
        <Text fontSize="$3" fontWeight="700" color="$blue10">
          {getDisplayName(actualServiceType)}
        </Text>
        <Button
          variant="outline"
          size="$2"
          onPress={handleToggle}
          disabled={switchMutation.isPending}
          paddingHorizontal="$3"
          paddingVertical="$1"
        >
          {switchMutation.isPending ? 'Switching...' : 'Switch'}
        </Button>
      </XStack>
      {switchMutation.isError && (
        <XStack
          paddingHorizontal="$3"
          paddingVertical="$2"
          backgroundColor="$red2"
          borderRadius="$3"
        >
          <Text fontSize="$2" color="$red11">
            Failed to switch service
          </Text>
        </XStack>
      )}
    </YStack>
  );
}
