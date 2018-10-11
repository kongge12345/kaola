define(['config'], function () {
    require(['jquery'], function ($) {
        !function () {
            //添加cookie的函数
            function addCookie(key, value, day) {
                var date = new Date();//创建日期对象
                date.setDate(date.getDate() + day);//过期时间：获取当前的日期+天数，设置给date
                document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;//添加cookie，设置过期时间
            }
            //得到cookie
            function getCookie(key) {
                var str = decodeURI(document.cookie);
                var arr = str.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var arr1 = arr[i].split('=');
                    if (arr1[0] == key) {
                        return arr1[1];
                    }
                }
            }
            //删除cookie

            function delCookie(key) {
                addCookie(key, '', -1);//添加的函数,将时间设置为过去时间
            }

            // 将推荐的商品渲染出来
            $.ajax({
                url: 'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/picdata.php',
                dataType: 'json',
            }).done(function (data) {
                var $str = '';
                $.each(data, function (index, value) {
                    $str +=
                        /* ' <li class="newto_li">' +
                        '<a href="#" class="newto_bigph">' +
                        '<img src="' + value.url.split(',')[0] + '">' +
                        '</a>' +
                        '<a class="newto_tit" target="_blank">' + value.title + '</a>' +
                        '<p>' +
                        '<span class="newto_price">¥<b>' + value.price + '</b></span>' +
                        '<span class="newto_pricet">¥<del>3200</del></span>' +
                        '</p>' +
                        '</li>'; */

                        '<div class="newRecomItemWrap">'+
                            '<a class="itemImg" target="_blank" href="@@">'+
                                '<img border="0"'+
                                    'src="' + value.url.split(',')[0] + '" style="opacity: 1;">'+
                            '</a>'+
                            '<p class="itemTitle">'+
                                '<a class="protitle" href="@@"'+
                                    'target="_blank">' + value.title + '</a>'+
                            '</p>'+
                            '<div class="itemInfo clearfix">'+
                                '<p class="price">'+
                                    '<span class="symbol">¥</span>' + (value.price-10) + '<span class="marprice">¥<del>' + value.price + '</del></span>'+
                                '</p>'+
                                '<a href="@@" target="_blank"'+
                                    'class="comment">' + value.salenumber + ' 人已评价</a>'+
                           '</div>'+
                        '</div>';

                        });
                        $('.m-reclst').html($str);
                        // $('.newtoday').html($str);
                        // console.log(data);
                    });
        
        
        
                }();
            });
});