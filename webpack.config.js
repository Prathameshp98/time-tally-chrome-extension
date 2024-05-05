
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'),
        options: path.resolve('./src/options/options.tsx'),
        background: path.resolve('./src/background/background.ts'),
        contentScripts: path.resolve('./src/contentScript/contentScript.ts'),
        newTab: path.resolve('./src/tabs/index.tsx')
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            ident: 'postcss',
                            plugins: [tailwindcss, autoprefixer],
                        }
                    }
                }],
                test: /\.css$/i,
            },
            {
                type: 'assets/resouces',
                use: 'asset/resouce',
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg|webp)$/,
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve('src/static/manifest.json'), 
                    to: path.resolve('dist') 
                },
            ],
        }),
        ...getHTMLPlugins([
            'popup',
            'options',
            'newTab'
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    }
}

function getHTMLPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}