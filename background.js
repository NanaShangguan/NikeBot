var enable = false;
var interval = 500;

chrome.extension.onRequest.addListener(
  function(request) {
    if (request.action == "start") {
        enable = true;
        start();
    }
    else enable = false;
  });

function start() {
    //var list = localStorage['list'];
    var list = new Array();
    list[0] = 'http://m.eastbay.com/?uri=product&sku=29876013&model=208227&cm=GLOBAL%20SEARCH:%20KEYWORD%20SEARCH';
    if (enable) {
        $.each(list, function(index, item) {
            $.ajax({
                url: item,
                type: "GET",
                success: function(responseText) {
                    var form = $('#form_pdp_addtocart', responseText);
                    if (form.attr('style') != 'display: none;') {
                        $('#size').val('11.0');
                        form.submit(function(){
                           $(this).ajaxSubmit({
                              success: function(responseText) {
                                  alert(responseText);
                              }
                           });
                            return false;
                        });
                    }
//                    var product_data = JSON.parse($('#product-data', responseText)[0].innerText);
//                    if (product_data.showBuyingTools) {
//                        var inputList = $('form input');
//                        var callback = 'JQueryAutoBuy';
//                        var action = inputList[0].value;
//                        var lang_locale = inputList[1].value;
//                        var catalogId = inputList[3].value;
//                        var productId = inputList[4].value;
//                        var price = inputList[5].value;
//                        var siteId = '70';
//                        var line1 = inputList[7].value;
//                        var line2 = inputList[8].value;
//                        var skuAndSize = '';
//                    }
                }
            });
        });
        setTimeout("", interval);
    }
}