const $ = require('jquery');
const remote = require('electron').remote;

$("#titlebar-close-button").bind("click",() => {
    var window = remote.getCurrentWindow();
    window.close();
});

$("#titlebar-hide-button").bind("click",() => {
    var window = remote.getCurrentWindow();
    window.minimize();
})