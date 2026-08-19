export {};

declare global {
  interface WindowEventMap {
    'ga-consent-change': CustomEvent<{ status: 'accepted' | 'rejected' | null }>;
  }
}
