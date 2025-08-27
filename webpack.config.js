let isDev = process.env.NODE_ENV === 'development';

module.exports = {
   mode: isDev ? 'development' : 'production',
   output: {
      filename: 'main.min.js',
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         }
      ]
   },
   devtool: isDev ? 'source-map' : false
}