const
  fs = require('fs'),
  env = process.env.NODE_ENV,
  isProd = process.env.NODE_ENV === 'production';

const STATIC_URL = '';

/**
 * @warning baseConfig cannot be delete, use for dubo-cli to create new page or component
 */
const baseConfig = {
  lang: 'ts',
  ui: 'vue',
  preprocessor: 'scss'
}

const devConfig = {
  ...baseConfig,
  pwa: false,
  project: 'ts-vue-scss' || 'dubo',
  env,
  assetsPath: '/src/assets/',
  distPublicPath: '/dist/',
  sourceMap: true,
  openssl: false,
  /*
    webpack-dev-server 是否开启 https，具体本机生成证书方法和配置方法详见：
    https://juejin.im/post/5a6db896518825732d7fd8e0
    https://webpack.docschina.org/configuration/dev-server/
  */
  https: {
    key: '',    // 本机 https 根证书
    cert: '',   // 本机 https 域秘钥
    ca: '',     // 本机 https 根证书
  }
}

const prodConfig = {
  ...baseConfig,
  ...devConfig,
  pwa: true,              // 是否开启 service-worker
  env,
  staticUrl: STATIC_URL,                               // CDN 路径
  assetsPath: STATIC_URL,                              // 打包构建后，静态资源指向的文件夹路径
  distPublicPath: `/activity/${'ts-vue-scss' || 'dubo'}/dist/`,        // webpack 构建后，web 服务器指向的静态资源的引入根路径
  sourceMap: false,                                     // webpack 构建工具是否开启 sourceMap
  bundleAnalyzerReport: false,                          // 是否生成 webpack 构建包分析报告
  cdn: {                                                // 又拍云 FTP 账户信息
    service: process.env.UPYUN_SERVICE || '',
    operator: process.env.UPYUN_OPERATOR || '',
    passwd: process.env.UPYUN_PASSWD || '',
    remoteFilePath: '',                                 // 又拍云远程资源地址
    filePath: ''                   // 又拍云本地资源地址
  },
}

module.exports = isProd ? prodConfig : devConfig