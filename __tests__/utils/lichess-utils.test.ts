import { LichessUtils } from '@/utils/lichess-utils';
import * as WebBrowser from 'expo-web-browser';

jest.mock('expo-web-browser');

describe('LichessUtils', () => {
  describe('generateEditorUrl()', () => {
    test('generates correct Lichess URL for simple FEN', () => {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      const url = LichessUtils.generateEditorUrl(fen);
      expect(url).toContain('https://lichess.org/editor/');
      expect(url).toContain(encodeURIComponent(fen));
    });

    test('encodes FEN with special characters correctly', () => {
      const fenWithSpecialChars = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq e6 0 3';
      const url = LichessUtils.generateEditorUrl(fenWithSpecialChars);
      expect(url).toContain(encodeURIComponent(fenWithSpecialChars));
      // Verify spaces are encoded
      expect(url).not.toContain(' ');
    });

    test('handles FEN with slashes correctly', () => {
      const fen = '8/8/8/8/4P3/8/8/8 w KQkq - 0 1';
      const url = LichessUtils.generateEditorUrl(fen);
      // Slashes should be encoded in URL
      expect(url).toContain(encodeURIComponent(fen));
    });

    test('returns valid URL format', () => {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      const url = LichessUtils.generateEditorUrl(fen);
      expect(url).toMatch(/^https:\/\/lichess\.org\/editor\/.+$/);
    });
  });

  describe('isValidFenStructure()', () => {
    test('returns true for valid FEN structure', () => {
      const validFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(LichessUtils.isValidFenStructure(validFen)).toBe(true);
    });

    test('returns false for empty FEN', () => {
      expect(LichessUtils.isValidFenStructure('')).toBe(false);
    });

    test('returns false for FEN with missing ranks', () => {
      const invalidFen = 'rnbqkbnr/pppppppp w KQkq - 0 1'; // Only 2 ranks instead of 8
      expect(LichessUtils.isValidFenStructure(invalidFen)).toBe(false);
    });
  });

  describe('openLichessEditor()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('opens Lichess editor with correct URL', async () => {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      await LichessUtils.openLichessEditor(fen);

      expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(
        expect.stringContaining('https://lichess.org/editor/')
      );
    });

    test('handles invalid FEN gracefully', async () => {
      const invalidFen = '';
      await expect(LichessUtils.openLichessEditor(invalidFen)).rejects.toThrow();
    });

    test('handles WebBrowser errors gracefully', async () => {
      (WebBrowser.openBrowserAsync as jest.Mock).mockRejectedValue(new Error('Browser error'));
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

      await expect(LichessUtils.openLichessEditor(fen)).rejects.toThrow();
    });
  });
});
