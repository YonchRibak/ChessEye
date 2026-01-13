require('dotenv').config();

module.exports = {
  expo: {
    owner: "yonchribak",
    name: 'ChessEye',
    slug: 'chesseye',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/chesseye-logo.png',
    scheme: 'chessEye',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.yonchribak.chesseye', // Replace with your desired bundle identifier
    },
    android: {

        package: "com.yonchribak.chesseye", // Replace with your desired package name
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      'expo-web-browser',
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://board2fen-api-2-3w4qy.sevalla.app',
      "eas": {
        "projectId": "34786e9c-b3cc-4214-b030-458e7c9740a8"
      }
    },
  },
};
