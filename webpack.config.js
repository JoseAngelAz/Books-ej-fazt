const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// plugin para leer html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV != 'production';//devuelve T o F
console.log(devMode);
module.exports = {

    entry:'./frontend/app.js',
    output:{
        path:path.join(__dirname,'backend/public'),
        filename:'js/bundle.js'//dentro de una carpeta js
    },
    mode:'production',//para producción cambiar a production

    module:{
        rules:[
            {
                test:/\.css/,
            use:[//si estoy en dev carga los styles dentro del js, pero si estoy en production carga los styles en su propio archivo de css
               devMode ? 'style-loader': MiniCssExtractPlugin.loader,
                'css-loader' //ocupar desde MCssEP la propiesdad css-loader   
             ]
            }
        ]
    },

    plugins:[//config html
        new HtmlWebpackPlugin({
            template:'./frontend/index.html',//where is html
            minify:{
                collapseWhitespace:true,
                removeComments:true,
                removeRedundantAttributes:true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true,
                useShortDoctype:true
            }
        }),//especificamos como se ejectuca MCEP
        new MiniCssExtractPlugin({//name del dato que genera
            filename:'css/bundle.css'//dentro de una carpeta css
        })
    ],
    devtool:'source-map'//para ver en que linea hay errores
}