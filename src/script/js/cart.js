define(['jquery'], function ($) {
    require(['secondnav'], function (sec) {
        return {

            basin: !function () {
                $('.topcontent').load('header.html');
                $('.footercontent').load('footer.html');

            }(),
            buynum: !function () {
                // $value=1;
                $('.u-setcount input').val(1);
                var $value = $('.u-setcount input').val();
                $('.u-setcount input').on('input', function () {
                    var $reg = /^\d+$/g; //只能输入数字
                    $value = parseInt($(this).val());
                    if ($reg.test($value)) {
                        if ($value >= 99) {//限定范围
                            // $(this).val(99);
                            $value = 99;
                            $(this).val($value);
                        } else if ($value <= 0) {
                            // $(this).val(1);
                            $value = 1;
                            $(this).val($value);
                        } else {
                            $(this).val($value);
                        }
                    }
                });
                $('.minus').on('click', function () { $value--; $('.u-setcount input').val($value); });
                $('.plus').on('click', function () { $value++; $('.u-setcount input').val($value); });


            }(),
            cartli:!function(){
                function addcookie(key, value, day) {
                    var date = new Date(); //创建日期对象
                    date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
                    document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
                };

                //得到cookie
                function getcookie(key) {
                    var str = decodeURI(document.cookie);
                    var arr = str.split('; ');
                    for (var i = 0; i < arr.length; i++) {
                        var arr1 = arr[i].split('=');
                        if (arr1[0] == key) {
                            return arr1[1];
                        }
                    }
                };

                //删除cookie
                function delcookie(key) {
                    addcookie(key, '', -1); //添加的函数,将时间设置为过去时间
                };

                //1.获取cookie，根据cookie的值，创建购物车商品列表
                //商品列表的结构提前写好，隐藏在结构中
                //对隐藏的结构进行不同赋值。


                if (getcookie('cartsid') && getcookie('cartnum')) {
                    // alert(1111);
                    var s = getcookie('cartsid').split(','); //存放sid数组
                    var n = getcookie('cartnum').split(','); //存放num数组
                    // alert(s);
                    $.each(s, function(index, value) {
                        createcart(value, n[index]);
                        // alert(value);
                        // alert(n[index]);
                    });
                }


                // //2.拼接商品列表
                function createcart(sid, num) { //sid：图片的编号  num:商品的数量
                    $.ajax({
                        url: 'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/picdata.php',
                        dataType: 'json'
                    }).done(function(data) {
                        // alert(11);
                        $.each(data, function(index, value) {
                            if (sid == data[index].sid) { //图片的sid和数据里面的sid匹配
                                var $clone = $('.gooditm:hidden').clone(true); //对隐藏的模块进行克隆
                                // alert($clone.find('div').size());
                                //都是赋值
                                $clone.find('.imgwrap').find('img').attr('src', data[index].url.split(',')[0]);
                                $clone.find('.imgwrap').find('img').attr('sid', data[index].sid);
                                $clone.find('.goodtlt').find('a').html(data[index].title);
                                $clone.find('.col3').find('.newprice').html(data[index].price);
                                $clone.find('.u-setcount').find('input').val(num);
                                //计算价格,每个商品的价格
                                var $dj1 = parseFloat($clone.find('.newprice').html()); //获取单价
                                $clone.find('.col5 span').html(($dj1 * num).toFixed(2)); //num：数量
                                $clone.css('display', 'block'); //克隆的模块是隐藏，显示出来。
                                $('.m-goods').append($clone); //追加
                                // alert(data[index].sid);
                                /* kong();//购物车是否为空
                                totalprice();//总价和总数*/
                            }
                        });
                    });//5.每个商品的总价已经通过创建时求得了。求所有商品的总价和总的商品的个数
                    
                   /*  function totalprice() {//计算总价
                        var total = 0;//总的价格
                        var countnum = 0;//总的数量
                        $('.gooditm:visible').each(function() {//可视的商品列表进行遍历，循环叠加
                            if ($(this).find('input:checkbox').is(':checked')) {//商品的复选框是选中的
                                total += parseFloat($(this).find('.newprice').html());
                                countnum += parseInt($(this).find('.u-setcount').find('input').val());
                            }
                        });
                        //赋值
                        $('.allgoods span').html('￥' + total.toFixed(2));
                        $('.allgoods em').html(countnum);
                    } */


                }
            }(),

        }
    });
});