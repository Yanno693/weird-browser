const path = require('path');

module.exports = {
  entry: './assets/main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'Bundle'
  },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader' ]
            }
        ]
   },
   target: 'node',
   "externals": {
    "electron": "require('electron')",
    "child_process": "require('child_process')",
    "fs": "require('fs')",
    "path": "require('path')"
    }
   /*node: {
    fs: "empty"
    }*/
};
