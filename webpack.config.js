const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlBundlerPlugin({
            entry: {
                index: {
                    import: "./views/index.ejs",
                    data: {
                        isFrontPage: true,
                    },
                },
                "single-news": {
                    import: "./views/single-news.ejs",
                },
                "general-news": {
                    import: "./views/general-news.ejs",
                },
                banner: {
                    import: "./views/banner.ejs",
                },
                match: {
                    import: "./views/match.ejs",
                },
                standings: {
                    import: "./views/standings.ejs",
                },
                calendar: {
                    import: "./views/calendar.ejs",
                },
                "player-card": {
                    import: "./views/player-card.ejs",
                },
            },
            preprocessor: "ejs",
            // preprocessorOptions: {...},
            js: {
                filename: "[name].[contenthash:8].js",
            },
            css: {
                filename: "style.[contenthash:8].css",
            },
        }),
        new WebpackManifestPlugin({
            fileName: "manifest.json",
            filter: (file) => file.path.endsWith(".js") || file.path.endsWith(".css"),
            map: (file) => {
                if (file.name.startsWith("__bundler-plugin-entry__")) {
                    file.name = file.name.replace("__bundler-plugin-entry__", "");
                }
                return file;
            },
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/].+\.(js|ts)$/,
                    name: "vendors",
                    chunks: "all",
                    priority: -10,
                },
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s?css$/,
                use: ["css-loader", "sass-loader"],
            },
            {
                test: /\.(woff2|woff|ttf)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
            {
                test: /\.(ico|png|jp?g|svg|webp)/,
                type: "asset/resource",
                generator: {
                    // keep original directory structure
                    filename: ({ filename }) => {
                        const srcPath = "img";
                        const regExp = new RegExp(`[\\\\/]?(?:${path.normalize(srcPath)}|node_modules)[\\\\/](.+?)$`);
                        const assetPath = path.dirname(regExp.exec(filename)[1].replace("@", "").replace(/\\/g, "/"));

                        return `img/${assetPath}/[name][ext]`;
                    },
                },
            },
        ],
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@scss': path.join(__dirname, '/scss/'),
            '@js': path.join(__dirname, '/js/'),
            '@img': path.join(__dirname, '/img/'),
            '@flags': path.join(__dirname, '/node_modules/svg-country-flags/'),
        },
        extensions: [
            '.ts',
            '.js',
        ],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
};
