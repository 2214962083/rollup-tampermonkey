import path from 'path'
import chalk from 'chalk'
import {defineConfig, ModuleFormat, OutputOptions, Plugin} from 'rollup'
import {loadEnvFiles} from './scripts/load-env'

// rollup 插件
import aliasPlugin from '@rollup/plugin-alias' // 路径别名
import nodeResolvePlugin from '@rollup/plugin-node-resolve' // em...忘记了
import jsonPlugin from '@rollup/plugin-json' // json 转 object
import urlPlugin from '@rollup/plugin-url' // 文件转 url 或 base64
import vuePlugin from 'rollup-plugin-vue' // vue
import esbuildPlugin from 'rollup-plugin-esbuild' // esbuild 打包 ts 更快
import dotenvPlugin from 'rollup-plugin-dotenv' // dotenv
import postcssPlugin from 'rollup-plugin-postcss' // postcss
import commonjsPlugin from '@rollup/plugin-commonjs' // 支持引入 cjs
import babelPlugin from '@rollup/plugin-babel' // babel
import {terser as terserPlugin} from 'rollup-plugin-terser' // 压缩 js 代码
import serverPlugin from 'rollup-plugin-serve' // 开启一个 serve

// postcss 插件
import cssnano from 'cssnano' // 减少无用 css
import autoprefixer from 'autoprefixer' // 补充 css 前缀
import postcssUrl from 'postcss-url' // css 图片打包支持

// 项目根路径
const appPath = __dirname

// 环境
const env = process.env.NODE_ENV
console.log(chalk.green('当前环境: ' + env))

// 加载 dotenv
loadEnvFiles(appPath)

// 从项目根路径计算 path
const _resolve = (filePath: string) => path.resolve(appPath, filePath)

// 把 windows path 转成符合 glob path 规范
const _posixResolve = (filePath: string) => _resolve(filePath).replace(/\\/g, '/')

// UMD 挂载名称，建议大驼峰
const libName = 'TampermonkeyExample'

// 入口文件
const entryFile = _resolve('./src/index.ts')

// 参与编译的文件
const extensions = ['.vue', '.jsx', '.js', '.tsx', '.ts']

// 是否生成 sourcemap
const sourcemap = true

// dotenv 等环境变量替换
const envReplace = Object.fromEntries(
  Object.entries(process.env)
    .filter(([key]) => /^[a-zA-Z\\$_][a-zA-Z\\$_0-9]*$/.test(key))
    .map(([key, value]) => ['process.env.' + key, JSON.stringify(value)])
)

// 补充插件
const plugins: Plugin[] = []
if (env === 'development') {
  // 油猴要打开 高级设置 -> 设置外部更新为始终，当脚本重新编译时，要刷新两次页面，@require 资源才会被更新
  // https://github.com/Tampermonkey/tampermonkey/issues/475#issuecomment-348594785
  plugins.push(
    ...[
      // 油猴
      serverPlugin({
        open: false,
        contentBase: _resolve('./dist'),
        host: 'localhost',
        port: 8090,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        onListening() {
          console.log(chalk.green(`服务器已开启: http://${this.host}:${this.port}/`))
          console.log(chalk.green(`你可以打开文件: http://${this.host}:${this.port}/${libName}.iife.js`))
        }
      })
    ]
  )
}

export default defineConfig({
  input: entryFile,
  output: getOutputConfig(),
  watch: {
    include: _posixResolve('./src/**')
  },
  plugins: [
    // 别名路径
    aliasPlugin({
      entries: [
        {
          find: '@',
          replacement: _resolve('./src')
        }
      ]
    }),
    nodeResolvePlugin({extensions}),

    // json 解析为 object
    jsonPlugin(),

    // 引入其他文件为 base64
    urlPlugin({
      include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp'],
      limit: Infinity
    }),

    // vue sfc 解析
    vuePlugin(),

    // TODO: 这个 rollup 插件不支持设置 esbuild 的 charset，想个办法
    esbuildPlugin({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      sourceMap: sourcemap,
      minify: false,
      define: {
        ...envReplace,
        'process.env.NODE_ENV': JSON.stringify(env)
      },
      tsconfig: _resolve('./tsconfig.json')
    }),

    // 环境变量替换
    dotenvPlugin({cwd: appPath, envKey: env}),

    // postcss 处理
    postcssPlugin({
      plugins: [cssnano, autoprefixer, postcssUrl({url: 'inline'})],
      use: ['less'],
      extensions: ['.css', '.less']
    }),

    // cjs 模块导入支持
    commonjsPlugin(),

    // TODO: babel 开启后，tampermonkey 好像内部出错了，以后再排查
    // 注意，babel 的 polyfill 会让打包变大
    // babelPlugin({
    //   babelHelpers: 'bundled',
    //   extensions,
    //   configFile: _resolve('./babel.config.js'),
    //   exclude: /node_modules/
    //   // exclude: _posixResolve('./node_modules/**')
    // }),

    ...plugins
  ]
})

/**
 * 创建 output 配置
 * @param format 规范类型
 * @param otherOptions output 补充配置
 * @returns OutputOptions[]
 */
function createOutput(format: ModuleFormat, otherOptions: OutputOptions = {}) {
  const {plugins = [], ..._otherOptions} = otherOptions
  const outputs: OutputOptions[] = [
    {
      file: _resolve(`./dist/${libName}.${format}.js`),
      format,
      sourcemap,
      plugins,
      ..._otherOptions
    }
  ]

  if (env === 'production') {
    outputs.push({
      file: _resolve(`./dist/${libName}.${format}.min.js`),
      format,
      sourcemap,
      plugins: [...plugins, terserPlugin()],
      ..._otherOptions
    })
  }
  return outputs
}

// 获取输出配置
function getOutputConfig() {
  // 输出文件
  const output: OutputOptions[] = [...createOutput('iife', {name: libName})]

  if (env === 'production') {
    output.push(...createOutput('umd', {name: libName}))
  }
  return output
}
