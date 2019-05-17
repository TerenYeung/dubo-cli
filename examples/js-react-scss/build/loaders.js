const config = require("./config"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  tsImportPluginFactory = require('ts-import-plugin'),
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
    css: {
      use: [
        setLoaderSourceMap("style-loader", {}, opt.isProd),
        setLoaderSourceMap("css-loader", {}, opt.isProd),
        setLoaderSourceMap("postcss-loader", {
          plugins: () => [require('autoprefixer')({
            'browsers': ['> 1%', 'last 5 versions']
          })],
        }, opt.isProd)
      ]
    },
    scss: {
      use: [
        setLoaderSourceMap("style-loader", {}, opt.isProd),
        setLoaderSourceMap("css-loader", {}, opt.isProd),
        setLoaderSourceMap("postcss-loader", {
          plugins: () => [require('autoprefixer')({
            'browsers': ['> 1%', 'last 5 versions']
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
    less: {
      use: [
        setLoaderSourceMap("style-loader", {}, opt.isProd),
        setLoaderSourceMap("css-loader", {}, opt.isProd),
        setLoaderSourceMap("postcss-loader", {
          plugins: () => [require('autoprefixer')({
            'browsers': ['> 1%', 'last 5 versions']
          })],
        }, opt.isProd),
        setLoaderSourceMap(
          "less-loader",
          {
            globalVars: {
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
  }

  // 生产环境下提取 CSS
  if (opt.isProd) {
    for (const preprocessor of Object.values(map)) {
      // production enviroment should not use style-loader
      preprocessor.use.shift()
      preprocessor.use.unshift({
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !config.isProd
        }
      })
    }

  }

  return map[opt.preProcessor];
};

const styleLoaders = [
  {
    test: /\.css$/,
    include: [resolve("src"), resolve("node_modules")],
    ...getStyleRule({ isProd: config.isProd, preProcessor: "css" })
  },
  {
    test: /\.scss$/,
    include: [resolve("src")],
    ...getStyleRule({ isProd: config.isProd, preProcessor: "scss" })
  },
  {
    test: /\.less$/,
    ...getStyleRule({ isProd: config.isProd, preProcessor: "less" })
  }
];

const scriptLoaders = [
  {
    test: /\.(t|j)sx?$/,
    include: [resolve("src")],
    exclude: /node_modules/,
    use: [
      "cache-loader",
      // 'thread-loader',
      "babel-loader"
    ]
  }
];

const assetsLoaders = [
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    loader: "url-loader",
    options: {
      limit: 1024 * 10,
      name: "assets/img/[name].[ext]?[hash]",
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/,
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
