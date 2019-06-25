# Slice browser

This is some sort of web-browser that allows you to open small floating web tabs on your desktop.

## About this project

This weird thing is an Chromium-based web browser powered by Electon and Materialize-CSS, so this is a NodeJS project.  
Source code is written in JavaScript, stylesheets are stored in .scss files, and all assets are bundled using Webpack ( well actually not ALL assets, in fact Google Material icons and Roboto font are imported at load time form the moment, but it will change I guess).

## How to install

First of all, you need to have NodeJS/NPM and Git installed on your machine.  
Once it's done, start by cloning the project somewhere on your computer :

```
$ git clone https://github.com/Yanno693/weird-browser.git
$ cd weird-browser
```

Now, install all the required modules and pack the assets

```
$ npm install
$ npm run build
```

You are now ready to start the browser :

```
$ npm start
```

PS : If you're modifying assets, you'll need to repack all the assets to see some change is the browser. Fortunately, you can use Webpack watcher to repack your assets at every modification, just open a console with the following command :

```
$ npm run watch
```
OR
```
$ webpack -w
```

## Useful links

- [Electron website](https://electronjs.org/) for informations and documentation
- [NodeJS](https://nodejs.org) ans [NPM](https://www.npmjs.com/) websites
- Learn more about [Chromium](https://www.chromium.org/)
- [Webpack](https://webpack.js.org/) website for informations and documentation
- Make some fancy buttons with [Materialize-CSS](https://materializecss.com/)
- Did I told you I also used [jQuery](https://jquery.com/) ?
- Learn more about [SASS And Scss](https://sass-lang.com/)
- Go check [Google Material Icons](https://material.io/tools/icons)
- A nice, fast and fancy text-editor : [Visual Studio Code](https://code.visualstudio.com/)
