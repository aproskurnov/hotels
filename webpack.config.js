const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, './public'),
		filename: '[name].bundle.js',
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.pug$/,
				use: 'pug-loader'
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
						loader: 'file-loader',
						options: {
							outputPath: './assets'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: './assets'
					}
				}
				]
			}

		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: './pages/index.pug'
		}),
		new HtmlWebpackPlugin({
			filename: "ui-kit-colors-type.html",
			template: './pages/ui-kit-colors-type.pug'
		}),
		new HtmlWebpackPlugin({
			filename: "ui-kit-form-elements.html",
			template: './pages/ui-kit-form-elements.pug'
		}),

		// new HtmlWebpackPlugin({
		// 	filename: "test.html",
		// 	template: './pages/test.pug'
		// }),
	]
};

