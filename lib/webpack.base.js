const autoprefixer = require('autoprefixer');
const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const porjectRoot = process.cwd()

const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(porjectRoot, './src/*/index.js'));
  entryFiles.forEach((item) => {
    const match = item.match(/src\/(.*)\/index\.js/);
    const pathName = match && match[1];
    entry[pathName] = `./src/${pathName}/index.js`;
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(porjectRoot, `src/${pathName}/index.html`),
        filename: `${pathName}.html`,
        chunks: [pathName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  return {
    entry,
    HtmlWebpackPlugins,
  };
};

const {
  entry,
  HtmlWebpackPlugins,
} = setMPA();

module.exports = {

  stats: 'errors-only', // 优化日志输出 errors-only；只输出错误日志
  entry,
  output: {
    path: path.resolve(porjectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader',
        // 'eslint-loader',
      ],
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => {
              autoprefixer({
                overrideBrowserslist: ['last 2 version', '> 1%', 'iOS 7'],
              });
            },
          },
        },
      ],
    },
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                overrideBrowserslist: ['last 2 version', '> 1%', 'iOS 7'],
              }),
            ],
          },
        },
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,
            remPrecision: 8,
          },
        },
        'less-loader',

      ],
    },
    // {
    //     test: /.(png|jpg|gif|jpeg)$/,
    //     use: [{
    //         loader: 'url-loader',
    //         options: {
    //             limit: 10240,
    //         }
    //     }]
    // },
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:8].[ext]',
        },
      }],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:8][ext]',
        },
      }],
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ // css提取为独立文件
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin() {
      // webpack4:this.hooks.done.tap();webpack3:this.plugin()
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors
          && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          // 输出打包错误的自定义文字
          console.log('打包错误'); // eslint-disable-line
          process.exit(1); // 错误状态码
        }
      });
    },
    ...HtmlWebpackPlugins,
  ],
};
