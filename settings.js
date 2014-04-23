/**
 * Created by nano on 14-4-23.
 */

function deleteUrl(o) {
    var urlList = JSON.parse(localStorage['urlList']);

    $.each(urlList, function(index, info) {
        if (info.url == o.prev()[0].innerText) {
            urlList.splice(index, 1);
            return false;
        }
    });

    localStorage['urlList'] = JSON.stringify(urlList);
    alert('success');
    window.location.reload();
}

$(document).ready(function() {
    var urlList = localStorage['urlList'];
    var size = localStorage['size'];
    if (urlList) {
        urlList = JSON.parse(urlList);
        $.each(urlList, function(index, info) {
           $('#storeList').append('<li><span>' + info.url + '</span><button onclick="deleteUrl($(this))">delete</button></li>');
        });
    }
    if (size) {
        $('#size').text(size);
    } else $('#size').text('0');

    $('#add').click(function(){
       $('#inputList').append('<li><input type="text"></li>')
    });

    $('#save').click(function() {
        var inputList = $('#inputList input');
        var urlList;
        if (localStorage['urlList']) {
            urlList = JSON.parse(localStorage['urlList']);
        } else urlList = [];

        $.each(inputList, function(index, info) {
            if (info.value != '') {
                urlList.push({'url': info.value});
            }
        });
        localStorage['urlList'] = JSON.stringify(urlList);
        alert('success');
        window.location.reload();
    });

    $('#modifySize').click(function(){
        if ($('#newSize').val() != '') {
            localStorage['size'] = $('#newSize').val();
            alert('success');
            window.location.reload();
        }
    });
});