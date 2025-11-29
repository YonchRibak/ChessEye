import React from 'react';
import { Label, Input as TamaguiInput, type InputProps as TamaguiInputProps, Text, YStack } from 'tamagui';

export interface InputProps extends TamaguiInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

/**
 * Reusable Input component built with Tamagui
 *
 * @example
 * ```tsx
 * <Input
 *   label="FEN Notation"
 *   placeholder="Enter FEN string..."
 *   value={fen}
 *   onChangeText={setFen}
 *   error={fenError}
 * />
 * ```
 */
export function Input({
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  ...props
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <YStack gap="$2" width="100%">
      {label && (
        <Label
          htmlFor={props.id}
          color="$gray12"
          fontSize="$4"
          fontWeight="500"
        >
          {label}
          {required && <Text color="$red10"> *</Text>}
        </Label>
      )}

      <TamaguiInput
        borderWidth={1}
        borderColor={hasError ? '$red8' : '$gray7'}
        backgroundColor="$gray1"
        color="$gray12"
        placeholderTextColor="$gray9"
        paddingHorizontal="$3"
        paddingVertical="$2.5"
        fontSize="$4"
        borderRadius="$3"
        disabled={disabled}
        opacity={disabled ? 0.5 : 1}
        focusStyle={{
          borderColor: hasError ? '$red10' : '$blue10',
          backgroundColor: '$gray2',
        }}
        hoverStyle={{
          borderColor: hasError ? '$red9' : '$gray8',
        }}
        {...props}
      />

      {(error || helperText) && (
        <Text
          color={error ? '$red10' : '$gray10'}
          fontSize="$3"
          paddingLeft="$2"
        >
          {error || helperText}
        </Text>
      )}
    </YStack>
  );
}
