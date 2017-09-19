define(['jquery','cookie'],function($){
    //登录效果
    var username = Cookie.get('username');
    $logdis = $('.logdis');
    $relog = $('.relog');
    console.log(username);
    $loginlist = $('.loginlist');
    $geren = $('.geren');
    if(username != ''){
        $relog.html(`<a style="color:#C81417">已登录</a>`);
        $logdis.html('<a href="#">退出</a>');
        if($loginlist.length != 0 && $geren.length != 0){
            $loginlist.css('display','none');
            $geren.css('display','block');
        }
    }
    $logdis.on('click',function(){
        $relog.html(`<a href="/html/login.html?#">请登录</a>`);
        $logdis.html(`<a href="/html/reg.html?#">免费注册</a>`);
        Cookie.set('username','',null,'/');
    })
    //头部hover效果
    $p = $('.sp');
    $hoverdiv = $('.hoverdiv')
    $hoverdiv.css('display','none');
    $p.on('mouseover',function(){
        clearTimeout($p.timer);
        $hoverdiv.css('display','block');
    });
    $p.on('mouseout',function(){
        $p.timer = setTimeout(function(){
                $hoverdiv.css('display','none');
            },500);
    });
    //搜索框聚焦
    var $search = $('.search');
    $search.on('focus',function(){
        $(this).attr('placeholder','请输入你想寻找的商品名称');
    });
    // 分类hover效果
    
    $catehover = $('.cathover');
    $catelist = $('.catelist');
    $catehover.on('mouseover',function(){
        $catelist.css('display','block');
    }).on('mouseleave',function(){
        $catelist.css('display','none');
    });
    //分类Tab切换效果
    $li = $('.rightside li');
    $ul = $('.leftside ul');
    $li.on('mouseover',function(){
        var idx = $(this).index();
        $ul.eq(idx).css('display','block').siblings('ul').css('display','none');
    });
});