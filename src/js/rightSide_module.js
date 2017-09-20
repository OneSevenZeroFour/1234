
//首页侧边栏
;define(['jquery','cookie'],function($){
        $hovd = $('#right-guide .fix .hovd');
        // $fixl = $('#right-guide .fix span');
        // console.log($fixl);
        // console.log(io);
        $hovd.on('mouseenter',function(){
            // console.log($(this));
            $(this).children('span').stop().animate({'width':115});

            // console.log($(this).children('.fixl'));
            // $(this).stop().animate({'width':100}).siblings('li').css('width',50);
           
        }).on('mouseleave',function(){
            // console.log($(this));
            $(this).children('span').stop().animate({'width':51});
        });
        $('.oh,.th,.sh,.qh,.zh').on('click',function(){
            $('.fix').stop().animate({'right':330});
        });
        $('.btnclose').click(function(){
            $('.fix').stop().animate({'right':0});
        });
        //搜索框失焦
        var $search = $('.search');
        $search.on('blur',function(){
            $(this).attr('placeholder','茵曼');
        });
        //获取cookie里的数量,初始化头部和侧边栏购物车数量
        headerRightNum();
        function headerRightNum(){
            var cartlist = Cookie.get('cartlist');
            var cartNum = 0;
            if(cartlist != ''){
                cartlist = JSON.parse(cartlist);
                cartlist.forEach(function(item){
                   cartNum += item.qty;  
                })
                $('.qty').text(cartNum);
                $('.cart-num').text(cartNum);
            }
        }
        //回到顶部
        $('.totop').on('click',function(){
            var scrollTop = $(window).scrollTop();
            var second = parseInt(10000/scrollTop)*500;
            //100
            // 1000更快 2000慢
            // console.log(second,scrollTop);
            $('html,body').stop().animate({'scrollTop':0},second);
        });
        // $loginlist = $('.loginlist');
        // var username = Cookie.get('username');
        // if(username != ''){
        //     $loginlist.html('<p class="geren">个人中心</p>');
        // }
        
       
        
        
});