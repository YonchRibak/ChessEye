export class UiUtils {
    public static getButtonVariantStyles = (variant: string) => {
        switch (variant) {
        case 'primary':
            return {
            backgroundColor: '$blue10',
            color: 'white',
            borderColor: '$blue10',
            hoverStyle: { backgroundColor: '$blue11' },
            pressStyle: { backgroundColor: '$blue9' },
            };
        case 'secondary':
            return {
            backgroundColor: '$gray10',
            color: 'white',
            borderColor: '$gray10',
            hoverStyle: { backgroundColor: '$gray11' },
            pressStyle: { backgroundColor: '$gray9' },
            };
        case 'outline':
            return {
            backgroundColor: 'transparent',
            color: '$blue10',
            borderWidth: 1,
            borderColor: '$blue10',
            hoverStyle: { backgroundColor: '$blue2' },
            pressStyle: { backgroundColor: '$blue3' },
            };
        case 'ghost':
            return {
            backgroundColor: 'transparent',
            color: '$gray12',
            borderColor: 'transparent',
            hoverStyle: { backgroundColor: '$gray3' },
            pressStyle: { backgroundColor: '$gray4' },
            };
        case 'danger':
            return {
            backgroundColor: '$red10',
            color: 'white',
            borderColor: '$red10',
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