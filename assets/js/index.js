const $ = require('jquery');
const url = require('url');
const valid_url = require('valid-url');
const remote = require('electron').remote;

//$('#p').text("jaja");
//$('#p').bind("click", function(){ console.log("salut");})


$('#searchInput').bind("keydown", function(e){
    if(e.keyCode == 13) // Press enter
    //if(e.key == "Enter")
    {
        if(valid_url.isWebUri($('#searchInput').val())) // window with uri
        {
            createWindowURL($('#searchInput').val());
        }
        else
        {
            console.log("URL Invalide");
        }
    }
});

function validUrl(url)
{
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(url);
}

function createWindowURL(url = "http://www.youtube.fr")
{
    let win = new remote.BrowserWindow({
        width: 600,
        height: 600,
        darkTheme: true,
        backgroundColor: "#263238",
        //frame: false,
        //transparent: true,
        title: "L'internet comme ca",
        //titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    //win.loa
    
    win.loadFile("./public/loading.html")
    .then( () => {
        win.loadURL(url)
        .catch( () => 
        {
            console.log("il y a clairement un truc qui ne va pas");
            win.loadFile("./public/index.html");
        });
    });

}
/*window.Bundle = Bundle;*/

/*let n = 0;


function mylog()
{
    console.log("mylog");
}

window.mylog = mylog;

exports.keyboardEvent = (a) => 
{
    n++;
    //document.getElementById('p').innerHTML = n;
    $("p").text(n);
    console.log("press");
    
    //console.log(e);
    //$("p").text("jaja");
}

/*export function k(a)
{
    n++;
    //document.getElementById('p').innerHTML = n;
    $("p").text(n);
    console.log("press");
    
    //createWindowURL();
}

export function f(a)
{
    n++;
    //document.getElementById('p').innerHTML = n;
    $("p").text(n);
    console.log("press");
    
    //console.log(e);
    //$("p").text("jaja");
}*/

/*new CTB.Titlebar({
    backgroundColor: CTB.Color.RED
});*/

//window.f = f;*/