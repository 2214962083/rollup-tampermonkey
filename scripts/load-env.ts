import * as dotenv from 'dotenv'
import path from 'path'
import dotenvExpand from 'dotenv-expand'

/**
 * 加载环境变量 dotenv 文件
 * @param projectRootPath 项目根目录
 */
export function loadEnvFiles(projectRootPath: string): void {
  /**
   * 加载 dotenv 文件
   *  .env                # 在所有的环境中被载入
   *  .env.local          # 在所有的环境中被载入，但会被 git 忽略
   *  .env.[mode]         # 只在指定的模式中被载入
   *  .env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
   *  @param mode 环境
   */
  const loadEnv = (mode?: string): void => {
    const basePath = path.resolve(projectRootPath, `.env${mode ? `.${mode}` : ``}`)
    const localPath = `${basePath}.local`

    const load = (envPath: string) => {
      try {
        const env = dotenv.config({path: envPath})
        dotenvExpand(env)
      } catch (err) {
        console.error('dotenv load error', err)
      }
    }
    load(localPath)
    load(basePath)
  }

  const mode = process.env.NODE_ENV

  // 这里的环境变量不会被下面覆盖，所以优先级最高
  // .env.production、.env.production.local、.env.development、.env.development.local
  if (mode) {
    loadEnv(mode)
  }

  //.env、.env.local
  loadEnv()
}
