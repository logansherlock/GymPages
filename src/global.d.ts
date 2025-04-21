// global.d.ts
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'gmpx-api-loader': any;  // Declaring the <gmpx-api-loader> element
        'gmpx-place-picker': any;  // Declaring the <gmpx-place-picker> element
      }
    }
  }