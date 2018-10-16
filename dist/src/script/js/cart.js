define(['jquery'], function ($) {
    require(['secondnav'], function (sec) {
        return {
            basin: !function () {
                $('.topcontent').load('header.html');
                $('.footercontent').load('footer.html');

            }(),

            carli: !function () {
                //添加cookie的函数
                function addCookie(key, value, day) {
                    var date = new Date(); //创建日期对象
                    date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
                    document.cookie = key + "=" + encodeURI(value) + ";expires=" + date; //添加cookie，设置过期时间
                }
                //得到cookie
                function getCookie(key) {
                    var str = decodeURI(document.cookie);
                    var arr = str.split("; ");
                    for (var i = 0; i < arr.length; i++) {
                        var arr1 = arr[i].split("=");
                        if (arr1[0] == key) {
                            return arr1[1];
                        }
                    }
                }
                //删除cookie

                function delCookie(key) {
                    addCookie(key, "", -1); //添加的函数,将时间设置为过去时间
                }

                //获取cookie创建购物车
                if (getCookie('cartsid') && getCookie('cartnum')) {
                    var $s = getCookie('cartsid').split(','); //编号
                    var $n = getCookie('cartnum').split(','); //数量
                    $.each($s, function (index, value) {
                        createcart(value, $n[index]);
                    });

                }

                //2.根据cookie值，创建一个商品列表的函数
                function createcart(sid, num) {
                    //sid：图片的编号  num:商品的数量
                    $.ajax({
                        url: "http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/picdata.php",
                        dataType: "json"
                    }).done(function (data) {
                        console.log(data);
                        $.each(data, function (index, value) {
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
                                totalprice();
                                kong();//购物车是否为空
                                totalprice();//总价和总数
                            }
                        });
                    });
                }
                //4.商品列表(cookie)不存在，购物车为空
                kong();

                function kong() {
                    if (getCookie("cartsid")) {
                        //cookie存在，有商品，购物车不再为空
                        $(".cart-cont").hide();
                    } else {
                        $(".cart-cont").show();
                    }
                }

                //5.每个商品的总价已经通过创建时求得了。求所有商品的总价和总的商品的个数
                function totalprice() {
                    //计算总价
                    var total = 0; //总的价格
                    var countnum = 0; //总的数量
                    $(".gooditm:visible").each(function () {
                        //可视的商品列表进行遍历，循环叠加
                        if (
                            $(this)
                            .find("input:checkbox")
                            .is(":checked")
                            ) {
                                //商品的复选框是选中的
                                total += parseFloat(
                                    $(this)
                                    .find(".col5")
                                    .find(".sumrow")
                                    .html()
                                    );
                                   
                            countnum += parseInt(
                                $(this)
                                    .find(".u-setcount")
                                    .find("input")
                                    .val()
                            );
                        }
                    });
                    //赋值
                    $(".allgoods em").html(countnum);
                    $("#myprice").html("￥" + total);
                }

                //6.修改数量的操作
                //改变商品数量++
                $(".plus").on("click", function () {
                    var $count = $(this)
                        .parents(".gooditm")
                        .find(".u-setcount input")
                        .val();
                    $count++;
                    if ($count >= 99) {
                        $count = 99;
                    }
                    $(this)
                        .parents(".gooditm")
                        .find(".u-setcount input")
                        .val($count);
                    $(this)
                        .parents(".gooditm")
                        .find(".col5")
                        .find("span")
                        .html(singlegoodsprice($(this))); //改变后的价格
                    totalprice();
                    setcookie($(this));
                });

                //改变商品数量--
                $(".minus").on("click", function () {
                    var $count = $(this)
                        .parents(".gooditm")
                        .find(".u-setcount input")
                        .val();
                    $count--;
                    if ($count <= 1) {
                        $count = 1;
                    }
                    $(this)
                        .parents(".gooditm")
                        .find(".u-setcount input")
                        .val($count);
                    $(this)
                         .parents(".gooditm")
                        .find(".col5")
                        .find("span")
                        .html(singlegoodsprice($(this))); //改变后的价格
                    totalprice();
                    setcookie($(this));
                });

                var sidarr = [];
                var numarr = [];

                function cookieToArray() {
                    if (getCookie("cartsid")) {
                        sidarr = getCookie("cartsid").split(",");
                    }

                    if (getCookie("cartnum")) {
                        numarr = getCookie("cartnum").split(",");
                    }
                }

               /*  $(".goods-list ul").on("click", ".p-btn a", function () {
                    //委托，点击购物车按钮
                    var sid = $(this)
                        .parents(".goodsinfo")
                        .find(".loadimg")
                        .attr("sid"); //当前按钮对应图片的sid
                    cookieToArray(); //获取cookie值，放到对应的数组中
                    if ($.inArray(sid, sidarr) != -1) {
                        //存在，数量加1
                        $(".goods-item:visible").each(function () {
                            //遍历可视的商品列表
                            if (
                                sid ==
                                $(this)
                                    .find("img")
                                    .attr("sid")
                            ) {
                                //添加购物车按钮的索引和购物车中商品列表的索引一致
                                var $num = $(this)
                                    .find(".quantity-form input")
                                    .val(); //获取数量的值
                                $num++; //数量累加
                                $(this)
                                    .find(".quantity-form input")
                                    .val($num); //将数量赋值回去
                                //计算价格
                                var $dj = parseFloat(
                                    $(this)
                                        .find(".b-price strong")
                                        .html()
                                ); //获取当前的单价
                                $(this)
                                    .find(".b-sum strong")
                                    .html(($dj * $num).toFixed(2)); //计算商品总价

                                //存储数量到cookie里面。通过编号找数量
                                numarr[$.inArray(sid, sidarr)] = $num; //将数量存储到对应的cookie存放数量的数组中
                                addCookie("cartnum", numarr.toString(), 7); //添加购物车
                                totalprice();
                            }
                        });
                    } else {
                        //当前商品列表没有进入购物车，创建商品列表
                        sidarr.push(sid); //将当前id添加到数组里面。
                        addCookie("cartsid", sidarr.toString(), 7); //将整个数组添加到cookie
                        numarr.push(1); //走这里数量都是1.
                        addCookie("cartnum", numarr.toString(), 7);
                        createcart(sid, 1);
                        totalprice();
                    }
                }); */
                //直接输入改变数量
                $(".u-setcount input").on("input", function () {
                    var $reg = /^\d+$/g; //只能输入数字
                    var $value = parseInt($(this).val());
                    if ($reg.test($value)) {
                        if ($value >= 99) {
                            //限定范围
                            $(this).val(99);
                        } else if ($value <= 0) {
                            $(this).val(1);
                        } else {
                            $(this).val($value);
                        }
                    } else {
                        $(this).val(1);
                    }
                    $(this)
                        .parents(".goods-item")
                        .find(".b-sum")
                        .find("strong")
                        .html(singlegoodsprice($(this))); //改变后的价格
                    totalprice();
                    setcookie($(this));
                });

                //7.计算数量改变后单个商品的价格
                function singlegoodsprice(row) {
                    //row:当前元素
                    var $dj = parseFloat(
                        row
                            .parents(".gooditm")
                            .find(".col3")
                            .find(".newprice")
                            .html()
                    );
                    var $cnum = parseInt(
                        row
                            .parents(".gooditm")
                            .find(".col4 input")
                            .val()
                    );
                    return ($dj * $cnum).toFixed(2);
                }

                //9.将改变后的数量的值存放到cookie
                function setcookie(obj) {
                    //obj:当前操作的对象
                    cookieToArray();
                    var $index = obj
                        .parents(".gooditm")
                        .find("img")
                        .attr("sid");
                    numarr[sidarr.indexOf($index)] = obj
                        .parents(".gooditm")
                        .find(".u-setcount input")
                        .val();
                    addCookie("cartnum", numarr.toString(), 7);
                }

                //8.全选
                $("#selectAll").on("change", function () {
                    $(".gooditm:visible")
                        .find("input:checkbox")
                        .prop("checked", $(this).prop("checked"));
                    $("#selectAll").prop("checked", $(this).prop("checked"));
                    totalprice(); //求和
                });

                var $inputchecked = $(".gooditm:visible").find("input:checkbox"); //获取委托元素
               /*  $(".item-list").on("change", $inputchecked, function () {
                    var $inputs = $(".goods-item:visible").find("input:checkbox"); //放内部
                    if (
                        $(".goods-item:visible").find("input:checked").length ==
                        $inputs.size()
                    ) {
                        $(".allsel").prop("checked", true);
                    } else {
                        $(".allsel").prop("checked", false);
                    }
                    totalprice();
                }); */

                //10.删除
                //删除cookie的函数
                function delgoodslist(sid, sidarr) {
                    //sid：当前的sid，sidarr:cookie的sid的值
                    var index = -1;
                    for (var i = 0; i < sidarr.length; i++) {
                        if (sid == sidarr[i]) {
                            index = i;
                        }
                    }
                    sidarr.splice(index, 1); //删除数组对应的值
                    numarr.splice(index, 1); //删除数组对应的值
                    addCookie("cartsid", sidarr.toString(), 7); //添加cookie
                    addCookie("cartnum", numarr.toString(), 7);
                }

                //删除单个商品的函数(委托)
                $(".gooditm").on("click", ".col6 a", function (ev) {
                    cookieToArray(); //转数组
                    if (confirm("你确定要删除吗？")) {
                        $(this)
                            .first()
                            .parents(".gooditm")
                            .remove();
                    }
                    delgoodslist(
                        $(this)
                            .first()
                            .parents(".gooditm")
                            .find("img")
                            .attr("sid"),
                        sidarr
                    );
                    totalprice();
                });

                //删除全部商品的函数
                $(".opt").on("click", function () {
                    $(".gooditm:visible").each(function () {
                        if (
                            $(this)
                                .find("input:checkbox")
                                .is(":checked")
                        ) {
                            $(this).remove();
                            delgoodslist(
                                $(this)
                                    .find("img")
                                    .attr("sid"),
                                sidarr
                            );
                        }
                    });
                    totalprice();
                });
            }()
        }
    })
})






            /* cartli: !function () {
               
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

                // 将推荐的商品渲染出来
                $.ajax({
                    url: 'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/picdata.php',
                    dataType: 'json',
                }).done(function (data) {
                    var $str = '';
                    $.each(data, function (index, value) {
                        $str +=
                        '<div class="newRecomItemWrap newRecomItemWrap-1">'+
                            '<a class="itemImg" target="_blank" href="@@">'+
                            '<img border="0" src="'+value.url.split(',')[0]+'" style="opacity: 1;">'+
                            '</a>'+
                            '<p class="itemTitle"><a class="protitle" href="#" target="_blank">'+ value.title +'</a></p>'+
                            '<div class="itemInfo clearfix">'+
                                '<p class="price">'+
                                    '<span class="symbol">¥</span>' + value.price + '<span class="marprice">¥<del>599</del></span>'+
                                '</p>'+
                            '<a href="@@" target="_blank" class="comment">' + value.salenumber + ' 人已评价</a>'+
                            '</div>'+
                        '</div>';
                            });
                            $('.m-reclst').html($str);
                            // $('.newtoday').html($str);
                            // console.log(data);
                });

                //1.获取cookie，根据cookie的值，创建购物车商品列表
                //商品列表的结构提前写好，隐藏在结构中
                //对隐藏的结构进行不同赋值。
                if (getcookie('cartsid') && getcookie('cartnum')) {
                    // alert(1111);
                    var s = getcookie('cartsid').split(','); //存放sid数组
                    var n = getcookie('cartnum').split(','); //存放num数组
                    // alert(s);
                    $.each(s, function (index, value) {
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
                    }).done(function (data) {
                        // alert(11);
                        $.each(data, function (index, value) {
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
                                totalprice();
                                kong();//购物车是否为空
                                totalprice();//总价和总数
                            }
                        });


                    });
                    kong();
                    function kong() {
                        if (getcookie('cartsid')) {//cookie存在，有商品，购物车不再为空
                            $('.empty-cart').hide();
                        } else {
                            $('.empty-cart').show();
                        }
                    }

                    //5.每个商品的总价已经通过创建时求得了。求所有商品的总价和总的商品的个数
                    $('#selectAll').on('change', function () {
                        $('.gooditm:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
                        $('#selectAll').prop('checked', $(this).prop('checked'));
                        totalprice();//求和
                    });

                    var $inputchecked = $('.gooditm:visible').find('input:checkbox');//获取委托元素
                    $('.m-goods').on('change', $inputchecked, function () {
                        var $inputs = $('.gooditm:visible').find('input:checkbox'); //放内部
                        if ($('.gooditm:visible').find('input:checked').length == $inputs.size()) {
                            $('#selectAll').prop('checked', true);
                        } else {
                            $('#selectAll').prop('checked', false);
                        }
                        totalprice();
                    });

                    //7.计算数量改变后单个商品的价格
                    function singlegoodsprice(row) { //row:当前元素
                        var $dj = parseFloat(row.parents('.gooditem').find('.sumrow').find('span').html());
                        var $cnum = parseInt(row.parents('.gooditem').find('.u-setcount input').val());
                        return (($dj * $cnum).toFixed(2));
                    }

                    //9.将改变后的数量的值存放到cookie
                    function setcookie(obj) { //obj:当前操作的对象
                        cookieToArray();
                        var $index = obj.parents('.gooditem').find('.imgwrap').find('img').attr('sid');
                        numarr[sidarr.indexOf($index)] = obj.parents('.gooditem').find('.u-setcount input').val();
                        // alert(sidarr.indexOf($index));
                        addcookie('cartnum', numarr.toString(), 7);
                    }


                    var sidarr = [];
                    var numarr = [];
                    function cookieToArray(){
                        if(getcookie('cartsid')){
                            sidarr=getcookie('cartsid').split(',');
                        }
                        
                        if(getcookie('cartnum')){
                            numarr=getcookie('cartnum').split(',');
                        }
                    }




                }

                function totalprice() {//计算总价
                    var total = 0;//总的价格
                    var countnum = 0;//总的数量
                    alert(1111111);
                    $('.gooditem:visible').each(function() {//可视的商品列表进行遍历，循环叠加
                        if ($(this).find('input:checkbox').is(':checked')) {//商品的复选框是选中的
                            total += parseFloat($(this).find('#myprice').html());
                            countnum += parseInt($(this).find('.ipt').find('input').val());
                        }
                    });
                    //赋值
                    $('#myprice').html('￥' + total);
                    $('.allgoods em').html(countnum);
                }
            
            }(), */



