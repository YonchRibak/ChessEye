# ChessEye

> Computer Vision-Powered Chess Position Recognition

ChessEye is a cross-platform mobile application that uses computer vision and machine learning to extract digital chess positions (FEN notation) from physical board images. Simply snap a photo of any chess position, and the app instantly converts it into a digital format you can edit, analyze, and share.

![ChessEye Logo](assets/images/logo.png)

## Overview

ChessEye combines computer vision and machine learning to bridge the gap between physical chess boards and digital analysis tools. The project explores multiple ML approaches and delivers a production-ready React Native application with seamless camera integration and real-time position editing.

**Key Features:**
- 📸 Capture chess positions via camera or photo library
- 🧠 ML-powered position recognition using ResNeXt-101 CNN
- ✏️ Interactive board editor with FEN manipulation
- 🔄 User correction feedback loop to improve model accuracy
- 🌐 Lichess integration for position analysis
- 📱 Cross-platform support (iOS, Android, Web)

## Technology Stack

### Frontend
- **Framework:** React Native with Expo SDK 54
- **Language:** TypeScript
- **Navigation:** React Navigation (Stack Navigator)
- **State Management:** TanStack Query (React Query)
- **UI Components:** Tamagui (token-based design system)
- **Notifications:** react-native-toast-message
- **Chess Library:** [react-native-chess-board-editor](https://github.com/YonchRibak/react-native-chess-board-editor), chess.js
- **HTTP Client:** Axios with custom interceptors
- **Animation:** react-native-reanimated
- **Testing:** Jest, Testing Library, jest-expo (~110 tests, 70-80% coverage)

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.11+
- **ML Stack:** PyTorch, torchvision, Ultralytics YOLO
- **Image Processing:** OpenCV, Pillow, NumPy
- **Database:** SQLAlchemy with SQLite/PostgreSQL
- **API:** RESTful with Pydantic validation

*Note: The backend is a separate service. See [backend repository](https://github.com/YonchRibak/board2fen/tree/main/api) for setup instructions.*

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator
- Backend API running (see [backend setup](https://github.com/YonchRibak/board2fen/tree/main/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YonchRibak/ChessEye.git
   cd ChessEye
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your API URL:
   ```env
   # For iOS Simulator / Web
   API_BASE_URL=http://localhost:8081

   # For Android Emulator (special IP for host machine)
   API_BASE_URL=http://10.0.2.2:8081

   # For Physical Device (use your computer's local IP)
   API_BASE_URL=http://192.168.1.100:8081
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your platform**
   - iOS: Press `i` or run `npm run ios`
   - Android: Press `a` or run `npm run android`
   - Web: Press `w` or run `npm run web`

## Development Commands

```bash
npm start              # Start Expo development server
npm run android        # Start on Android emulator/device
npm run ios            # Start on iOS simulator/device
npm run web            # Start web version
npm run lint           # Run ESLint
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
npm run reset-project  # Reset project to blank slate
```

## Testing

ChessEye uses a **pragmatic testing strategy** focused on business logic over presentation:

- **~110 tests** achieving **70-80% overall coverage**
- **Framework:** Jest with Testing Library and jest-expo preset
- **Coverage Targets:**
  - Utils: 80-90% (chess validation, FEN parsing, Lichess integration)
  - Services: 80-90% (API layer, Axios interceptors, error handling)
  - Hooks: 70-80% (React Query hooks, useImageUpload, useSubmissionFlow)
  - Components: 30-50% (logic only, not presentation)

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode (during development)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run specific test file
npm test -- chess-utils.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="validateFen"
```

### Test Organization

```
__tests__/
├── utils/
│   ├── chess-utils.test.ts           # 26 tests - FEN validation, position checking
│   ├── prediction-utils.test.ts      # 7 tests - Position validation aggregation
│   ├── lichess-utils.test.ts         # 10 tests - URL generation, FEN encoding
│   └── error-handler.test.ts         # 7 tests - Global error handling
├── services/
│   └── api.test.ts                   # 20+ tests - Axios interceptor, error transformation
├── hooks/
│   ├── api.test.ts                   # 15+ tests - React Query hooks
│   ├── useImageUpload.test.ts        # 6 tests - Image upload flow
│   ├── useSubmissionFlow.test.ts     # 8 tests - State machine testing
│   └── useApiConnectionTest.test.ts  # 4 tests - Health check on mount
└── components/
    └── ServiceToggler.test.tsx       # 8 tests - Component logic
```

## Project Structure

```
ChessEye/
├── screens/           # Main application screens
│   ├── UploadScreen.tsx
│   ├── PredictionScreen.tsx
│   ├── AboutProjectScreen.tsx
│   ├── AboutAuthorScreen.tsx
│   └── ...
├── components/        # Reusable UI components
│   ├── prediction/    # Prediction-specific components
│   ├── navigation/    # Navigation components
│   ├── about/         # About section components
│   └── ui/            # Reusable UI primitives
├── hooks/             # Custom React hooks
│   ├── api.ts         # React Query hooks
│   ├── useImageUpload.ts
│   ├── useSubmissionFlow.ts
│   └── ...
├── services/          # API and external services
│   └── api.ts         # Axios instance and API functions
├── utils/             # Utility functions
│   ├── toast-utils.ts
│   ├── image-utils.ts
│   ├── lichess-utils.ts
│   └── ...
├── types/             # TypeScript type definitions
│   ├── api.ts
│   ├── toast.ts
│   └── ...
├── constants/         # App constants
│   ├── toast.ts
│   ├── aboutContent.ts
│   └── ...
├── navigation/        # Navigation configuration
│   └── AppNavigator.tsx
├── config/            # App configuration
│   └── queryClient.ts
├── __tests__/         # Test files (~110 tests)
│   ├── utils/         # Utility function tests
│   ├── services/      # API service tests
│   ├── hooks/         # Custom hook tests
│   └── components/    # Component logic tests
├── knowledge/         # Documentation
│   └── tests/         # Comprehensive testing guides
└── assets/            # Static assets (images, fonts)
```

## Architecture

### Application Flow

1. **Entry Point** (`App.tsx`)
   - Providers: `SafeAreaProvider` → `QueryClientProvider` → `NavigationContainer`
   - Toast component with custom configuration
   - Global error handler initialization

2. **Navigation** (Stack-based)
   - 10 screens with type-safe routing
   - Main flow: Upload → Prediction
   - About screens form a learning content hub

3. **API Layer** (3-tier)
   - Service Layer: Raw Axios API calls
   - Hook Layer: React Query hooks with caching
   - Component Layer: Screens consume hooks

### Key Features

#### Image Upload & Prediction
- Uses `expo-image-picker` for camera/gallery access
- Permission handling via `ImageUtils`
- FormData upload with multipart/form-data
- Automatic navigation to Prediction screen on success

#### Position Editing
- Custom `react-native-chess-board-editor` component
- **No rule enforcement** - allows editing illegal positions (critical for ML predictions)
- Real-time FEN synchronization
- Editable turn, castling rights, and en passant metadata

#### Correction Feedback Loop
- Users can correct ML predictions
- Corrections include full FEN, turn, castling, and en passant
- Data flows back to API to improve model (retrains every 1,000 corrections)
- Toast notifications for success/error states

#### Lichess Integration
- Opens corrected positions in Lichess board editor
- In-app browser on native platforms (expo-web-browser)
- New tab on web platform
- Animated button appearance with spring physics

### Error Handling

Three-tier error handling system:
1. **Axios Interceptor** - Transforms API errors into structured Error objects
2. **Global Mutation Handler** - Catches all mutation errors for logging
3. **GlobalErrorHandler** - Catches chess.js errors from illegal positions (prevents crashes)

### State Management

- **Server State:** TanStack Query with 5-minute stale time, 15-minute cache
- **Local State:** Component-level useState/useReducer
- **Navigation State:** React Navigation route params

## Machine Learning Approaches

ChessEye evaluates two ML methodologies:

### End-to-End CNN (Current Implementation)
- Single ResNeXt-101 architecture trained on ChessReD dataset (10,800 images)
- Treats recognition as dense classification (64 squares simultaneously)
- Leverages global image context
- [View Kaggle Notebook](https://www.kaggle.com/code/jonathanribak/chess-board-recognition-end-2-end-chessred-dataset)

### Preprocessing Pipeline
- Modular sequence: YOLO detection → Canny edge detection → perspective correction
- Tile-by-tile classification after image warping
- [View Kaggle Notebook](https://www.kaggle.com/code/jonathanribak/chess-board-recognition-pipeline-chessred-dataset)

## Configuration

### Environment Variables
- `API_BASE_URL` - Backend API URL (required)

Configuration flow:
1. `.env` file (gitignored, local settings)
2. `app.config.js` (reads .env, exposes via expo-constants)
3. `services/api.ts` (uses Constants.expoConfig.extra.apiBaseUrl)

### TypeScript
- Strict mode enabled
- Path alias `@/*` maps to root directory
- Extends Expo's base tsconfig

### Expo Configuration
- App scheme: `chesseye://`
- React Compiler experimental feature enabled
- Typed routes enabled
- New Architecture enabled
- Edge-to-edge display on Android



## Related Projects

- **Backend API:** [board2fen](https://github.com/YonchRibak/board2fen/tree/main/api)
- **Chess Board Editor:** [react-native-chess-board-editor](https://github.com/YonchRibak/react-native-chess-board-editor)
- **End-to-End Model:** [Kaggle Notebook](https://www.kaggle.com/code/jonathanribak/chess-board-recognition-end-2-end-chessred-dataset)
- **Pipeline Model:** [Kaggle Notebook](https://www.kaggle.com/code/jonathanribak/chess-board-recognition-pipeline-chessred-dataset)

## Author

**Jonathan (Yonch) Ribak**

Full-stack developer and data scientist specializing in React, Angular, Django, Node.js, Python, machine learning, and data analysis.

- GitHub: [@YonchRibak](https://github.com/YonchRibak)
- LinkedIn: [Jonathan Ribak](https://www.linkedin.com/in/jonathan-ribak-546686110)
- Email: yonch.baalil@gmail.com

## License

This project is private and proprietary.

---

Built with ❤️ using React Native, Expo, and PyTorch
