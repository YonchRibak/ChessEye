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
    (global as any).ErrorUtils = originalErrorUtils;
    GlobalErrorHandler.uninstall();
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
    test('catches chess.js errors with "Cannot read property type"', () => {
      GlobalErrorHandler.install();
      const errorHandler = mockSetGlobalHandler.mock.calls[0][0];

      const chessError = new Error("Cannot read property 'type' of null");
      expect(() => errorHandler(chessError, false)).not.toThrow();
    });

    test('catches errors with chess.js in stack trace', () => {
      GlobalErrorHandler.install();
      const errorHandler = mockSetGlobalHandler.mock.calls[0][0];

      const error = new Error('Some error');
      error.stack = 'at Chess.validateFen (chess.js:123)';

      expect(() => errorHandler(error, false)).not.toThrow();
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
