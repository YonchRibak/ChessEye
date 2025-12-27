import { COLORS } from '@/constants/theme';

export class UiUtils {
    public static getButtonVariantStyles = (variant: string) => {
        switch (variant) {
        case 'primary':
            return {
            backgroundColor: COLORS.BUTTON_PRIMARY_BG,
            borderColor: COLORS.BUTTON_PRIMARY_BG,
            hoverStyle: { backgroundColor: COLORS.BUTTON_PRIMARY_HOVER },
            pressStyle: { backgroundColor: COLORS.BUTTON_PRIMARY_PRESS },
            };
        case 'secondary':
            return {
            backgroundColor: COLORS.BUTTON_SECONDARY_BG,
            borderColor: COLORS.BUTTON_SECONDARY_BG,
            hoverStyle: { backgroundColor: COLORS.HOVER_STATE },
            pressStyle: { backgroundColor: COLORS.PRESS_STATE },
            };
        case 'outline':
            return {
            backgroundColor: COLORS.BUTTON_OUTLINE_BG,
            borderWidth: 1,
            borderColor: COLORS.BUTTON_OUTLINE_BORDER,
            hoverStyle: { backgroundColor: COLORS.BUTTON_OUTLINE_HOVER_BG },
            pressStyle: { backgroundColor: COLORS.HOVER_STATE },
            };
        case 'ghost':
            return {
            backgroundColor: COLORS.BUTTON_GHOST_BG,
            borderColor: COLORS.TRANSPARENT,
            hoverStyle: { backgroundColor: '$gray3' },
            pressStyle: { backgroundColor: '$gray4' },
            };
        case 'danger':
            return {
            backgroundColor: COLORS.BUTTON_DANGER_BG,
            borderColor: COLORS.BUTTON_DANGER_BG,
            hoverStyle: { backgroundColor: '$red11' },
            pressStyle: { backgroundColor: '$red9' },
            };
        default:
            return {};
        }
    };

    public static getCardVariantStyles = (variant: string) => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: '$background',
          borderRadius: '$4',
          padding: '$4',
          shadowColor: '$shadowColor',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2,
        };
      case 'outlined':
        return {
          backgroundColor: '$background',
          borderRadius: '$4',
          padding: '$4',
          borderWidth: 1,
          borderColor: '$gray6',
        };
      case 'filled':
        return {
          backgroundColor: '$gray2',
          borderRadius: '$4',
          padding: '$4',
        };
      default:
        return {};
    }
  };
}