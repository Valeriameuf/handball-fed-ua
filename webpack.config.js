const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    plugins: [
        new HtmlBundlerPlugin({
            entry: {
                index: {
                    // output dist/index.html
                    import: './views/index.ejs',
                    data: {
                        isFrontPage: true,
                    },
                },
                'single-news': {
                    import: './views/single-news.ejs',
                },
                'general-news': {
                    import: './views/general-news.ejs',
                },
                banner: {
                    import: './views/banner.ejs',
                },
                match: {
                    import: './views/match.ejs',
                },
                standings: {
                    import: './views/standings.ejs',
                },
                calendar: {
                    import: './views/calendar.ejs',
                },
            },
            preprocessor: 'ejs', // use EJS templating engine
            // preprocessorOptions: {...},
            js: {
                filename: 'main.[contenthash:8].js', // JS output filename
            },
            css: {
                filename: 'style.[contenthash:8].css', // CSS output filename
            },
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json',
            filter: (file) => file.path.endsWith('.js') || file.path.endsWith('.css'),
            map: (file) => {
                if (file.name.startsWith('__bundler-plugin-entry__')) {
                    file.name = file.name.replace('__bundler-plugin-entry__', '');
                }
                return file;
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
                        const regExp = new RegExp(
                            `[\\\\/]?(?:${path.normalize(srcPath)}|node_modules)[\\\\/](.+?)$`
                        );
                        const assetPath = path.dirname(
                            regExp.exec(filename)[1].replace('@', '').replace(/\\/g, '/')
                        );

                        return `img/${assetPath}/[name][ext]`;
                    },
                },
            },
        ],
    },

    resolve: {
        alias: {
            '@scss': path.join(__dirname, '/scss/'),
            '@js': path.join(__dirname, '/js/'),
            '@img': path.join(__dirname, '/img/'),
            '@flags': path.join(__dirname, '/node_modules/svg-country-flags/'),
        },
    },
};
