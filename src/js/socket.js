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
var userlist = [];
io.on('connection', function(socket){
    socket.on('adduser', function(data) {
        console.log(socket.id)
        console.log(data);
        userlist.push({
            id: socket.id,
            name: data.name
        })

        io.emit("showuserlist", userlist);
        
    });

    socket.on('chat',function(data){
        console.log(data.name);
        //只存用户的id和message用作分析，如果存在这个socketid则更新message，不存在则插入一条新的数据
        if(data.message != undefined && data.name == 'user'){
            connection.query(`select count(*) as count from customer where socketid = '${data.toId}'`,function(error, results, fields){
                if(error) throw error;
                var temp = results[0].count*1;
                console.log(temp);

                if(temp<1){console.log(34);
                    connection.query(`insert into customer (socketid,message) values ("${data.toId}","${data.message}")`,function(error, results, fields){
                        if(error) throw error;
                    });
                }else{
                    connection.query(`select * from customer where socketid='${data.toId}'`, function(error, results, fields){
                        if(error) throw error;
                        var me = results[0].message + ',' + data.message;
                        connection.query(`update customer set message='${me}' where socketid='${data.toId}'`,function(error, results, fields){
                            if(error) throw error;
                        });

                    });
                }
            });


        }
        if(data.toId != undefined){
            io.sockets.sockets[data.toId].emit("getMessage", data);
        }
    });

    socket.on('biaoqing',function(data){
        //新建一个文件夹存表情的图片，数据库里面存表情代码和表情的路径，textarea输入表情的代码后发送一个请求
        
    });

});

server.listen(1233);
console.log("ok");