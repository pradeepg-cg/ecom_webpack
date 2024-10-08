const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Add the BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Load environment variables from .env file
const env = dotenv.config().parsed;

// Create an object that Webpack can use to inject environment variables into the app
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: './src/index.jsx', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output folder
    filename: 'bundle.js', // Bundle file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Handle .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // Handle SCSS files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.txt$/, // Handle text files
        type: 'asset/source',
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,  // For handling image files
        type: 'asset/resource',        // Webpack 5 asset handling method
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file types
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use index.html as template
    }),
    // Inject environment variables into the app
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'src/assets' }, // Example: Copy assets folder
      ],
    }),
    // Add the BundleAnalyzerPlugin for performance analysis
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generates a static HTML report
      openAnalyzer: false, // Prevents the report from automatically opening
      reportFilename: 'bundle-report.html', // The name of the report file
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve content from dist
    compress: true,
    port: 3000, // Development server port
    hot: true, // Enable hot module replacement
  },
  //mode: 'development', // Set mode to development for unminified code
};