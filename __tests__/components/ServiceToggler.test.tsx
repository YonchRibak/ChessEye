import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ServiceToggler } from '@/components/ServiceToggler';
import { useServiceSwitchMutation, useCurrentService } from '@/hooks/api';

// Mock the hooks
jest.mock('@/hooks/api');

describe('ServiceToggler', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useServiceSwitchMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Service Type Display Name Mapping', () => {
    test('displays "End-to-End Model" for EndToEndChessBoardClassifier', () => {
      (useCurrentService as jest.Mock).mockReturnValue({
        data: {
          service_type: 'EndToEndChessBoardClassifier',
          service_name: 'End-to-End Model',
        },
        isLoading: false,
        isError: false,
      });

      const { getByText } = render(<ServiceToggler />);

      expect(getByText('End-to-End Model')).toBeTruthy();
    });

    test('displays "Pipeline Model" for ChessBoardPipelineClassifier', () => {
      (useCurrentService as jest.Mock).mockReturnValue({
        data: {
          service_type: 'ChessBoardPipelineClassifier',
          service_name: 'Pipeline Model',
        },
        isLoading: false,
        isError: false,
      });

      const { getByText } = render(<ServiceToggler />);

      expect(getByText('Pipeline Model')).toBeTruthy();
    });
  });

  describe('Service Identifier Mapping', () => {
    test('calls switchService with correct identifier on toggle', () => {
      (useCurrentService as jest.Mock).mockReturnValue({
        data: {
          service_type: 'EndToEndChessBoardClassifier',
        },
        isLoading: false,
        isError: false,
      });

      const { getByRole } = render(<ServiceToggler />);

      // Find and press the toggle button
      const toggleButton = getByRole('button');
      fireEvent.press(toggleButton);

      // Should switch TO pipeline model (identifier: 'pipeline')
      expect(mockMutate).toHaveBeenCalledWith('pipeline');
    });
  });

  describe('Circular Rotation Logic', () => {
    test('cycles through services in circular fashion', () => {
      (useCurrentService as jest.Mock).mockReturnValue({
        data: {
          service_type: 'EndToEndChessBoardClassifier',
        },
        isLoading: false,
        isError: false,
      });

      const { getByRole, rerender } = render(<ServiceToggler />);

      const toggleButton = getByRole('button');

      // First press: Switch to pipeline
      fireEvent.press(toggleButton);
      expect(mockMutate).toHaveBeenCalledWith('pipeline');

      // Simulate service changed to pipeline
      (useCurrentService as jest.Mock).mockReturnValue({
        data: {
          service_type: 'ChessBoardPipelineClassifier',
        },
        isLoading: false,
        isError: false,
      });
      rerender(<ServiceToggler />);

      // Second press: Should cycle back to end_to_end
      fireEvent.press(toggleButton);
      expect(mockMutate).toHaveBeenCalledWith('end_to_end');
    });
  });

  describe('Fallback for Empty service_type', () => {
    test('shows fallback message when service_type is empty', () => {
      (useCurrentService as jest.Mock).mockReturnValue({
        data: {
          service_type: '',
          service_name: '',
        },
        isLoading: false,
        isError: false,
      });

      const { getByText } = render(<ServiceToggler />);

      expect(getByText('Unknown Service')).toBeTruthy();
    });
  });

  describe('Single Service Behavior', () => {
    test('hides toggle when only one service is available', () => {
      // Mock that only one service exists
      (useCurrentService as jest.Mock).mockReturnValue({
        data: {
          service_type: 'EndToEndChessBoardClassifier',
          available_services: ['EndToEndChessBoardClassifier'], // Only one
        },
        isLoading: false,
        isError: false,
      });

      const { queryByRole } = render(<ServiceToggler />);

      // Toggle button should not exist
      expect(queryByRole('button')).toBeNull();
    });
  });

  describe('Error State Handling', () => {
    test('displays error message when service fetch fails', () => {
      (useCurrentService as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error('Failed to fetch service'),
      });

      const { getByText } = render(<ServiceToggler />);

      expect(getByText(/error/i)).toBeTruthy();
    });
  });

  describe('Loading State Handling', () => {
    test('shows loading indicator while fetching service', () => {
      (useCurrentService as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      });

      const { getByTestId } = render(<ServiceToggler />);

      // Assuming component has a loading indicator with testID
      expect(getByTestId('service-loading')).toBeTruthy();
    });
  });
});
