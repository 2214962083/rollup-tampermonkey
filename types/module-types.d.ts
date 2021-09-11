/* eslint-disable import/no-duplicates */

declare module '*.vue' {
  import {defineComponent} from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module 'rollup-plugin-dotenv' {
  import {Plugin} from 'rollup'

  export default function (options?: {cwd?: string; envKey?: string}): Plugin
}

declare module 'rollup-plugin-serve' {
  import {Plugin} from 'rollup'

  interface ServeOptions {
    // Launch in browser (default: false)
    open?: boolean // true

    // Page to navigate to when opening the browser.
    // Will not do anything if open=false.
    // Remember to start with a slash.
    openPage?: string

    // Show server address in console (default: true)
    verbose?: boolean // false

    // Folder to serve files from
    contentBase: string | string[] // ''

    // Set to true to return index.html (200) instead of error page (404)
    historyApiFallback?: boolean | string // false

    // Options used in setting up server
    host?: string // 'localhost',
    port?: number // 10001,

    // By default server will be served over HTTP (https: false). It can optionally be served over HTTPS
    https?: {
      key: string // fs.readFileSync('/path/to/server.key'),
      cert: string // fs.readFileSync('/path/to/server.crt'),
      ca: string // fs.readFileSync('/path/to/ca.pem')
    }

    //set headers
    headers?: {[k: string]: string} // 'Access-Control-Allow-Origin': '*'

    onListening?: (server: {getAddress(): any}) => void
  }

  // noinspection JSDuplicatedDeclaration,JSUnusedGlobalSymbols
  export default function serve(options?: ServeOptions): Plugin
}

declare module 'cssnano'

declare module '*.png' {
  const png: string
  export default png
}

declare module '*.jpg' {
  const jpg: string
  export default jpg
}

declare module '*.jpeg' {
  const jpeg: string
  export default jpeg
}

declare module '*.svg' {
  const svg: string
  export default svg
}

declare module '*.gif' {
  const gif: string
  export default gif
}

declare module '*.webp' {
  const webp: string
  export default webp
}

declare module '*.less'
declare module '*.css'
