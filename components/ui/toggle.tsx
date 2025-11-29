import React from 'react';
import { Label, Switch as TamaguiSwitch, type SwitchProps as TamaguiSwitchProps, XStack } from 'tamagui';

export interface ToggleProps extends Omit<TamaguiSwitchProps, 'checked' | 'onCheckedChange'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
}

/**
 * Reusable Toggle/Switch component built with Tamagui
 *
 * @example
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 * <Toggle
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 *   label="Enable Feature"
 * />
 * ```
 */
export function Toggle({
  checked,
  onCheckedChange,
  label,
  labelPosition = 'right',
  disabled = false,
  ...props
}: ToggleProps) {
  const toggleSwitch = (
    <TamaguiSwitch
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      opacity={disabled ? 0.5 : 1}
      backgroundColor={checked ? '$blue10' : '$gray6'}
      {...props}
    >
      <TamaguiSwitch.Thumb
        backgroundColor="white"
        animation="quick"
      />
    </TamaguiSwitch>
  );

  if (!label) {
    return toggleSwitch;
  }

  return (
    <XStack
      alignItems="center"
      gap="$3"
      opacity={disabled ? 0.5 : 1}
    >
      {labelPosition === 'left' && (
        <Label
          htmlFor={props.id}
          color="$gray12"
          fontSize="$4"
          onPress={() => !disabled && onCheckedChange(!checked)}
        >
          {label}
        </Label>
      )}
      {toggleSwitch}
      {labelPosition === 'right' && (
        <Label
          htmlFor={props.id}
          color="$gray12"
          fontSize="$4"
          onPress={() => !disabled && onCheckedChange(!checked)}
        >
          {label}
        </Label>
      )}
    </XStack>
  );
}
