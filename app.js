//const electron = require('electron');
const { app, BrowserWindow } = require('electron');

let background_color = '#263238';

function createWindow()
{
    let win = new BrowserWindow({
        width: 600,
        height: 600,
        minWidth: 100,
        minHeight: 100,
        backgroundColor: background_color,
        title: 'Slice Browser',
        //titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.on('close', () => {
        app.quit();
        win = null;
    });

    //win.loadFile('public/browser.html')
    win.loadFile('public/index.html')
    .then(function(){
        console.log('chargement reussi je crois');
    })
    .catch(function(){
        console.log('ERREUR');
    });
}

app.on('ready', createWindow);