require.config({
    //加上时间戳
    urlArgs:'v=' +Date.now(),
    paths:{
        'jquery':"../lib/jquery-3.2.1"
    },
    shim:{
        cookie:{
            exports:'Cookie'
        }  
    }
      
})