const config = require("./config"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  { resolve } = require("./utils");

const setLoaderSourceMap = (loader, options, isProd) => {
  return { loader, options: { ...options, sourceMap: isProd ? false : true } };
};

const s = JSON.stringify;

const getStyleRule = (
  opt = {
    isProd: false,
    preProcessor: "css"
  }
) => {
  const map = {
    css: [
      // 这里匹配 `<style module>`
      {
        resourceQuery: /module/,
        use: [
          setLoaderSourceMap("vue-style-loader", {}, opt.isProd),
          setLoaderSourceMap(
            "css-loader",
            {
              modules: true,
              localIdentName: "[local]_[hash:base64:5]"
            },
            opt.isProd
          ),
          setLoaderSourceMap("postcss-loader", {
            plugins: () => [require('autoprefixer')({
              'overrideBrowserslist': ['> 1%', 'last 5 versions']
            })],
          }, opt.isProd)
        ]
      },
      // 这里匹配普通的 `<style>` 或 `<style scoped>`
      {
        use: [
          setLoaderSourceMap("vue-style-loader", {}, opt.isProd),
          setLoaderSourceMap("css-loader", {}, opt.isProd),
          setLoaderSourceMap("postcss-loader", {
            plugins: () => [require('autoprefixer')({
              'overrideBrowserslist': ['> 1%', 'last 5 versions']
            })],
          }, opt.isProd)
        ]
      }
    ],
    scss: [
      // 这里匹配 `<style module>`
      {
        resourceQuery: /module/,
        use: [
          setLoaderSourceMap("vue-style-loader", {}, opt.isProd),
          setLoaderSourceMap(
            "css-loader",
            {
              modules: true,
              localIdentName: "[local]_[hash:base64:5]"
            },
            opt.isProd
          ),
          setLoaderSourceMap("postcss-loader", {
            plugins: () => [require('autoprefixer')({
              'overrideBrowserslist': ['> 1%', 'last 5 versions']
            })],
          }, opt.isProd),
          setLoaderSourceMap(
            "sass-loader",
            {
              data: `
              $isProd: "${config.isProd}";
              $assetsPath: "${config.assetsPath}";`
            },
            opt.isProd
          ),
          setLoaderSourceMap('sass-resources-loader', {
            resources: [resolve('src/styles/vars.scss'), resolve('src/styles/mixins.scss'), resolve('src/styles/func.scss')]}),
        ]
      },
      // 这里匹配普通的 `<style>` 或 `<style scoped>`
      {
        use: [
          setLoaderSourceMap("vue-style-loader", {}, opt.isProd),
          setLoaderSourceMap("css-loader", {}, opt.isProd),
          setLoaderSourceMap("postcss-loader", {
            plugins: () => [require('autoprefixer')({
              'overrideBrowserslist': ['> 1%', 'last 5 versions']
            })],
          }, opt.isProd),
          setLoaderSourceMap(
            "sass-loader",
            {
              data: `
              $isProd: "${config.isProd}";
              $assetsPath: "${config.assetsPath}";`
            },
            opt.isProd
          ),
          setLoaderSourceMap('sass-resources-loader', {
            resources: [resolve('src/styles/vars.scss'), resolve('src/styles/mixins.scss'), resolve('src/styles/func.scss')]}),
        ]
      }
    ],
    less: [
      // 这里匹配 `<style module>`
      {
        resourceQuery: /module/,
        use: [
          setLoaderSourceMap("vue-style-loader", {}, opt.isProd),
          setLoaderSourceMap(
            "css-loader",
            {
              modules: true,
              localIdentName: "[local]_[hash:base64:5]"
            },
            opt.isProd
          ),
          setLoaderSourceMap("postcss-loader", {
            plugins: () => [require('autoprefixer')({
              'overrideBrowserslist': ['> 1%', 'last 5 versions']
            })],
          }, opt.isProd),
          setLoaderSourceMap(
            "less-loader",
            {
              modifyVars: {
                "@assetsPath": s(config.assetsPath)
              },
              javascriptEnabled: true
            },
            opt.isProd
          ),
          setLoaderSourceMap(
            "sass-resources-loader",
            {
              resources: [
                resolve("src/styles/vars.less"),
                resolve("src/styles/mixins.less"),
              ]
            },
            opt.isProd
          )
        ]
      },
      // 这里匹配普通的 `<style>` 或 `<style scoped>`
      {
        use: [
          setLoaderSourceMap("vue-style-loader", {}, opt.isProd),
          setLoaderSourceMap("css-loader", {}, opt.isProd),
          setLoaderSourceMap("postcss-loader", {
            plugins: () => [require('autoprefixer')({
              'overrideBrowserslist': ['> 1%', 'last 5 versions']
            })],
          }, opt.isProd),
          setLoaderSourceMap(
            "less-loader",
            {
              modifyVars: {
                "@assetsPath": s(config.assetsPath)
              },
              javascriptEnabled: true
            },
            opt.isProd
          ),
          setLoaderSourceMap(
            "sass-resources-loader",
            {
              resources: [
                resolve("src/styles/vars.less"),
                resolve("src/styles/mixins.less"),
              ]
            },
            opt.isProd
          )
        ]
      }
    ]
  };

  // 生产环境下提取 CSS
  if (opt.isProd) {
    for (const value of Object.values(map)) {
      value.forEach(rule => {
        // vue-style-loader should be replaced by the extract loader, not used together. see: https://github.com/vuejs/vue-loader/issues/1340
        rule.use.shift();
        rule.use.unshift({
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !config.isProd
          }
        })
      });
    }
  }

  return map[opt.preProcessor];
};

const styleLoaders = [
  {
    test: /\.css$/,
    include: [resolve("src"), resolve("node_modules")],
    oneOf: getStyleRule({ isProd: config.isProd, preProcessor: "css" })
  },
  {
    test: /\.scss$/,
    include: [resolve("src")],
    oneOf: getStyleRule({ isProd: config.isProd, preProcessor: "scss" })
  },
  {
    test: /\.less$/,
    oneOf: getStyleRule({ isProd: config.isProd, preProcessor: "less" })
  }
];

const scriptLoaders = [
  {
    test: /\.vue$/,
    use: [
      {
        loader: "vue-loader",
        // options: {
        //   hotReload: config.isProd ? true : false // 关闭热重载
        // }
      }
    ]
  },
  {
    test: /\.(t|j)s$/,
    include: [resolve("src")],
    exclude: /node_modules/,
    use: [
      "cache-loader",
      // 'thread-loader',
      // "babel-loader"
      {
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
      }
    ]
  }
];

const assetsLoaders = [
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
    loader: 'image-webpack-loader',
    enforce: 'pre',
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
    loader: "url-loader",
    options: {
      limit: 1024 * 10,
      name: "assets/img/[name].[ext]?[hash]",
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: "url-loader",
    options: {
      limit: 1024 * 200,
      fallback: 'url-loader',
      name: "assets/font/[name].[ext]?[hash]"
    }
  },
  {
    test: /\.(ogg|mp3|wav|mpe?g)$/i,
    loader: "url-loader",
    query: {
      limit: 1024 * 200,
      name: "assets/media/[name].[ext]?[hash]"
    }
  }
];

module.exports = scriptLoaders.concat(styleLoaders, assetsLoaders);
