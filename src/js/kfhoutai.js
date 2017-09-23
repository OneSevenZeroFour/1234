require(['config'],function(){
    require(['jquery','socketio'],function($,io){
        var socket = io("http://localhost:1233");

        var name = prompt('请输入客服名字','小猫咪');
        if(name!=null && name!= ""){
            socket.emit('adduser', {
                    name,
            });

        }
         socket.on("showuserlist", function(data){
            var html = data.map(function(item){
                console.log(item.name);
                if(item.name == name)return;
                return `
                    <option value="${item.id}">${item.name+item.id.slice(0,4)}</option>
                `
            }).join("");
            $("select").html(html);
        })
         function send(){
            socket.emit('chat', {
                name,
                message:$("textarea").val(),
                toId:$("select").val()
            });
            var userli = $('.usertx').val();
            var $li = $('<li/>');
            // console.log(userli);
            $li.html(`<p>${userli}</p><span>${new Date().toString().slice(16,24)}</span>`).appendTo($('.message')).addClass('active');
            $('.usertx').val('');
            var jl = $('.jiaoliu')[0];
            jl.scrollTop = jl.scrollHeight;
         }
         $('#send').on('click',function(){
            if($("textarea").val().trim() == '')return;
            send();
         });
         $(document).on('keydown',function(e){
            if(e.keyCode === 13 && $("textarea").val().trim() != ''){
                send();
            }
         });
         socket.on("getMessage", function(data){
            var $li = $('<li/>');
            $li.html(`<p>${data.message}</p><span>${new Date().toString().slice(16,24)}</span>`).appendTo($('.message')).addClass('leftm');
            var jl = $('.jiaoliu')[0];
            jl.scrollTop = jl.scrollHeight;  
        });
    });
});