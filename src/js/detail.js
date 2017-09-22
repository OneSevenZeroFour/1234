require(['config'],function(){
    require(['jquery','cookie'],function($){
        ;(function($){
           $('#de-header').load('../index.html #header');
           $('#de-footer').load('../index.html #footer');
           $('#de-right-guide').load('../index.html #right-guide');
           $('#goodsdiv .de-leftgood').load('../html/oplist.html .leftgood');
           require(['headerHover_module']);
           var id = Cookie.get('goodsid');
           //console.log(id);
           //获取元素
           
           $gdbox = $('#detail .gdimg');
           $ib = $('#detail .ib');
           $zoom = $('#detail .zoom');
           $bigbox = $('#detail .gdimg');
           $gdimg = $('#detail .gdimg img');
           $na = $('#detail .na');
           $pr = $('#detail .pr');
           $sa = $('#detail .sa');
           $sy = $('#detail .sy');
           $leftani = $('#detail .leftani');
          $introimg = $('#goodsdiv .introimg');
            //创建一个a对象
           function aObj(id,shopqty){
                this.id = id;
                this.qty = shopqty;
                this.gdbox = $gdbox;
                this.leftani = $leftani;
           }
           //拿到cookie中的id向数据库请求数据
           aObj.prototype.a = function(){
                $.ajax({
                    url:'../api/detail.php',
                    async:true,
                    data:{'goodsid':id},
                    type:'GET',
                    success:function(res){
                        var reg = JSON.parse(res);
                        // console.log(res);
                        // console.log(reg.data[0]);
                        var data = reg.data[0];
                        $na.text(data.name);
                        $pr.text(data.price);
                        $sa.text(data.our_price);
                        $sy.text(data.qty);
                        var urlarr = data.imgurl.split(',');
                        var str = '';
                        urlarr.map(function(it){
                            str += `<img src="../${it}" class="imgs" />`;
                        });
                        $introimg.html('');
                        $introimg.html(str);
                        $gdbox.html('');
                        $gdbox.html(`<img src="../${urlarr[0]}">`);
                        $leftani.html('');
                        $leftani.html(str);
                        $gdbox.children('img').eq(0).css('display','block').siblings('img').css('display','none');
                        // console.log($gdbox.children('img'));
                        
                    }
               });
                return this;
           }
           aObj.prototype.tab = function(){
                $leftani.on('mouseover','img',function(){
                    $(this).closest('#detail').find('.gdimg').html('');
                    $(this).clone().appendTo($bigbox);
                    // console.log($(this).index(),$gdbox);
                });
                return this;
           }
           //一波放大镜
           aObj.prototype.zoom = function(){
                // console.log($gdbox);
                $gdbox.on('mouseenter',function(){
                    // console.log(this);
                  // console.log($(this));
                    var $thisimg = $(this).children('img');
                    // console.log($thisimg);
                    $ib.html('').css('display','block');
                    $thisimg.clone().appendTo($ib);
                        var $img = $ib.children('img');
                        // console.log($img.width());
                    // this.ratio = 100;
                        // 
                    $gdbox.ratio = $img.width()/400;
                    // console.log(this);
                    $gdbox.zoomWidth = 400/$gdbox.ratio;
                    $gdbox.zoomHeight = 400/$gdbox.ratio;
                    // console.log($gdbox.zoomWidth,$gdbox.zoomHeight);
                    $zoom = $('<div/>');
                    // $bigbox.find('zoom').remove();
                    $zoom.appendTo($bigbox);
                    $zoom.addClass('zoom').css({'display':'block','width':$gdbox.zoomWidth,'height':$gdbox.zoomHeight});
                    // console.log(zoomHeight,zoomWidth);
               }).on('mouseleave',function(){
                    $ib.css('display','none');
                    $('.zoom').remove();

                    // console.log(this.radio);
                    // console.log($bigbox);

               }).on('mousemove',function(e){
                    // console.log($gdbox.prop('offsetLeft'));
                    var scrollTop = $(window).scrollTop();
                    var scrollLeft = $(window).scrollLeft();
                    // console.log($(window).scrollTop());
                    // console.log($gdbox.zoomWidth);
                    var left = e.clientX - $gdbox.zoomWidth/2 - $gdbox.offset().left + scrollLeft;
                    var top = e.clientY - $gdbox.zoomHeight/2 - $gdbox.offset().top + scrollTop;
                    // console.log(e.clientY,this.zoomHeight,$gdbox.offset().top);
                     if(left<0){
                        left = 0;
                    }else if(left > 400 - $gdbox.zoomWidth){
                        left = 400 - $gdbox.zoomWidth;
                    }
                    // console.log(top);
                    if(top<0){
                        top = 0;
                    }else if(top > 400 - $gdbox.zoomHeight){
                        top = 400 - $gdbox.zoomHeight;
                    }
                    $('.zoom').css({'left':left,'top':top});
                    $ib.children('img').css({'left':-left*$gdbox.ratio,'top':-top*$gdbox.ratio});
               });
               return this;
           }
           new aObj(id,1).a().tab().zoom();
           //加减数量加入购物车
           //获取加减,button,input中的值
           $jia = $('#detail .jia');
           $jian = $('#detail .jian');
           $add = $('#detail .add');
           $inputval = $('#inputval');
           $inputval.val(1);
           //加减绑定事件
           $jia.on('click',function(){
                var i = $inputval.val();
                i++;
                $inputval.val(i);
                var b = $sy.text()*1;
                if($inputval.val() >= b){
                    $inputval.val(b);
                }
           });
           $jian.on('click',function(){
                var i = $inputval.val();
                i--;
                $inputval.val(i);
                if($inputval.val() <= 1){
                    $inputval.val(1);
                }
           });
           //input失焦后不能小于1,也不能为非数字
           $inputval.change(function(){
                var i = $(this).val()*1;
                if(i <= 1 || isNaN(i) || i===''){
                    $(this).val(1);
                }
                var b = $sy.text()*1;
                if(i >= b){
                    $(this).val(b);
                }
           });
           var list = [];
           //先获取当前的cartlist cookie
           // console.log(JSON.parse(cartlist));
           
           $add.click(function(){
                //购物车cookie的读取以及更新
                var cartlist = Cookie.get('cartlist');
                var val = $inputval.val()*1;
                var obj = {'id':id,'qty':val,'select':true};
                // console.log(cartlist,obj);
                if(cartlist === ''){
                    list.push(obj);
                    Cookie.set('cartlist',JSON.stringify(list),null,'/')
                    return;
                }
                cartlist = JSON.parse(cartlist);
                list = cartlist;
                var len=cartlist.length;
                for(var i=0; i<len; i++){
                    if(cartlist[i].id === id){
                        cartlist[i].qty = cartlist[i].qty + val;
                        break;
                    }

                }
                if(i===len){
                    list.push(obj);
                }
                var now = new Date();
                now.setDate(now.getDate()+8);
                Cookie.set('cartlist',JSON.stringify(list),now,'/');
                //加入购物车动画
                //
                $addani = $('<div/>');
                $('.rightside').append($addani);
                $bigbox.children('img').eq(0).clone().appendTo($addani);
                var top = $(window).scrollTop();
                var left = $(window).scrollLeft();
                $addani.addClass('addani').children('img').animate({'left':250+left,'top':-390+top},'fast',function(){
                    // $addani.children('img').remove();
                    $(this).animate({'left':270+left,'top':-350+top},'fast',()=>{
                        $addani.remove();
                        var cartNum = 0;
                        cartlist.forEach(function(item){
                          cartNum += item.qty;
                        })
                        // console.log(cartNum);
                        $('.cart-num').text(cartNum);
                        $('.qty').text(cartNum);
                    });
                });

           });
          
          //商品介绍和售后服务的吸顶
          $before = $('.before');
          $(window).on('scroll',function(){
            var scrollTop = $(this).scrollTop();//850
              // console.log(scrollTop);
              if(scrollTop>=780){
                $before.addClass('beforefixed')
              }else{
                $before.removeClass('beforefixed');
              }
          })
          // $before.children('a').removeClass('aclick');
          // 商品介绍和售后服务的tab切换
          $before.on('click','a',function(){
              // console.log($(this));
              if($(this).hasClass('aclick')){
                $(this).removeClass('aclick');
              }else{
                $(this).addClass('aclick').siblings('a').removeClass('aclick');
              }
              if($(this).hasClass('service')){
                $('.shouhou').css('display','block');
                $('.rightde').css('display','none');
              }else{
                $('.rightde').css('display','block');
                $('.shouhou').css('display','none');
              }
          });
          //历史记录生成数据
          $history = $('.historyList'); 
          var historyList = Cookie.get('history');
          if(historyList != ''){
            historyList = JSON.parse(historyList);
            // console.log(historyList);
            $history.html(
                historyList.map(function(item){
                  return `<li>
                            <img src="${item.imgurl}" />
                            <p class="pr">${item.price}</p>
                            <del class="sa">${item.save}</del>
                            <p class="name">${item.name}</p>
                          </li>`
                })
              );
          }
          //历史记录左右滑动(往左边滑动两个li),滑动后删除前两个li补在最后
          $('#tabHistory').on('click','.pre1,.nex1',function(){
                var len  = $history.children('li').length;
                if(len <= 5)return;


              if($(this).hasClass('pre1')){
                  $history.stop().animate({'left':-420},function(){
                    $history.css('left',0).children('li').eq(0).remove().clone().appendTo($history);
                    $history.children('li').eq(0).remove().clone().appendTo($history);
                  });
              }
              if($(this).hasClass('nex1')){
                    $history.css('left',-420);
                    $history.children('li').eq(len-1).clone().prependTo($history);
                    $history.children('li').eq(len).remove();
                    $history.children('li').eq(len-1).clone().prependTo($history);
                    $history.children('li').eq(len).remove();
                setTimeout(function(){
                    $history.stop().animate({'left':0},function(){
                      $history.css('left',0);
                  });
                },100);
                

              }
            // console.log($(this));
          });

          $.ajax({
            type:'POST',
            url:"http://localhost:4321/html",
            data:'id='+id,
            success:function(data){
                var list = JSON.parse(data);
                //console.log(list[0].html);
                $('#introduce').html(list[0].html);
            }
          })
          //引入右边菜单模块
          require(['rightSide_module']);
            
        })(jQuery);
    });
})