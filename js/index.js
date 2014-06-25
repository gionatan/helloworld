var app = {
    
    // Application Constructor
initialize: function() {
    this.bindEvents();
},

bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    
onDeviceReady: function() {
    
    if(navigator.network.connection.type == Connection.NONE){
        window.location.href = 'retry.html';
        return;
    }
    
    IAP.initialize();
    var playmeUrl = 'http://www2.playme.com/';
    
    if (window.localStorage.getItem('is_recover')){
        playmeUrl+= 'recover?username=itunes.' + window.localStorage.getItem('transactionId') +
            '&password='+ IAP.getPassword(window.localStorage.getItem('transactionId'));
        
        window.localStorage.getItem('is_recover', 0);
    }
    
    var ref = window.open(playmeUrl, '_blank', 'location=no,toolbar=no');
    ref.addEventListener('loadstart', function(event) {
                         if (event.url.match(/gotobilling=1/)){
                            ref.close();

                            if (IAP.loaded) {
                                var pId = 'playme.subscription.monthly';
                                IAP.buy(pId);
                            } else {
                            alert("In-App Purchases not available");
                            }
                         }
    });
    
    ref.addEventListener('loadstart', function(event) {
                         if (event.url.match(/restore/)){
                             ref.close();
                             IAP.restore();
                         }
                         });    

    if (window.localStorage.getItem('subscriptionReceipt') && window.localStorage.getItem('transactionId')){
        var injectCode = "var PURCHASE_TOKEN = '"+ window.localStorage.getItem('subscriptionReceipt') +"'; var PAYMETHOD='itunes'; var USER_PREMIUM = 1; var APP_INSTALLED=1; var USER_ACCOUNT= 'itunes."+window.localStorage.getItem('transactionId')+"'; var INAPP_PWD='"+IAP.getPassword(window.localStorage.getItem('transactionId'))+"';"
    } else {
        var injectCode = "var PAYMETHOD='itunes'; var APP_INSTALLED=1;"
    }
        
    ref.addEventListener('loadstop', function(event) {
                             
                         if (event.url.match(/\/radio/)){
                             ref.executeScript(
                                               { code: injectCode },
                                               function () {}
                                               );
                         }
                         });
    
    
}
};