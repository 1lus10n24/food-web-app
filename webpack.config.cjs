const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // 1. Точка входа
  entry: './src/index.js',

  // 2. Куда класть результат
  output: {
    path: path.resolve(__dirname, 'dist'), // Путь к папке dist
    filename: 'bundle.js', // Имя итогового файла
    clean: true, // Очищать папку dist перед каждой сборкой
    publicPath: "./"
  },

  // 3. Модули и Лоадеры
  module: {
    rules: [
      {
        test: /\.css$/i, // Если файл заканчивается на .css
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Если картинки
        type: 'asset/resource',
      },
    ],
  },

  // 4. Плагины
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Взять этот файл как шаблон
    }),
    new CopyPlugin({
      patterns: [
        {from: "img", to: "img"},
        {from: "icons", to: "icons"}
      ]
    })
  ],

  // Режим работы (development для разработки, production для релиза)
  mode: 'development',
};