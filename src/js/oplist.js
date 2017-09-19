require(['config'],function(){
    require(['jquery','cookie'],function($){
        ;(function($){
       $('#op-header').load('../index.html #header');
       $('#op-footer').load('../index.html #footer');
        $('#op-right-guide').load('../index.html #right-guide');
        require(['headerHover_module'],function(){
            $('.search').on('blur',function(){
                $(this).attr('placeholder','茵曼');
            });
        });
        //重新搜索失焦聚焦事件
        var $input = $('#reSearch input')

        $input.on('blur',function(){
            $(this).val('请输入商品名称...');
        }).on('focus',function(){
            $(this).val('');
        });
        //获取页数
        $totalGood = $('.totalGood');
        $totalPage = $('.totalPage');
        $currenpage = $('.currenpage');
        $goto1 = $('.goto1');
        $goto2 = $('.goto2');
        $insert = $('.insert');
        var pageNo = $currenpage.text()*1;
        var qty = 16;
        var aObj = new ajaxObj(pageNo,qty);
        function ajaxObj(pageNo,qty){
            this.pageNo = pageNo;
            this.qty = qty;
            this.order = '';
        }
        ajaxObj.prototype.ajax = function(){
            $.ajax({
                    url:'../api/list.php',
                    data:{'pageNo':this.pageNo,'qty':this.qty,'order':this.order},
                    type:'get',
                    async:true,
                    success:function(res){
                        // console.log(res);
                        var result = JSON.parse(res);
                        var goodsdata = result.data;
                        var count = result.count;
                        $ul = $('<ul/>');
                        $totalGood.text(result.total);
                        $currenpage.text(result.pageNo);
                        $totalPage.text(Math.ceil(result.total/result.qty));
                        $ul.html(
                            goodsdata.map(function(item){
                                var urlarr = item.imgurl.split(',');
                                var str = '';
                                var prevNext = '';
                                urlarr.map(function(it){
                                    str += `<img src="../${it}"/ class="imgs">`;
                                });
                                var len = urlarr.length;
                                var str1;
                                if(len > 4){
                                    var boxmovewidth = len*35 + (len+1)*8;
                                    prevNext = `<span class="prev"></span>
                                                <span class="next"></span>`;
                                    str1 = `style="width:${boxmovewidth}px"`;
                                }
                                
                                return `<li data-id="${item.id}">
                                            <a href="../html/detail.html" class="imgboxs">
                                                <div class="imgbox">
                                                    <img src="../${urlarr[0]}" class="imgs"/>
                                                </div>
                                            </a>

                                            <div class="animateimg">
                                                ${prevNext}
                                                <div class="boxmove">
                                                    <div class="boximgs clear" ${str1}>
                                                        ${str}
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                            <div class="clear prsa" >
                                                <span class="pr">${item.price}</span>
                                                <del class="sa">${item.our_price}</del>
                                            </div>
                                            <a href="" class="name"><span class="ziyin"></span>[支持自提]<p class="real">${item.name}</p></a>

                                        </li>`
                            }).join(''));
                        $insert.text('');
                        $insert.append($ul);
                        // console.log($('.animateimg'));
                    }
            });
        }

        //初始化默认为第一页
        aObj.ajax();
        //点击排序后
        $priceOrder = $('.priceOrder');
        var f = 1;
        $priceOrder.on('click',function(){
            $(this).addClass('shenjiang');
            f++;
            if(f%2===0){
                aObj.order = 'shen';
                $(this).children('i').removeClass().addClass('shang');
            }else{
                aObj.order = 'jiang';
                $(this).children('i').removeClass().addClass('xia');
            }
            aObj.ajax();
            // console.log(123);
        })
        //下一页
        $goto2.on('click',function(){
            var tpage = $totalPage.text()*1;
            // console.log(tpage);
            aObj.pageNo += 1;
            if(aObj.pageNo >= 2){
                $goto1.addClass('bianse');
            }
            // console.log(aObj.pageNo);
            if(aObj.pageNo >= tpage){
                aObj.pageNo = tpage;
                $goto2.addClass('bianse2');
            }
            aObj.ajax();
            // console.log(aObj);

        });
        //上一页
        $goto1.on('click',function(){
            var tpage = $totalPage.text()*1;
            aObj.pageNo -= 1;
            // console.log(aObj.pageNo);
            if(aObj.pageNo <= 1 ){
                aObj.pageNo = 1;
                $goto1.removeClass('bianse');
                // console.log(12);
            }else if(aObj.pageNo >1 && aObj.pageNo < tpage){
                $goto2.removeClass('bianse2');
            }
            aObj.ajax();
        });
        var idx = 0;
        // var history = [];
        $currentli = $('.insert ul li');
        $insert.on('click','li',function(){
            //cookie存入当前点击商品的id给详情页
            var id = $(this).attr('data-id');
            Cookie.set('goodsid',id,null,'');

            //先获取历史记录(history)cookie没有直接push
            var pr_ = $(this).find('.pr').html()*1;
            var na_ = $(this).find('.real').html();
            var sa_ = $(this).find('.sa').html()*1;
            var imgurl_ = $(this).find('.imgbox').children('img').prop('src');
            // console.log(imgurl_);
           var historyO = {
                    'id':id,
                    'name':na_,
                    'price':pr_,
                    'save':sa_,
                    'imgurl':imgurl_
                };

            var history = Cookie.get('history');
            if(history === ''){
                history = [];
                history.push(historyO);
            }else{
                history = JSON.parse(history);
                var lens = history.length;
                for(var i=0; i<lens; i++){
                    if(history[i].id === id){
                        //如果history中有这个商品那么这个商品和第一个商品换位置;
                        var temp;
                        temp = history[i];
                        history[i] = history[0];
                        history[0] = temp;
                        break;
                    }
                }
                if(i===lens)history.unshift(historyO);
            }

            Cookie.set('history',JSON.stringify(history),null,'/');
            
        }).on('mouseover','.imgs',function(){
            // console.log($(this));
            var $imgbox = $(this).closest('li').find('.imgbox');
            $imgbox.html('');
            $(this).clone().appendTo($imgbox);
            // console.log(.html);
        }).on('click','.prev,.next',function(){
            var $li =$(this).closest('li');
            var $boximgs = $li.find('.boximgs');
            var len = $boximgs.children('.imgs').length;
            console.log(len);
            if($(this).hasClass('prev')){
                $li.find('.next').css({'background-position':'-17px -46px','cursor':'pointer'});
                idx++;
            }else if($(this).hasClass('next')){
                idx--;
                $li.find('.prev').css({'background-position':'0px -46px','cursor':'pointer'});
            }
            if( idx >= len-4){
                idx = len-4;
                $li.find('.prev').css({'background-position':'-34px -46px','cursor':'default'});
            }
            if(idx <= 0){ 
                idx = 0;
                $li.find('.next').css({'background-position':'-51px -46px','cursor':'default'});
            }
            $boximgs.stop().animate({left:-idx*43});

        });
       
       
        require(['rightSide_module']);
        })(jQuery);
    });
});