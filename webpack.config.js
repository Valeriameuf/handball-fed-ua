const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
        new HtmlBundlerPlugin({
            entry: {
                index: {
                    // output dist/index.html
                    import: './views/index.ejs',
                    data: {
                        isFrontPage: true
                    }
                },
                'single-news': {
                    import: './views/single-news.ejs'
                },
                'general-news': {
                    import: './views/general-news.ejs'
                },
            },
            preprocessor: 'ejs', // use EJS templating engine
            // preprocessorOptions: {...},
            js: {
                filename: 'js/[name].js', // JS output filename
            },
            css: {
                filename: '../style.css', // CSS output filename
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff2|woff|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
            {
                test: /\.(ico|png|jp?g|svg|webp)/,
                type: 'asset/resource',
                // generator: {
                //     filename: 'img/[name].[hash:8][ext][query]',
                // },
                generator: {
                    // keep original directory structure
                    filename: ({ filename }) => {
                        const srcPath = 'img';
                        const regExp = new RegExp(`[\\\\/]?(?:${path.normalize(srcPath)}|node_modules)[\\\\/](.+?)$`);
                        const assetPath = path.dirname(regExp.exec(filename)[1].replace('@', '').replace(/\\/g, '/'));

                        return `img/${assetPath}/[name][ext]`;
                    }
                }
            },
        ],
    },

    resolve: {
        alias: {
            '@scss': path.join(__dirname, '/scss/'),
            '@js': path.join(__dirname, '/js/'),
            '@img': path.join(__dirname, '/img/'),
            '@var': path.join(__dirname, '/var/'),
        },
    },
};
