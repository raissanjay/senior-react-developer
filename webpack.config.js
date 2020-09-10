const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const extractStyles = new ExtractTextPlugin({
    filename: './app.css', // this is output name for file
    disable: false,
    allChunks: true,
});

const listStyles = new StyleLintPlugin({
    files: '**/*.less',
    syntax: 'less',
    fix: true,
});

const plugins = [
    extractStyles,
    listStyles,
];

module.exports = {
    entry: {
        app: [
            './react/src/js/app.jsx',
            './less/app.less', // this is entry point for less file
        ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components|\.spec\.js$)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['transform-class-properties', 'transform-object-rest-spread'],
                    },
                },
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components|\.spec\.js$)/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    failOnError: true,
                    fix: true,
                },
            },
            {
                test: /\.css$/,
                loader: 'ignore-loader',
            },
            {
                test: /\.less$/,
                use: extractStyles.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false,
                            minimize: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            url: false,
                        },
                    }],
                }),
            },
        ],
    },
    plugins,
    devtool: 'eval-source-map',
};
