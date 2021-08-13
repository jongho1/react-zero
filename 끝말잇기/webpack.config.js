const path = require('path');
const RefreshWebPackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'word-relay-setting',
    mode : 'development', // 실서비스에서는  production
    devtool : 'eval', //빠르게한다 실서비스 : hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'] // 아래 엔트리에서 확장자 안쓰게 해줌.
    },

    //입력
    entry : {
        // app: ['./client.jsx', './wordRelay.jsx'], // client.jsx 에서 wordRelay를 불러서 쓰고 있기 때문에 client.jsx만 해도 다 불러옴
        app: ['./client'],
    },

    module: {
        rules : [{
            test : /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets : ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            }
        }],
    },
    plugins: [
        new RefreshWebPackPlugin(),
    ],
    //출력
    output : {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },

    devServer: {
        publicPath: '/dist/',
        hot : true,
    },
}