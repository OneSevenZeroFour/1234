require(['config'],function(){
    require(['jquery','cookie'],function($){console.log(124);
        // console.log('chenggong');
        require(['rightSideLogin_module']);
        //登录注册切换功能
        // $form = $('.loginlist form');
        // $tog = $('.loginlist .tog');
        // $cl1 = $('.loginlist .climg .cl1');
        // $cl2 = $('.cl2');
        // $cl1.on('click',function(){
        //     $cl2.css('display','block');
        //     $(this).css('display','none');
        //     $form.css('display','none');
        //     $tog.css('display','block');
        // });
        // $cl2.on('click',function(){
        //     $cl1.css('display','block');
        //     $(this).css('display','none');
        //     $form.css('display','block');
        //     $tog.css('display','none');
        // })
        $('#footer').load('../index.html #footer .commonlink');
        $('#regLoginTop').load('./reg.html #regLoginTop');

        //用户名失焦聚焦error消失出现
        // $username = $('#username');
        // $error = $('.error');
        // $username.on('focus',function(){
        //     $error.text('');
        // }).on('blur',function(){
        //     if($username.val() === ''){
        //         $error.text('请输入邮箱/手机号');
        //     }
        // }).on('change',function(){
        //     var val = $.trim($(this).val());
        //     var res = usernameVertify(val);
        //     if(res === true){
        //         $error.text('');
        //     }else{
        //         $error.text(res);
        //     }
        // });
        // //验证是否为邮箱或者手机号(现在不开放用户名注册只开放手机注册)
        // function usernameVertify(val){
        //     var reg1 = /^1[34578]\d{9}$/;
        //     var res2 =  /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
        //     if(reg1.test(val) || res2.test(val)){
        //         return true;
        //     }else{
        //         return '请输入邮箱/手机号';
        //     }
        // }
        // $login = $('#login');
        // var $pas = $('#pas');
        // $login.on('click',function(){
        //     var val = $.trim($username.val());
        //     var pas = $pas.val();
        //     if(usernameVertify(val) && pas != '' && val != ''){
        //         $.ajax({
        //             data:{'username':val,'pas':pas},
        //             type:'GET',
        //             async:'true',
        //             url:'../api/login.php',
        //             success:function(res){
        //                 console.log(res);
        //                 if(res === 'fail'){
        //                     $div = $('<div/>');
        //                     $div.html('用户名或密码错误').addClass('fixcenter').appendTo($('body'));
        //                     setTimeout(function(){
        //                         $('.fixcenter').animate({'opacity':0},function(){
        //                             $(this).remove();
        //                         })
        //                     },600)
        //                 }else if(res === 'ok'){
        //                     //点了记住密码的效果
        //                     console.log($('.rem').prop('checked'));
        //                     // console.log();
        //                     if($('.rem').prop('checked')){
        //                         //七天免登录
        //                         var now = new Date();
        //                         now.setDate(now.getDate()+7);
        //                         Cookie.set('username',val,now,'/');
        //                     }
        //                     //登录成功当前页面的效果
        //                     $div = $('<div/>');
        //                     $div.html('登录成功').addClass('fixcenter').appendTo($('body'));
        //                     setTimeout(function(){
        //                         $('.fixcenter').animate({'opacity':0},function(){
        //                             $(this).remove();
        //                             window.location.href = "/index.html";
        //                         })
        //                     },1600)
        //                 }
        //             }
        //         })
        //     }
            
        // });


    });
})