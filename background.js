var interval = 2000;

chrome.extension.onRequest.addListener(
  function(request) {
    if (request.action == "start") {
        localStorage['state'] = 'start';
        start();
    }
    else {
        localStorage['state'] = 'stop';
    }
  });

function start() {
    var urlList = JSON.parse(localStorage['urlList']);
    if (localStorage['state'] == 'start') {
        var rm = [];
        $.each(urlList, function(index, item) {
            $.ajax({
                url: item.url,
                type: "GET",
                success: function(responseText) {
//                    var form = $('#form_pdp_addtocart', responseText);
//                    if (form.attr('style') != 'display: none;') {
//                        $('#size').val('11.0');
//                        form.submit(function(){
//                           $(this).ajaxSubmit({
//                              success: function(responseText) {
//                                  alert(responseText);
//                              }
//                           });
//                            return false;
//                        });
//                    }
                    rm.push(index);
                    var product_data = JSON.parse($('#product-data', responseText)[0].innerText);
                    if (product_data.showBuyingTools) {
                        var inputList = $('.nike-buying-tools input', responseText);
                        var callback = 'JQueryAutoBuy';
                        var action = inputList[0].value;
                        var lang_locale = inputList[1].value;
                        var catalogId = inputList[3].value;
                        var productId = inputList[4].value;
                        var price = inputList[5].value;
                        var siteId = '70';
                        var line1 = inputList[7].value;
                        var line2 = inputList[8].value;
                        var skuId;
                        var displaySize;
                        var skuAndSize;
                        var productSkus = product_data.skuContainer.productSkus;
                        $.each(productSkus, function(index, info) {
                            if (info.displaySize == localStorage['size']) {
                                skuId = info.id;
                                displaySize = info.displaySize;
                            }
                        });
                        skuAndSize = (skuId + ':' + displaySize);

//                        var ajaxUrl = 'https://secure-store.nike.com/us/services/jcartService' + '?' +
//                            'callback=' + callback + '&' +
//                            'action=' + action + '&' +
//                            'lang_locale=' + lang_locale + '&' +
//                            'catalogId=' + catalogId + '&' +
//                            'productId=' + productId + '&' +
//                            'price=' + price + '&' +
//                            'siteId=' + siteId + '&' +
//                            'line1=' + line1 + '&' +
//                            'line2=' + line2 + '&' +
//                            'skuAndSize=' + skuAndSize + '&' +
//                            'qty=1&rt=json&view=3&skuId=' + skuId + '&displaySize=' + displaySize;
//                        console.info(ajaxUrl);

                        $.ajax({
                            url: 'https://secure-store.nike.com/us/services/jcartService',
                            type: 'POST',
                            data: {
                                callback: callback,
                                action: action,
                                lang_locale: lang_locale,
                                catalogId: catalogId,
                                productId: productId,
                                price: price,
                                siteId: siteId,
                                line1: line1,
                                line2: line2,
                                skuAndSize: skuAndSize,
                                qty: 1,
                                rt: 'json',
                                view: 3,
                                skuId: skuId,
                                displaySize: displaySize
                            }
                        });
                        var notice = webkitNotifications.createNotification(
                            'icon.png',  // 图标URL，可以是相对路径
                            'Nike Bot',  // 通知标题
                            product_data.displayName + ' has been put in your cart.'  // 通知正文文本
                        );
                        notice.show();
                    }
                }
            });
        });
        $.each(rm, function(index, info) {
            urlList.splice(info, 1);
        });
        localStorage['urlList'] = JSON.stringify(urlList);
        setTimeout(start, interval);
    }

}