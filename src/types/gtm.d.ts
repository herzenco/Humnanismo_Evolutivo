// Google Tag Manager dataLayer type definitions
interface Window {
  dataLayer: Array<Record<string, any>>;
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

export {};
