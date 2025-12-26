// Define global variables that React Native expects
global.__DEV__ = true;

// Mock React Native bridge for component testing
(global as any).__fbBatchedBridgeConfig = {
  remoteModuleConfig: [],
  localModulesConfig: [],
};

// Mock TurboModuleRegistry
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  get: (name: string) => {
    if (name === 'SourceCode') {
      return {
        getConstants: () => ({
          scriptURL: null,
        }),
      };
    }
    return null;
  },
  getEnforcing: (name: string) => {
    if (name === 'SourceCode') {
      return {
        getConstants: () => ({
          scriptURL: null,
        }),
      };
    }
    return null;
  },
}));

// Mock Expo Constants (REQUIRED - native module)
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      apiBaseUrl: 'http://localhost:8081',
    },
  },
}));

// Mock Expo Image Picker (REQUIRED - native module)
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

// Mock Expo Web Browser (REQUIRED - native module)
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
  WebBrowserPresentationStyle: {
    AUTOMATIC: 0,
    FULL_SCREEN: 1,
    FORM_SHEET: 2,
    CURRENT_CONTEXT: 3,
    OVER_FULL_SCREEN: 4,
    OVER_CURRENT_CONTEXT: 5,
  },
}));

// Mock Expo Haptics (REQUIRED - native module)
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  })),
  useRoute: jest.fn(),
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

process.env.NODE_ENV = 'test';
