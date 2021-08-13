const path = require('path');
const webpack  = require('webpack');

//preset-env 뭐 이런데 옵션 넣을 수 잇음
// https://github.com/browserslist

module.exports = {
    mode : 'development', // 실서비스에서는  production
    devtool : 'eval', //빠르게한다 production 일때는 hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'] // 아래 엔트리에서 확장자 안쓰게 해줌.
    },

    //입력
    entry : {
        app: ['./client'],
    },

    module: {
        rules : [{
            test : /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets : [
                    ['@babel/preset-env', {
                        targets: {
                            browsers : ['> 1% in KR', 'IE 11'],
                        },
                    }], 
                    '@babel/preset-react'
                ],
            }
        }],
    },
    plugins : [
        new webpack.LoaderOptionsPlugin({debug : true}),
    ],
    //출력
    output : {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },
}