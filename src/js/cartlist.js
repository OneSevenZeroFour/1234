require(['config'],function(){
    require(['jquery','cookie'],function($){
        ;(function($){
      // console.log(123);
        $('#header').load('../index.html #header .headerTop');
        $('.cartfoot').load('../index.html #footer');
        //头部hover效果
       require(['headerHover_module'],function(){
        //搜索框失焦
          $('.search').on('blur',function(){
              $(this).attr('placeholder','耐克');
          });
      });
        //读取cookie
        
        var cartlist = Cookie.get('cartlist');
        // console.log(cartlist);
        $hasGoods = $('.hasGoods');
        $zero = $('.zero');
        function a(id,qty){
            this.id = id;
            this.qty = qty;
        }
        $da14 = $('.da14');
        var total = 0;
        var totalSave = 0;
        var sz = 0;
        $allcheck = $('#allcheck').prop("checked",true);
        $total = $('.total');
        $save = $('.save');
        $lastTotal = $('.lastTotal');
        //找到id生成并生成数据
        a.prototype.aj = function(){
          // console.log(this.id,this.qty);
          $.ajax({
              data:{'goodsid':this.id},
              url:'../api/detail.php',
              type:'GET',
              async:'true',
              success:(res)=>{
                  data = JSON.parse(res).data[0];
                  var imgurl1 = data.imgurl.split(',')[0];
                  // return data;
                  // console.log(data);
                  price = Number(data.price);
                  ourPrice = Number(data.our_price);
                  save = ourPrice-price;
                  // console.log(price);
                  total += price*this.qty;
                  totalSave += save*this.qty;
                  sz += ourPrice*this.qty;
                  $li = $('<li/>');
                  $li.attr('data-id',this.id);
                  $li.html(`
                      <p class="one">
                        <input type="checkbox" class="goodcheck" checked="${data.select}">
                      </p>
                      
                      <p class="two">
                        <img src="../${imgurl1}">
                          <span class="ziyin"></span>
                          <span class="na">${data.name}</span>
                      </p>
                      <p class="three">${ourPrice.toFixed(2)}</p>
                      <div class="four">
                          <span class="jian">-</span>
                          <input type="text" value=${this.qty} class="numVal">
                          <span class="jia">+</span>
                      </div>
                      <p class="save">${save.toFixed(2)}</p>
                      <p class="xiaoji">${(price*this.qty).toFixed(2)}</p>
                      <p class="yiru">
                        <a>移入收藏夹</a>
                        <a class="del">删除</a>
                      </p>`
                      
                      ).appendTo($ullist);
                    $da14.text(total.toFixed(2));
                    $total.text(sz.toFixed(2));
                    $save.text(totalSave.toFixed(2));
                    $lastTotal.text(total.toFixed(2));
                    // 

              },
              complete:function(){
                $('.loading').css('display','none');
              }

          });
          return this;
        }
        console.log(cartlist==='[]');
        if(cartlist === '' || cartlist === '[]'){
          $hasGoods.css('display','none');
        }else if(cartlist != ''){
          $zero.css('display','none');
          cartlist = JSON.parse(cartlist);
          
          $ullist = $('.ullist');
          cartlist.forEach(function(item){
            // console.log(item.qty);
              new a(item.id,item.qty).aj();
          });
              //全选的总计功能
            $ullist.on('change','.goodcheck',function(){
              var $checkbox = $ullist.find(':checkbox');
              var len = $checkbox.length;
              var checkedlen = $checkbox.filter(':checked').length;
              if(len === checkedlen){
                $allcheck.prop('checked',true);
              }
              calAll();
              if(!$(this).prop('checked')){
                $allcheck.prop('checked',false);
              }
            });
            $allcheck.on('change',function(){
              if($(this).prop('checked')){
                $ullist.find(':checkbox').prop('checked',true);
               
              }else{
                $ullist.find(':checkbox').prop('checked',false);
              }
              calAll();

            });
            //加减运算
            $ullist.on('click','.jia,.jian,.del' ,function(){
              var $li = $(this).closest('li');
              var $inputval = $li.find('.numVal');
              // var $sssave = $li.find('.save');
              // var $xj = $li.find('.xiaoji');
              // var $check = $li.find('.goodcheck');
              // var $danjia = $li.find('.three');
              var i = $inputval.val();
              var del;
              if($(this).hasClass('jia')){
                i++;  
              }else if($(this).hasClass('jian')){
                i--;
              }else if($(this).hasClass('del')){
                del = true;
                $li.remove();
              }
              if(i<1){i=1;}
              $inputval.val(i);
              // var xjprice = Number(i*($danjia.html()-$sssave.html())).toFixed(2);
              // $xj.html(xjprice);
              // var id = $li.attr('data-id');
              // setCookie(id,i,del);
              xjPrice($(this),del,i);
              calAll();

            }).on('click',function(){
                if ($ullist.children('li').length === 0){
                  $hasGoods.css('display','none');
                  $zero.css('display','block');
                }

            }).on('change','.numVal',function(){
                var i = Number($(this).val());
                console.log(typeof(i)==='number',isNaN(i));
                if(isNaN(i) || i<=1 || i===''){
                  $(this).val(1);
                  xjPrice($(this),false,1);
                  calAll();
                  return;
                  // return;
                  // $(this).val(1);
                  console.log(123);
                }
                // var $li = $(this).closest('li');
                // var id = $li.attr('data-id');
                // var $danjia = $li.find('.three');
                // var $xj = $li.find('.xiaoji');
                // var $sssave = $li.find('.save');
                // var xjprice = Number(i*($danjia.html()-$sssave.html())).toFixed(2);
                // $xj.html(xjprice);
                // setCookie(id,i);
                // console.log(typeof(12));
                xjPrice($(this),false,i);
                calAll();

            });


            $delAll = $('#cartMain .delAll');
            console.log($delAll);
            $delAll.on('click',function(){
                var r = confirm("您确定删除该购物车的明细记录吗？");
                if(!r) return;
                console.log($ullist);
                $ullist.remove();
                setCookie(null,null,null,true);
                $hasGoods.css('display','none');
                $zero.css('display','block');
            });
        }
        //计算小计并且更新cookie
          function xjPrice(lichildren,del,i){
              // var i = lichildren.val()*1;
              var $li = lichildren.closest('li');
              var $danjia = $li.find('.three');
              var $xj = $li.find('.xiaoji');
              var $sssave = $li.find('.save');
              var xjprice = Number(i*($danjia.html()-$sssave.html())).toFixed(2);
              var id = $li.attr('data-id');
              $xj.html(xjprice);
              setCookie(id,i,del);
          }
        //每点一下遍历小计计算总价
          function calAll(){
            
            //多选按钮
            var $input = $('.goodcheck');
            var len = $input.length;
            var tp = 0;
            var sz1 = 0;
            var totalSave1 = 0;
           
            for(var i=0; i<len; i++){
                if($input.eq(i).prop('checked')){

                  var $closestli = $input.eq(i).closest('li');
                  //优惠
                  var savePrice = $closestli.find('.save').html()*1;
                  //数量
                  var inputqty = $closestli.find('.numVal').val()*1;
                  var xjPrice =  $closestli.find('.xiaoji').html()*1;
                  //原价(单价)
                  var danPrice = $closestli.find('.three').html()*1;
                  //小计 = (原价-优惠)*数量
                  // var xjprice = inputqty*(danPrice-savePrice).toFixed(2);
                  // $xjPrice.html(xjprice);
                  tp += xjPrice;
                  sz1 += danPrice*inputqty;
                  totalSave1 += savePrice*inputqty;
                }
            }
              $total.text(sz1.toFixed(2));
              $save.text(totalSave1.toFixed(2));
              $lastTotal.text(tp.toFixed(2));
              $da14.text(tp.toFixed(2));
              // sz = 0;totalSave=0;
              // return tp;
          }

          function setCookie(id,val,del,delall){
            var cartlist = Cookie.get('cartlist');
            if(cartlist === '')return;
            cartlist = JSON.parse(cartlist);
            // console.log(cartlist);
            var len=cartlist.length;
            for(var a=0; a<len; a++){
                if(cartlist[a].id === id){
                    
                    if(del){
                      cartlist.splice(a,1);
                       
                      break;
                    }
                    cartlist[a].qty = val;
                    break;
                }
            }
            if(delall){
              cartlist = [];
            }
            Cookie.set('cartlist',JSON.stringify(cartlist),null,'/');
          }
        })(jQuery);
    });
});