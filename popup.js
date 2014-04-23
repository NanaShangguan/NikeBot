/**
 * Created by Nano on 14-4-15.
 */

$(document).ready(function(){
    $("#start").click(function() {
        if (this.innerHTML == 'start') {
            this.innerHTML = 'stop';
            chrome.extension.sendRequest({action: 'start'});
        } else {
            this.innerHTML = 'start';
            chrome.extension.sendRequest({action: 'stop'});
        }
    }) ;
    $("#settings").click(function() {
        window.open("settings.html", "_blank");
    });
});