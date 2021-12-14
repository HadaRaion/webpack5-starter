const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';

if (process.env.NODE_ENV === 'production') {
	mode = 'production';
}

module.exports = {
	mode: mode,
	entry: {
		main: path.resolve(__dirname, 'src/app.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].bundle.js',
		assetModuleFilename: 'images/[name][hash][ext]',
		clean: true, // delete old file
	},
	devtool: 'source-map',
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 5001, // default 8080
		open: false, // open browser when it starts to watch
		hot: true,
	},

	// loaders : need to handle html, css, image etc beside of javascript base one
	module: {
		rules: [
			{
				test: /\.(png|ico|jpe?g|gif|svg)$/i,
				type: 'asset/resource', //'asset':make inline in js for small file
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						// This is required for asset imports in CSS, such as url()
						options: { publicPath: '' },
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			minify:
				mode === 'production'
					? {
							collapseWhitespace: false,
							removeComments: true,
					  }
					: false,
		}),
	],
};
