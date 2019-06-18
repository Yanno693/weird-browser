//const electron = require('electron');
const { app, BrowserWindow } = require('electron');

function createWindow()
{
    let win = new BrowserWindow({
        width: 600,
        height: 600,
        //darkTheme: true,
        //frame: false,
        //transparent: true,
        backgroundColor: "#263238",
        title: "L'internet comme ca",
        //titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("public/loading.html")
    .then(function(){
        console.log("chargement reussi je crois");
    })
    .catch(function(){
        console.log("ERREUR");
    });
}

app.on('ready', createWindow);;