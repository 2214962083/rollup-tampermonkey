/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as CSS from 'csstype'

declare global {
  interface Window {}
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'production' | 'development'
    }
  }

  type CSSProperties = CSS.Properties<string | number>
}
