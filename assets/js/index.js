const $ = require('jquery');
const valid_url = require('valid-url');
const remote = require('electron').remote;

const init_width = 500;
const init_height = 500;

const titlebar_height = 40;
const background_color = '#263238';

function renderWindowsList()
{
    //$('#p').text('salut');
    
    //i = remote.BrowserWindow.getAllWindows().length;

    $('#instance-table-body').empty();

    remote.BrowserWindow.getAllWindows().forEach( function(e){

        if(e.id != 1)
        {
            let tr = document.createElement('tr');

            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td2.setAttribute('class', 'right-align');

            let icon = document.createElement('i');
            icon.setAttribute('class', 'material-icons');
            icon.onclick = () => {
                remote.BrowserWindow.fromId(e.id).close()
                renderWindowsList();
            };
            icon.innerHTML = 'close';
            
            td1.innerHTML = e.id;
            td2.appendChild(icon);

            tr.appendChild(td1);
            tr.appendChild(td2);

            $('#instance-table-body').append(tr);
        }
    });
}

// On keyDown event
$('#searchInput').bind('keydown', function (e) {
    let win;

    if (e.keyCode == 13) // Press enter
    //if(e.key == 'Enter')
    {
        if ($('#searchInput').val().replace(/ /g, '') != '') {
            if (valid_url.isWebUri($('#searchInput').val())) // window with uri
            {
                win = createSliceURL($('#searchInput').val());
            } else // Window with google search result
            {
                win = createSliceGoogleSearch($('#searchInput').val())
            }
        }
        $('#searchInput').val('');

        renderWindowsList();
    }
});

// Create the window
function createSlice() {
    let win = new remote.BrowserWindow({
        parent: remote.getCurrentWindow,
        width: init_width,
        height: init_height,
        minWidth: 200,
        minHeight: 200,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        //titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.on('close', () => {
        win = null;
    });

    win.on('closed', () => {
        renderWindowsList();
    });

    return win;
}

// Create the webview inside the window
function createSliceView(window) {
    let view = new remote.BrowserView({

    });
    view.setBounds({
        x: 0,
        y: titlebar_height,
        width: init_width,
        height: init_height - titlebar_height
    })
    view.setAutoResize({
        width: true,
        height: true
    });
    view.webContents.setZoomFactor(0.5);
    view.webContents.setZoomLevel(0.5);
    window.setBrowserView(view);

    return view;
}

// Create a window with an URL
function createSliceURL(url = 'https://www.youtube.com') {
    let win = createSlice();
    let view = createSliceView(win);

    win.loadFile('./public/browser.html')
        .then(() => {
            view.webContents.loadURL(url)
                //.then( () => {})
                .catch(() => {
                    //console.log('There\'s clearly something wrong !');
                    win.loadFile('./public/error.html');
                });
        });

    win.once('ready-to-show', () => {
        win.show()
    });

    return win;
}

// create a window with a google search
function createSliceGoogleSearch(search) {
    let encodedSearch = encodeURIComponent(search);
    let googleQuery = encodedSearch.replace(/%20/g, '+');

    let win = createSlice();
    let view = createSliceView(win);

    win.loadFile('./public/browser.html')
        .then(() => {
            view.webContents.loadURL('https://www.google.com/search?q=' + googleQuery)
                .then(() => {

                })
                .catch(() => {
                    win.loadFile('./public/error.html');
                });
        });

    win.once('ready-to-show', () => {
        win.show()
    });

    return win;
}