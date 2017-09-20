var ioFunc = require("socket.io");

var http = require("http");

var server = require('http').createServer();

var mysql = require("mysql");

var io = ioFunc(server);

var connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'outlets'
});
connection.connect();

var uselist = {}
var all = [];
var mysqlarr = []
io.on('connection', function(socket){
    all.push(socket.id);
    console.log(all[1]);
    // uselist.push(socket.id);
    socket.on('chat',function(data){
        var id = socket.id;
        // console.log(data);
        uselist = {
            id,
            msg:data
        };
        // uselist.msg.push(data);
        mysqlarr.push(data);
        
        // console.log(124);
        // console.log(124);
        socket.emit('connects',id);
        console.log(uselist);
        var id2 = all[1];
        if(all[1] != undefined){
            io.sockets.sockets[id2].emit("getMessage", data);
        }
    });
    


    // socket.on('another',)

    
    // console.log(JSON.stringify(uselist));
    // socket.emit('connects',JSON.stringify(uselist));



});

server.listen(1233);
console.log("ok");