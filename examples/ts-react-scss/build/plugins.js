const config = require('./config'),
  checkFilesChange = require('./scripts'),
  duboConfig = require('../dubo.Config.js'),
  {resolve} = require('./utils');

const
  fs = require('fs'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  {CheckerPlugin} = require('awesome-typescript-loader'),
  ImageminPlugin = require('imagemin-webpack-plugin').default,
  HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  // UpyunUploadPlugin = require('./upyun-upload-webpack-plugin'),
  {UpyunUploadPlugin} = require('upyun-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),
  FontminPlugin = require('./fontmin-webpack-plugin'),
  FontminText = fs.readFileSync(resolve('build/fontmin.txt')).toString('utf-8'),
  {InjectManifest} = require('workbox-webpack-plugin');

const s = JSON.stringify;
const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: s(config.env),
      assetsPath: s(config.assetsPath),
      designWidth: 750,
      publicPath: s(config.distPublicPath),
    },
  }),
  new ProgressBarPlugin(),
  new CheckerPlugin(),
]

const devPlugins = [
  new FriendlyErrorsPlugin(),
  new HtmlWebpackPlugin({
    title: 'dubo',
    template: resolve('build/index.html'),
    filename: resolve('index.html'),
    inject: true,
    alwaysWriteToDisk: true,
    isProd: config.isProd,
    pwa: duboConfig.pwa,
    project: duboConfig.project,
  }),
  new HtmlWebpackHarddiskPlugin({
    outputPath: resolve('index.html')
  }),
]

const prodPlugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: config.project,
    template: resolve('build/index.html'),
    filename: resolve('index.html'),
    isProd: config.isProd,
    inject: true,
    pwa: duboConfig.pwa,
    project: duboConfig.project,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
  }),
  new HtmlWebpackHarddiskPlugin({
    outputPath: resolve('.')
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:5].css',
    chunkFilename: '[name].[chunkhash:5].css'
  }),
  new CopyPlugin([
    {
      from: resolve('src/assets/img'),
      to: resolve('dist/assets/img'),
      cache: true,
    },
    {
      from: resolve('src/assets/font/dist'),
      to: resolve('dist/assets/font'),
      cache: true,
    },
    {
      from: resolve('src/service-register.js'),
      to: resolve('service-register.js'),
      transform: content => {
        content = content.toString('utf8')
          .replace(/\[serverPath\]/g, config.isProd ? `/activity/${duboConfig.project}` : '');
        return content;
      },
      cache: true,
    },
  ]),
  // new ImageminPlugin({
  //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
  //   pngquant: {
  //     quality: '95-100'
  //   }
  // }),
  new InjectManifest({
    swSrc: resolve('src/sw.js'),
    swDest: resolve('sw.js'),
    globDirectory: '.'
  })
]

if (config.isProd && checkFilesChange(resolve('build/fontmin.txt'), resolve('build/scripts/fontmin-hash.txt'))) {
  console.log('fonts changed...');

  prodPlugins.push(new FontminPlugin({
      src: resolve('src/assets/font/src/**'),
      dist: resolve('src/assets/font/dist'),
      text: FontminText,
  }))
}

if (config.isProd && checkFilesChange(resolve('src/assets/'), resolve('build/scripts/assets-hash.txt'))) {
  console.log('assets changed...');
  prodPlugins.push(
    new UpyunUploadPlugin({
      serviceName: duboConfig.cdn.service,
      operatorName: duboConfig.cdn.operator,
      operatorPassword: duboConfig.cdn.passwd,
      remotePath: duboConfig.cdn.remoteFilePath,
      localPath: duboConfig.cdn.filePath,
  }),
  )
}

if (config.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  prodPlugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8889,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
      }))
}

module.exports = basePlugins.concat(
  config.isProd ? prodPlugins : devPlugins
)