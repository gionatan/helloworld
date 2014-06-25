var IAP = {
list: [ 'playme.subscription.monthly' ],
products: {}
};
var localStorage = window.localStorage || {};

IAP.initialize = function () {
    // Check availability of the storekit plugin
    if (!window.storekit) {
        console.log('In-App Purchases not available');
        return;
    }
    
    // Initialize
    storekit.init({
                  debug:    true,
                  noAutoFinish: true,
                  ready:    IAP.onReady,
                  purchase: IAP.onPurchase,
                  finish:   IAP.onFinish,
                  restore:  IAP.onRestore,
                  error:    IAP.onError,
                  restoreCompleted: IAP.onRestoreCompleted
                  });
};

IAP.onReady = function () {
    
    // Once setup is done, load all product data.
    storekit.load(IAP.list, function (products, invalidIds) {
                  console.log('IAPs loading done:');
                  for (var j = 0; j < products.length; ++j) {
                  var p = products[j];
                  console.log('Loaded IAP(' + j + '). title:' + p.title +
                              ' description:' + p.description +
                              ' price:' + p.price +
                              ' id:' + p.id);
                  IAP.products[p.id] = p;
                  }
                  IAP.loaded = true;
                  for (var i = 0; i < invalidIds.length; ++i) {
                  console.log('Error: could not load ' + invalidIds[i]);
                  }
                  //IAP.render();
                  });
    
    // Also check the receipts
    // storekit.loadReceipts(function (receipts) {
    //     console.log('appStoreReceipt: ' + receipts.appStoreReceipt);
    // });
};

IAP.onPurchase = function (transactionId, productId) {
    var n = (localStorage['storekit.' + productId]|0) + 1;
    localStorage['storekit.' + productId] = n;
    if (IAP.purchaseCallback) {
        IAP.purchaseCallback(productId);
        delete IAP.purchaseCallbackl;
    }
    
    storekit.finish(transactionId);
    window.localStorage.setItem('transactionId', transactionId);
    
    storekit.loadReceipts(function (receipts) {
                          console.log('Receipt for appStore = ' + receipts.appStoreReceipt);
                          console.log('Receipt for ' + productId + ' = ' + receipts.forProduct(productId));
                          window.localStorage.setItem('subscriptionReceipt', receipts.forProduct(productId));
                          });
};

IAP.onFinish = function (transactionId, productId) {
    console.log('Finished transaction for ' + productId + ' : ' + transactionId);
    window.location.href = 'index.html';
};

IAP.onError = function (errorCode, errorMessage) {
    switch (errorCode){
        case 4983507:
            // back da acquisto
            //IAP.restore();
            window.location.href = 'index.html';
            break;
        case 4983503:
            window.location.href = 'index.html';
            break;
        default:
            alert('Error ('+errorCode+'):'+ errorMessage);
            window.location.href = 'index.html';
    }
    
};

IAP.onRestore = function (transactionId, productId, transactionReceipt) {

    console.log ("onRestore with transactionId="+transactionId);
    
    if(transactionId){
        window.localStorage.setItem('transactionId', transactionId);
        window.localStorage.setItem('is_recover', 1);
    }

};



IAP.onRestoreCompleted = function () {
    console.log("Restore Completed");
    window.location.href = 'index.html';
};

IAP.buy = function (productId, callback) {
    IAP.purchaseCallback = callback;
    storekit.purchase(productId);
};

IAP.restore = function () {
    storekit.restore();
};

IAP.fullVersion = function () {
    return localStorage['storekit.playme'];
};

IAP.getPassword = function (transactionId){
    return md5('itunes.'+transactionId+'.playme').substr(0,8);
}