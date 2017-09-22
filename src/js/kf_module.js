define(['socketio'],function(io){
     //客服弹窗
        var socket = io("http://localhost:1233");
        var $cs = $('#customerService');
        $('.kf').on('click',function(){
            $cs.css('display','block');

            socket.emit('adduser', {
                    name:'用户'
            });
            window.open("../html/kfhoutai.html","_blank"); 

        })
        
        //初始化的时间戳
        var now = new Date();
        $('.timestamp').html(now.toString().slice(16,24));

        //先和后端建立连接
         socket.on("showuserlist", function(data){
            console.log(123);
            var html = data.map(function(item){
                if(item.name === '用户')return;
                return `
                    <option value="${item.id}">${item.name+item.id.slice(0,4)}</option>
                `
            }).join("");
            $("select").html(html);
        })
         function send(){
            socket.emit('chat', {
                name:'user',
                message:$("textarea").val(),
                toId:$("select").val()
            });
            var userli = $('.usertx').val();
            var $li = $('<li/>');
            $li.html(`<p>${userli}</p><span>${new Date().toString().slice(16,24)}</span>`).appendTo($('.message')).addClass('active');
            $('.usertx').val('');
            //发消息时滚动条一直在最底部
            var jl = $('.jiaoliu')[0];
            jl.scrollTop = jl.scrollHeight; 
         }
         $('#send').on('click',function(){
            // console.log($("textarea").val().trim());
            if($("textarea").val().trim() == '')return;
            send();
         });
         $(document).on('keydown',function(e){
            if(e.keyCode === 13 && $("textarea").val().trim() != ''){
                send();
            }
         });
         socket.on("getMessage", function(data){
            // console.log(data)
            var $li = $('<li/>');
            $li.html(`<p>${data.message}</p><span>${new Date().toString().slice(16,24)}</span>`).appendTo($('.message')).addClass('leftm');
            //接收消息时滚动条一直在最底部
            var jl = $('.jiaoliu')[0];
            jl.scrollTop = jl.scrollHeight;  
        })

         //拖拽效果
         var $tx = $('.touxiang');
         $tx.on('mousedown',function(e){
            var left = e.clientX - $cs.offset().left;
            var top = e.clientY - $cs.offset().top
            $(document).on('mousemove',function(e){
                $cs.css({'left':e.clientX - left,'top':e.clientY - top});
                e.preventDefault();
            })

         })
         $(document).on('mouseup',function(){
            $(document).unbind('mousemove');
         })
         //关闭效果
         $('.close,.i1').on('click',function(){
            $cs.css({'display':'none'});
         });
         
});