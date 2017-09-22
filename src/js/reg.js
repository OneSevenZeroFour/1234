require(['config'],function(){
    require(['jquery'],function($){
        console.log('chenggong');
        //每个输入框聚焦后出现的提示
        $cellphone = $('#cellphone');
        $pas = $('#password');
        $frim = $('#firmPas');
        $vcode = $('.vcode');
        $cellphone.on('focus',function(){
            $('.tip1').text('请输入注册的手机号').css('color','#000');
        }).on('blur',function(){
            if($(this).val() === ''){
                $('.tip1').text('');
            }
        });
        $pas.on('focus',function(){
            $('.tip2').text('6-20位字符,可使用字母、数字的组合').css('color','#000');
        }).on('blur',function(){
            if($(this).val() === ''){
                $('.tip2').text('');
            }
        });
        $frim.on('focus',function(){
            $('.tip3').text('请再次输入密码').css('color','#000');
        }).on('blur',function(){
            if($frim.val() === ''){
                $('.tip3').text('');
            }
            
        });
        $vcode.on('focus',function(){
            $('.tip4').text('输入验证码').css('color','#000');;
        }).on('blur',function(){
            if($(this).val() === ''){
                $('.tip4').text('请输入验证码').css('color','#f34');
            }
        });
        //验证码生成
        var $ranCode = $('.ranCode');
        function setCode(){
            var str = '1234567890abcdefghijklmnopqrstuvwxyz';
            var len = str.length;
            var res = '';
            var boo;
            for(var i=0; i<4; i++){
                res += str.charAt(parseInt(Math.random()*len));
            }
            return res;
        }
        $ranCode.html(setCode);
        $ranCode.click(function(){
            var res = setCode();
            $(this).html(res);
        });
        $cellphone.on('change',function(){
            var phone = $(this).val();
            var res = phoneVertify(phone);
            if( res === true){
                $('.tip1').html('');
                return;     
            }else if(res === ''){
                $('.tip1').html('').css('color','#000');
            }else{
                $('.tip1').html(res).css('color','#f34');
                console.log($('.tip1'));
            }
            // console.log(phoneVertify(phone));
            //发起ajax请求看数据库是否存在该手机号

        });
        function phoneVertify(phone){
            var reg = /^1[34578]\d{4,50}$/;
            var len = phone.length;
            if(len === 0 ) return;
            if(len < 4 || len > 50){
                return '用户名长度只能在4-50位字符之间';
            }else if(reg.test(phone*1)){
                return true;
            }else{
                return '帐号暂时只开放手机号码注册';
            }
        }
        $pas.on('change',function(){
            var pas = $pas.val();
            var res = pasVertify(pas);
            // console.log(res);
            if( res === true){
                $('.tip2').html('');
                return;     
            }else if(res === ''){
                $('.tip2').html('');
            }else{
                $('.tip2').html(res).css('color','#f34');
                console.log($('.tip2'));
            }
        });
        $frim.on('change',function(){
            var pas = $pas.val();
            var com = $frim.val();
            var res = frim(pas,com);
            if(res === true){
                $('.tip3').html('两次输入的密码一致').css('color','#000');
            }else if(res === ''){
                $('.tip3').html('');
            }else{
                $('.tip3').html(res).css('color','#f34');

            }
        });
        function pasVertify(pas){
            var reg = /^[\d\w]{6,20}$/i;
            var shuzi = /^\d{6,10}$/;
            var zimu = /^[a-z]{6,10}$/i;
            var len = pas.length;
            if(pas === 0) return;
            if(len < 6 || len >20){
                return '密码长度只能在6-20位字符之间';
            }else if(shuzi.test(pas)||zimu.test(pas)){
                return '该密码比较简单，有被盗风险';
            }else if(reg.test(pas)){
                return true;
            }
        }
        function frim(pas,com){
            if(pas === com){
                return true;
            }else{
                return '两次输入密码不一致';
            }
        }
        $vcode.on('change',function(){
            var res = vcodeVertify($vcode.val(),$ranCode.html());
            // console.log(res === true);   
            if(res === true){
                $('.tip4').text('');
            }else{
                $('.tip4').text(res).css('color','#f34');
            }
        });
        function vcodeVertify(vcode,ranCode){
            if(vcode != ranCode){
                // $('.tip4').text('');
                return '验证码不正确';
            }else{
                return true;
            }
        }
        $regs = $('#reg');
        $check = $('#check');
        $regs.on('click',function(){
            var vode = $vcode.val();
            var ranCode = $ranCode.html();
            var pas = $pas.val();
            var com = $frim.val();
            var phone = $cellphone.val();
            var check = $check.prop('checked');
            // location.href = 'http://localhost:2008/html/reg.html?#';
            if( vcodeVertify(vode,ranCode) === true && frim(pas,com) === true && phoneVertify(phone) && pasVertify(pas) && check){
                    console.log('yes',phone,pas);
                    $.ajax({
                        data:{'username':$.trim(phone),'password':$.trim(pas)},
                        type:'GET',
                        async:'true',
                        url:'../api/reg.php',
                        success:function(res){
                            console.log(res);
                            if(res === 'fail'){
                                $('.tip1').html('该手机号已经注册了').css('color','#f34');
                            }
                        }

                    });
            }
            // $.ajax({
            //     data:{}
            // });
        });

        $('#footer').load('../index.html #footer .commonlink');
    });
})