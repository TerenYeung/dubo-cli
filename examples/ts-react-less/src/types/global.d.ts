declare var process: {
  env: {
    NODE_ENV: string;
  }
}

declare interface PlainObject {
  [propName: string]: any
}

declare module '*.png';

declare module "*.json" {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.mp3';

declare var __webpack_hash__: string;



