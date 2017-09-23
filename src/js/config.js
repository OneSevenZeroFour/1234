require.config({
    //加上时间戳
    urlArgs:'v=' +Date.now(),
    paths:{
        'jquery':"../lib/jquery-3.2.1",
        'socketio':"../lib/socket.io"
    },
    shim:{
        cookie:{
            exports:'Cookie'
        }  
    }
      
})