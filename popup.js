/**
 * Created by Nano on 14-4-15.
 */

$(document).ready(function(){
    if (localStorage['state'] == 'start')
        $("#start").text('stop');
    else $("#start").text('start');
    $("#start").click(function() {
        if (this.innerHTML == 'start') {
            if (localStorage['urlList']) {
                this.innerHTML = 'stop';
                chrome.extension.sendRequest({action: 'start'});
            } else alert('url list is empty');
        } else {
            this.innerHTML = 'start';
            chrome.extension.sendRequest({action: 'stop'});
        }
    }) ;
    $("#settings").click(function() {
        window.open("settings.html", "_blank");
    });
});