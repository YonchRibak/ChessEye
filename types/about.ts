/**
 * Type definitions for About Project screens
 * Defines interfaces for content cards, sections, and navigation
 */

/**
 * Represents a navigable card with content and optional link/route
 */
export interface AboutCardData {
  /** Card title/header */
  title: string;
  /** Description or summary text */
  summary: string;
  /** Optional external URL (GitHub, Kaggle, etc.) */
  externalLink?: string;
  /** Optional internal navigation route name */
  route?: AboutRouteNames;
  /** Optional link text for external links */
  linkText?: string;
}

/**
 * Content structure for a complete About section/screen
 */
export interface AboutSectionContent {
  /** Section header/title */
  header: string;
  /** Optional task description or subtitle */
  taskDescription?: string;
  /** Optional summary paragraph */
  summary?: string;
  /** Optional list of key features or methodologies */
  features?: string[];
  /** Navigation cards for sub-sections */
  cards?: AboutCardData[];
  /** Optional external link for the entire section */
  externalLink?: string;
  /** Optional link text */
  linkText?: string;
}

/**
 * Valid route names for About section navigation
 */
export type AboutRouteNames =
  | 'AboutProject'
  | 'AboutML'
  | 'AboutEndToEnd'
  | 'AboutPipeline'
  | 'AboutFrontend'
  | 'AboutBoardEditor'
  | 'AboutBackend';

/**
 * Props for About screen components
 */
export interface AboutScreenProps {
  /** Optional navigation prop (provided by React Navigation) */
  navigation?: any;
}
