console.log('async demos loaded');

(function(){
    //sync
    function addSync(x,y){
        console.log(`   @[service] processing ${x} and ${y}`);
        const result = x + y;
        console.log(`   @[service] returning result`);
        return result;
    }

    function addSyncClient(x,y){
        console.log(`@[client] triggering the sync operation`);
        const result = addSync(x,y);
        console.log(`@[client] result = ${result}`);
    }

    window['addSyncClient'] = addSyncClient;

    //Async
    function addAsync(x,y, callback){
        console.log(`   @[service] processing ${x} and ${y}`);
        setTimeout(function(){
            const result = x + y;
            console.log(`   @[service] returning result`);
            callback(result);
        }, 4000);
    }

    function addAsyncClient(x,y){
        console.log(`@[client] triggering the Async operation`);
        addAsync(x,y, function(result){
            console.log(`@[client] result = ${result}`);
        });
    }

    window['addAsyncClient'] = addAsyncClient;


})();