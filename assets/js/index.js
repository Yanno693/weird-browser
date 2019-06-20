const $ = require('jquery');
const valid_url = require('valid-url');
const remote = require('electron').remote;

const init_width = 500;
const init_height = 500;

$('#searchInput').bind("keydown", function(e){
    if(e.keyCode == 13) // Press enter
    //if(e.key == "Enter")
    {
        if($('#searchInput').val().replace(/ /g,'') != '')
        {
            if(valid_url.isWebUri($('#searchInput').val())) // window with uri
            {
                createWindowURL($('#searchInput').val());
            }
            else // Window with google search result
            {
                createWindowGoogleSearch($('#searchInput').val())
            }
        }
    }
});

function createWindowURL(url = "https://www.youtube.com")
{
    let win = new remote.BrowserWindow({
        width: init_width,
        height: init_height,
        darkTheme: true,
        //backgroundColor: "#263238",
        frame: false,
        transparent: true,
        title: "L'internet comme ca",
        //titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    let view = new remote.BrowserView();
    view.setBounds({ x: 0, y: 40, width: init_width, height: init_height - 40})
    view.setAutoResize({width: true, height: true});
    win.setBrowserView(view);
    
    win.loadFile("./public/browser.html")
    .then( () => {
        view.webContents.loadURL(url)
        .then( () => {
            //win.setBackgroundColor("#FF00FF");
        })
        .catch( () => 
        {
            console.log("il y a clairement un truc qui ne va pas");
            win.loadFile("./public/index.html");
        });
    });

    win.once('ready-to-show', () => {
        win.show()
      })

}

function createWindowGoogleSearch(search)
{
    let encodedSearch = encodeURIComponent(search);
    let googleQuery = encodedSearch.replace(/%20/g,'+');

    let win = new remote.BrowserWindow({
        width: init_width,
        height: init_height,
        darkTheme: true,
        //backgroundColor: "#263238",
        frame: false,
        transparent: true,
        title: "L'internet comme ca",
        //titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.once('ready-to-show', () => {
        win.show()
      })

    win.loadFile("./public/browser.html");
    
    let view = new remote.BrowserView();
    view.setBounds({ x: 0, y: 40, width: init_width, height: init_height - 40})
    view.setAutoResize({width: true, height: true});
    win.setBrowserView(view);
    view.webContents.loadURL("https://www.google.com/search?q=" + googleQuery)
}