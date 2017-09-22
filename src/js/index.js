require(['config'],function(){
    require(['jquery'],function($){
        // console.log('chenggong');
        ;(function($){
        //侧边栏加载登录页面
        $('.loginlist').load('html/login.html .loginlist .tog,.climg,form');
        //头部hover效果
        require(['headerHover_module']);
        $img = $('.container img');
        $span = $('.num span');
        //轮播图
        var idx = 0;
        var lastIdx = idx + 1;
        $span.eq(idx).addClass('shadow');
        setInterval(function(){
            // lastIdx = idx+1;
            idx++;
            show();
        },5500);
        //封装函数
        function show(){
            if(idx > 1){
                idx = 0;
            }else if(idx < 0){
                idx = 1;
            }
            // console.log(idx,lastIdx);
// 
            $img.eq(idx-1).stop().animate({'opacity':0});
            $img.eq(lastIdx).stop().animate({'opacity':1});
            $span.eq(lastIdx).addClass('shadow').siblings('span').removeClass('shadow');
            lastIdx = idx-1;
        }
        function buttonlr(idx){
            $img.eq(idx).stop().animate({'opacity':1}).siblings('img').stop().animate({'opacity':0});
            $span.eq(idx).addClass('shadow').siblings('span').removeClass('shadow');
        }
        //轮播图1,2按钮
        $span.on('click',function(){
            var thisidx = $(this).index();
            buttonlr(thisidx);

        });
        //轮播图左右效果
        $lr = $('.lr div');
        $lr.eq(0).on('click',function(){
            idx--;
            show();
        });
        $lr.eq(1).on('click',function(){
            idx++;
            show();
        });
        //右侧栏动画效果
        require(['rightSide_module']);
        // 分类hover效果
        // $catehover = $('.cathover');
        // $catelist = $('.catelist');
        // $catehover.on('mouseover',function(){
        //     $catelist.css('display','block');
        // }).on('mouseleave',function(){
        //     $catelist.css('display','none');
        // });
        // 
        //分类Tab切换效果
        $li = $('.rightside li');
        $ul = $('.leftside ul');
        $li.on('mouseover',function(){
            var idx = $(this).index();
            $ul.eq(idx).css('display','block').siblings('ul').css('display','none');
        });
        

        require(['rightSideLogin_module']);

        
        
        

        })(jQuery);
    });
});

