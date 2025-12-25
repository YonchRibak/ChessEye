/**
 * Constants for About Project screens
 * Centralizes all content, text, and navigation data for the About section
 */

import { AboutSectionContent } from '../types/about';

/**
 * Main About Project landing screen content
 */
export const ABOUT_PROJECT_CONTENT: AboutSectionContent = {
  header: 'ChessEye Project',
  summary:
    'ChessEye combines computer vision and machine learning to extract digital chess positions (FEN notation) from physical board images. The project explores multiple ML approaches and delivers a cross-platform mobile application.',
  cards: [
    {
      title: 'Machine Learning Approaches',
      summary:
        'Evaluates End-to-End and Pipeline methodologies for extracting FEN from chessboard images.',
      route: 'AboutML',
    },
    {
      title: 'Frontend Architecture',
      summary:
        'Cross-platform React Native application with high-performance UI and efficient camera/API integration.',
      route: 'AboutFrontend',
    },
    {
      title: 'Backend Architecture',
      summary:
        'FastAPI backend service handling ML model serving, image processing, and data persistence.',
      route: 'AboutBackend',
    },
  ],
};

/**
 * Machine Learning Approaches screen content
 */
export const ABOUT_ML_CONTENT: AboutSectionContent = {
  header: 'Machine Learning Approaches',
  taskDescription:
    'The goal is to extract a digital chess configuration (FEN) from a physical chessboard image.',
  summary:
    'The project evaluates an integrated End-to-End model against a modular Pipeline of preprocessing tools.',
  cards: [
    {
      title: 'End-to-End CNN',
      summary:
        'Single ResNeXt-101 architecture trained on ChessReD dataset, treating recognition as dense classification.',
      route: 'AboutEndToEnd',
    },
    {
      title: 'Preprocessing Pipeline',
      summary:
        'Modular sequence using YOLO detection, Canny edge detection, and perspective correction.',
      route: 'AboutPipeline',
    },
  ],
};

/**
 * End-to-End CNN approach screen content
 */
export const ABOUT_END_TO_END_CONTENT: AboutSectionContent = {
  header: 'End-to-End CNN',
  summary:
    'This approach uses a single ResNeXt-101 architecture trained on the ChessReD dataset (10,800 images).',
  features: [
    'Treats recognition as a dense classification problem',
    'Predicts all 64 squares simultaneously',
    'Leverages global image context to identify piece types and positions',
    'Collects user corrections to continuously improve model performance - retraining occurs every 1,000 corrections',
  ],
  externalLink: 'https://www.kaggle.com/code/jonathanribak/chess-board-recognition-end-2-end-chessred-dataset',
  linkText: 'View Kaggle Notebook',
};

/**
 * Pipeline approach screen content
 */
export const ABOUT_PIPELINE_CONTENT: AboutSectionContent = {
  header: 'Preprocessing Pipeline',
  summary: 'This approach uses a modular sequence of preprocessing steps:',
  features: [
    'Detection: YOLO model locates the board',
    'Warping: Canny edge detection and Hough transforms identify grid lines',
    'Perspective Correction: Image warping tools apply a homography matrix to create a top-down view for tile-by-tile classification',
  ],
  externalLink: 'https://www.kaggle.com/code/jonathanribak/chess-board-recognition-pipeline-chessred-dataset',
  linkText: 'View Kaggle Notebook',
};

/**
 * Frontend Architecture screen content
 */
export const ABOUT_FRONTEND_CONTENT: AboutSectionContent = {
  header: 'Frontend Architecture',
  summary:
    'A cross-platform React Native application designed for high-performance UI and efficient camera/API integration.',
  externalLink: 'https://github.com/YonchRibak/ChessEye',
  linkText: 'View GitHub Repository',
  techStack: [
    {
      category: 'Framework',
      technologies: ['React Native', 'Expo SDK 54'],
    },
    {
      category: 'Language',
      technologies: ['TypeScript'],
    },
    {
      category: 'Navigation',
      technologies: ['React Navigation'],
    },
    {
      category: 'State Management',
      technologies: ['TanStack Query (React Query)'],
    },
    {
      category: 'UI & Styling',
      technologies: ['Tamagui', 'NativeWind'],
    },
    {
      category: 'Chess Library',
      technologies: ['react-native-chess-board-editor', 'chess.js'],
    },
    {
      category: 'HTTP Client',
      technologies: ['Axios'],
    },
  ],
  cards: [
    {
      title: 'Board Editor Package',
      summary:
        'Custom-built library for handling high-performance chess interactions in React Native.',
      route: 'AboutBoardEditor',
    },
  ],
};

/**
 * Board Editor Package screen content
 */
export const ABOUT_BOARD_EDITOR_CONTENT: AboutSectionContent = {
  header: 'Board Editor Package',
  summary:
    'A custom-built library, react-native-chess-board-editor, developed to handle high-performance chess interactions in React Native.',
  features: [
    'Responsive gesture handling for piece movement',
    'Synchronization with FEN state',
    'Optimized rendering for mobile devices',
    'No rule enforcement - allows editing any position (critical for ML predictions)',
  ],
  externalLink: 'https://github.com/YonchRibak/react-native-chess-board-editor',
  linkText: 'View GitHub Repository',
};

/**
 * Backend/API screen content
 */
export const ABOUT_BACKEND_CONTENT: AboutSectionContent = {
  header: 'Backend Architecture',
  summary: 'FastAPI backend service handling image processing and chess position prediction.',
  externalLink: 'https://github.com/YonchRibak/board2fen/tree/main/api',
  linkText: 'View GitHub Repository',
  techStack: [
    {
      category: 'Framework',
      technologies: ['FastAPI', 'Uvicorn'],
    },
    {
      category: 'Language',
      technologies: ['Python 3.11+'],
    },
    {
      category: 'Machine Learning',
      technologies: ['PyTorch', 'torchvision', 'Ultralytics YOLO'],
    },
    {
      category: 'Image Processing',
      technologies: ['OpenCV', 'Pillow', 'NumPy'],
    },
    {
      category: 'Database',
      technologies: ['SQLAlchemy', 'SQLite/PostgreSQL'],
    },
    {
      category: 'API',
      technologies: ['RESTful API', 'Pydantic', 'CORS'],
    },
  ],
  features: [
    'RESTful API for prediction and correction endpoints',
    'Model serving for ResNeXt-101 and YOLO models',
    'Database integration for predictions and corrections',
    'Health monitoring and statistics tracking',
  ],
};

/**
 * UI text constants
 */
export const ABOUT_UI_TEXT = {
  NAVIGATION: {
    BACK_BUTTON: 'Back',
  },
  BUTTONS: {
    VIEW_REPOSITORY: 'View Repository',
    VIEW_NOTEBOOK: 'View Notebook',
    LEARN_MORE: 'Learn More',
  },
  SECTIONS: {
    NAVIGATION_TITLE: 'Navigation',
    KEY_FEATURES_TITLE: 'Key Features',
    METHODOLOGIES_TITLE: 'Methodologies',
  },
} as const;

/**
 * About Author screen content
 */
export const ABOUT_AUTHOR_CONTENT = {
  name: 'Jonathan (Yonch) Ribak',
  description:
    'I am a full-stack developer and data scientist with expertise in both frontend and backend technologies, specializing in React, Angular, Django, and Node.js, alongside advanced skills in Python, machine learning, and data analysis.',
  imageSource: require('../assets/author_pic.jpg'),
  links: {
    github: {
      url: 'https://github.com/YonchRibak',
      label: 'GitHub',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/jonathan-ribak-546686110',
      label: 'LinkedIn',
    },
    email: {
      address: 'yonch.baalil@gmail.com',
      label: 'Email',
    },
  },
} as const;
