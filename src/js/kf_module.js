define(['socketio'],function(io){
     //客服弹窗
        $('.kf').on('click',function(){
            $('#customerService').css('display','block');

            window.open("../html/kfhoutai.html","_blank"); 
        })
        //先和后端建立连接
        var socket = io("http://localhost:1233");
        // console.log(io);
        //初始化的时间戳
        var now = new Date();
        $('.timestamp').html(now.toString().slice(16,24));
        // console.log();
        //发送功能
        var i = 0;
        $('#send').on('click',function(){
            var userli = $('.usertx').val();
            var $li = $('<li/>');
            // console.log(userli);
            $li.html(`<p>${userli}</p><span>${new Date().toString().slice(16,24)}</span>`).appendTo($('.message')).addClass('active');
            $('.usertx').val('');
            // console.log(3333);
            socket.emit('chat',{user:userli});
            socket.on('connects',function(data){
                if(i>0)return;
                i++;
                console.log(data);


                // userlist.push(data);
                // console.log(1243);
            });
            socket.on("getMessage", function(data) {
                console.log(data);
                if(data){
                    var $li = $('<li/>');
                    // console.log(userli);
                    $li.html(`<p>${data.user}</p><span>${new Date().toString().slice(16,24)}</span>`).appendTo($('.message')).addClass('leftm');
                };
                
            })

            // console.log(userlist);
        })
});