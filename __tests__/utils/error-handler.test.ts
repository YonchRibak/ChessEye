import { GlobalErrorHandler } from '@/utils/error-handler';

describe('GlobalErrorHandler', () => {
  let mockSetGlobalHandler: jest.Mock;
  let mockGetGlobalHandler: jest.Mock;
  let originalErrorUtils: any;

  beforeEach(() => {
    // Set up ErrorUtils mock
    mockSetGlobalHandler = jest.fn();
    mockGetGlobalHandler = jest.fn(() => jest.fn());

    originalErrorUtils = (global as any).ErrorUtils;
    (global as any).ErrorUtils = {
      setGlobalHandler: mockSetGlobalHandler,
      getGlobalHandler: mockGetGlobalHandler,
    };
  });

  afterEach(() => {
    // Uninstall BEFORE restoring ErrorUtils so it can properly reset
    GlobalErrorHandler.uninstall();
    (global as any).ErrorUtils = originalErrorUtils;
  });

  describe('install()', () => {
    test('sets global error handler via ErrorUtils', () => {
      GlobalErrorHandler.install();
      expect(mockSetGlobalHandler).toHaveBeenCalledTimes(1);
    });

    test('saves original handler', () => {
      GlobalErrorHandler.install();
      expect(mockGetGlobalHandler).toHaveBeenCalled();
    });

    test('does not install twice', () => {
      GlobalErrorHandler.install();
      GlobalErrorHandler.install();
      expect(mockSetGlobalHandler).toHaveBeenCalledTimes(1);
    });

    test('handles missing ErrorUtils gracefully', () => {
      delete (global as any).ErrorUtils;
      expect(() => GlobalErrorHandler.install()).not.toThrow();
    });
  });

  describe('Error handling', () => {
    test('catches errors with "Cannot read property type" and Chess in stack trace', () => {
      GlobalErrorHandler.install();
      const errorHandler = mockSetGlobalHandler.mock.calls[0][0];

      const chessError = new Error("Cannot read property 'type' of null");
      chessError.stack = 'at Chess.validateFen (chess.js:123)';
      expect(() => errorHandler(chessError, false)).not.toThrow();
    });

    test('catches errors with chess.js in message', () => {
      GlobalErrorHandler.install();
      const errorHandler = mockSetGlobalHandler.mock.calls[0][0];

      const error = new Error('Error in chess.js library');
      expect(() => errorHandler(error, false)).not.toThrow();
    });

    test('catches errors with Chess# in stack trace', () => {
      GlobalErrorHandler.install();
      const errorHandler = mockSetGlobalHandler.mock.calls[0][0];

      const error = new Error('Some error');
      error.stack = 'at Chess#move (node_modules/chess.js/chess.js:456)';

      expect(() => errorHandler(error, false)).not.toThrow();
    });

    test('catches errors with chess-board-editor in stack trace', () => {
      GlobalErrorHandler.install();
      const errorHandler = mockSetGlobalHandler.mock.calls[0][0];

      const error = new Error('Board error');
      error.stack = 'at EditableBoard (react-native-chess-board-editor/index.js:100)';

      expect(() => errorHandler(error, false)).not.toThrow();
    });

    test('does NOT catch generic "Cannot read property type" errors without chess stack', () => {
      const mockOriginalHandler = jest.fn();
      mockGetGlobalHandler.mockReturnValue(mockOriginalHandler);

      GlobalErrorHandler.install();
      const errorHandler = mockSetGlobalHandler.mock.calls[0][0];

      const genericError = new Error("Cannot read property 'type' of null");
      genericError.stack = 'at someOtherFunction (myapp.js:123)';
      errorHandler(genericError, false);

      // Should pass to original handler, not suppress
      expect(mockOriginalHandler).toHaveBeenCalledWith(genericError, false);
    });

    test('passes non-chess errors to original handler', () => {
      const mockOriginalHandler = jest.fn();
      mockGetGlobalHandler.mockReturnValue(mockOriginalHandler);

      GlobalErrorHandler.install();
      const errorHandler = mockSetGlobalHandler.mock.calls[0][0];

      const genericError = new Error('Network error');
      errorHandler(genericError, false);

      expect(mockOriginalHandler).toHaveBeenCalledWith(genericError, false);
    });
  });

  describe('uninstall()', () => {
    test('restores original handler', () => {
      GlobalErrorHandler.install();
      GlobalErrorHandler.uninstall();

      expect(mockSetGlobalHandler).toHaveBeenCalledTimes(2); // install + uninstall
    });

    test('handles multiple uninstalls gracefully', () => {
      GlobalErrorHandler.install();
      GlobalErrorHandler.uninstall();
      expect(() => GlobalErrorHandler.uninstall()).not.toThrow();
    });
  });
});
