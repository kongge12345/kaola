define(['jquery'], function ($) {
    require(['secondnav'], function (sec) {
        return {
            basin: !function () {
                $('.topcontent').load('header.html');
                $('.footercontent').load('footer.html');

            }(),

            // 从首页获取渲染数据，并使用放大镜
            detaildata: !function () {
                $.ajax({
                    post: 'GET',
                    url: 'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/details.php',
                    data: {
                        sid: location.search.substring(1).split('=')[1]
                    },
                    dataType: 'json'
                }).done(function (data) {

                    var $strs = '<img src="' + data[0].url.split(',')[0] + '">' +
                        '<b class="shadow" style="top: 155px; left: 11.5px; display: none;"></b>';
                    var $strb =
                        '<img src="' + data[0].url.split(',')[0] + '" id="showImgBig" style="top: -310px; left: -23px;">';

                    var $ul = '<ul id="litimgUl" class="clearfix" style="left: 0px; width: ' + 80 * data[0].url.split(',').length + 'px;"></ul>';
                    var $lis = '';
                    $.each(data[0].url.split(','), function (key, value) {
                        if (key == 0) {
                            $li =
                                '<li class="active lit_li">' +
                                '<a href="javascript:;">' +
                                '<img src="' + value + '" id="auto-id-1539246444523">' +
                                '</a>' +
                                '</li>';

                        } else {

                            $li =
                                '<li>' +
                                '<a href="javascript:;">' +
                                '<img src="' + value + '" id="auto-id-1539246444523">' +
                                '</a>' +
                                '</li>';
                        }
                        $lis += $li;

                        $title = '<span>' + data[0].title + '</span>';
                        $titles = '<dt class="subTit" sid="'+data[0].sid+'">' + data[0].title + '</dt>';

                        $price =
                            '<span class="PInfo_r currentPrice">¥<span>' + (data[0].price - 10) + '</span></span>' +
                            '<span class="m-memberLabel">包邮</span>' +
                            '<span class="PInfo_r marketPrice addprice j-marketprice">' +
                            '参考价&nbsp;&nbsp;¥<span>' + (data[0].price) + '</span>' +
                            '</span>';

                        $homework =
                            '<a class="shopname" target="_blank" href="http://mall.kaola.com/13155">' + data[0].homework + '</a>';


                    });
                    /* console.log(data[0].url.split(','));*/
                    $ul = +$lis + '</ul>';
                    console.log($lis);
                    $('#showImgBox').html($strs);
                    $('#showDetails').html($strb);
                    $('#litimgUl').html($lis);
                    $('.product-title').html($title);
                    $('.titles').html($titles);
                    $('.m-price-cnt').html($price);
                    $('.send').html($homework);

                    secnav();

                })
                // 放大镜效果
                function secnav() {

                    $(document).ready(function () {
                        $sf = $('.shadow');
                        $bf = $('#showDetails')

                        $spic = $('#showImgBox');
                        $bpic = $('#showImgBig');
                        // alert(111111);

                        $spic.hover(function () {
                            $sf.css('display', 'block');
                            $bf.css('display', 'block');

                            //3.1:小方的尺寸
                            $sf.width($(this).width() * $bf.width() / $bpic.width());
                            $sf.height($(this).height() * $bf.height() / $bpic.height());

                            var $bili = $bpic.width() / $spic.width();

                            //3.2鼠标在小方里面移动
                            $spic.on('mousemove', function (ev) {
                                var $left = ev.pageX - $('#showImgBox').offset().left - $sf.width() / 2;
                                var $top = ev.pageY - $('#showImgBox').offset().top - $sf.height() / 2;
                                if ($left <= 0) {
                                    $left = 0;
                                } else if ($left >= $spic.width() - $sf.width()) {
                                    $left = $spic.width() - $sf.width();
                                }


                                if ($top <= 0) {
                                    $top = 0;
                                } else if ($top >= $spic.height() - $sf.height()) {
                                    $top = $spic.height() - $sf.height();
                                }


                                $sf.css({
                                    left: $left,
                                    top: $top
                                });

                                $bpic.css({
                                    left: -$bili * $left,
                                    top: -$bili * $top
                                })
                            });
                        }, function () {
                            $sf.css('display', 'none');
                            $bf.css('display', 'none');
                        });

                        //设置ul尺寸
                        var $li = $('#litimgUl li');
                        var $ul = $('#litimgUl');
                        var $liwidth = $li.eq(0).innerWidth();
                        console.log($liwidth);

                        // $ul.width($li.size() * $liwidth);

                        $li.on('click', function () {
                            $(this).addClass('active').siblings('li').removeClass('active');
                            var url = $(this).find('img').attr('src');//当前点击的li下面的图片路径
                            $spic.find('img').attr('src', url);
                            $bpic.attr('src', url);
                        });

                        var $num = 4;//当前ul里面显示的个数。
                        if ($li.length <= 4) {
                            $('.scrollleft ,.scrollright').addClass('scrollBtn');
                        }
                        $('.scrollRight').on('click', function () {
                            // alert(1111111111);
                            // alert($li.size());
                            if ($num < $li.size()) {
                                $num++;
                                $('.scrollleft').css("color", "#333");
                                if ($num == $li.size()) {
                                    $('.scrollright').addClass('scrollBtn');
                                }
                                // console.log(111111111111);
                                $ul.animate({
                                    left: -($num - 4) * $liwidth
                                });

                                // console.log($ul.left());

                            }
                        });

                        $('.scrollleft').on('click', function () {
                            if ($num > 4) {
                                $num--;
                                $('.scrollright').css('color', '#333');
                                if ($num == 4) {
                                    $('.scrollleft').css('color', '#fff');
                                }
                                // console.log(-($num - 4) * $liwidth);
                                $ul.animate({
                                    left: -($num - 4) * $liwidth
                                });
                            }

                        });
                    })
                    // }()
                }
            }(),

            // 购物车加减购买数量
            buynum: !function () {
                // $value=1;
                $('.ctrnum-wrap input').val(1);
                var $value = $('.ctrnum-wrap input').val();
                $('.ctrnum-wrap input').on('input', function () {
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
                $('.icon-minus').on('click', function () { $value--; $('.ctrnum-wrap input').val($value); });
                $('.icon-plus').on('click', function () { $value++; $('.ctrnum-wrap input').val($value); });


            }(),

            // 加入购物车
            buycart: !function () {
                //添加cookie的函数
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

                // 取cookie成数组
                var sidarr = []; //将取得cookie的编号存放到此数组
                var numarr = []; //将取得cookie的数量存放到此数组
                //获取cookie,值变成数组
                function getcookievalue() {
                    if (getcookie('cartsid') && getcookie('cartnum')) {
                        sidarr = getcookie('cartsid').split(','); //[1,2,3,4]
                        numarr = getcookie('cartnum').split(','); //[50,60,70,80]
                    }
                }
                //3.判断是否是第一次添加
                $('#addCart').on('click', function () {

                    var sid =location.search.substring(1).split('=')[1]; //获取当前页面a对应的图片的sid。  5
                    // alert(parseInt($('.ctrnum-wrap input').val()));
                    getcookievalue();
                    if ($.inArray(sid, sidarr) != -1) { //sid存在,数量累加
                        if (getcookie('cartnum') == '') {
                            var num = parseInt($('.ctrnum-wrap input').val());

                            numarr[$.inArray(sid, sidarr)] = num;
                            addcookie('cartnum', numarr.toString(), 7);//修改后的结果
                            sidarr[$.inArray(sid, sidarr)] = sid;//将当前id添加到对应的位置。
                            addcookie('cartsid', sidarr.toString(), 7);//将整个数组添加到cookie
                        } else {
                            var num = parseInt(numarr[$.inArray(sid, sidarr)]) + parseInt($('.ctrnum-wrap input').val());//当前的值和cookie里面的值(和sid对应的值)进行累加
                            numarr[$.inArray(sid, sidarr)] = num;//将新的数量，覆盖原先的值。
                            addcookie('cartnum', numarr, 10);
                        }

                    } else { //不存在
                        // alert($('.ctrnum-wrap input').val());
                        sidarr.push(sid); //将sid追加到数组
                        addcookie('cartsid', sidarr, 10); //存cookie
                        numarr.push(parseInt($('.ctrnum-wrap input').val())); //将表单的值追加到数组
                        addcookie('cartnum', numarr, 10); //存cookie
                    }
                });
            }(),
        }
    });
});







            // secnav: !function () {
            /* function secnav(){

                $(document).ready(function () {
                    $sf = $('.shadow');
                    $bf = $('#showDetails')

                    $spic = $('#showImgBox');
                    $bpic = $('#showImgBig');
                    // alert(111111);

                    $spic.hover(function () {
                        $sf.css('display', 'block');
                        $bf.css('display', 'block');

                        //3.1:小方的尺寸
                        $sf.width($(this).width() * $bf.width() / $bpic.width());
                        $sf.height($(this).height() * $bf.height() / $bpic.height());

                        var $bili = $bpic.width() / $spic.width();

                        //3.2鼠标在小方里面移动
                        $spic.on('mousemove', function (ev) {
                            var $left = ev.pageX - $('#showImgBox').offset().left - $sf.width() / 2;
                            var $top = ev.pageY - $('#showImgBox').offset().top - $sf.height() / 2;
                            if ($left <= 0) {
                                $left = 0;
                            } else if ($left >= $spic.width() - $sf.width()) {
                                $left = $spic.width() - $sf.width();
                            }


                            if ($top <= 0) {
                                $top = 0;
                            } else if ($top >= $spic.height() - $sf.height()) {
                                $top = $spic.height() - $sf.height();
                            }


                            $sf.css({
                                left: $left,
                                top: $top
                            });

                            $bpic.css({
                                left: -$bili * $left,
                                top: -$bili * $top
                            })
                        });
                    }, function () {
                        $sf.css('display', 'none');
                        $bf.css('display', 'none');
                    });

                    //设置ul尺寸
                    var $li = $('#litimgUl li');
                    var $ul = $('#litimgUl');
                    var $liwidth = $li.eq(0).innerWidth();
                    // console.log($liwidth);
                    
                    $ul.width($li.size() * $liwidth);

                    $li.on('click', function () {
                        $(this).addClass('active').siblings('li').removeClass('active');
                        var url = $(this).find('img').attr('src');//当前点击的li下面的图片路径
                        $spic.find('img').attr('src', url);
                        $bpic.attr('src', url);
                    });

                    var $num = 4;//当前ul里面显示的个数。
                    if ($li.length <= 4) {
                        $('.scrollleft ,.scrollright').addClass('scrollBtn');
                    }
                    $('.scrollRight').on('click', function () {
                        if ($num < $li.size()) {
                            $num++;
                            $('.scrollleft').css("color","#333");
                            if ($num == $li.size()) {
                                $('.scrollright').addClass('scrollBtn');
                            }
                            // console.log(111111111111);
                            $ul.animate({
                                left: -($num - 4) * $liwidth
                            });

                        }
                    });

                    $('.scrollleft').on('click', function () {
                        if ($num > 4) {
                            $num--;
                            $('.scrollright').css('color', '#333');
                            if ($num == 4) {
                                $('.scrollleft').css('color', '#fff');
                            }
                            // console.log(-($num - 4) * $liwidth);
                            $ul.animate({
                                left: -($num - 4) * $liwidth
                            });
                        }

                    });
                })
            // }()
            } */

    //3.1:鼠标移入移出显示小方和大方。
    /* alert(11111);
    $('.litimg_box').hover(function(){
        $('.showDetails').css('display','block');
        $('.shadow').css('display','block');});
        

        //3.1:小方的尺寸
        $('#sf').width($(this).width() * $('#bf').width() / $('#bpic').width());
        $('#sf').height($(this).height() * $('#bf').height() / $('#bpic').height());

        var $bili = $('#bpic').width() / $('#spic').width();

        //3.2鼠标在小方里面移动
        $('#spic').on('mousemove', function (ev) {
            var $left = ev.pageX - $('.wrap').offset().left - $('#sf').width() / 2;
            var $top = ev.pageY - $('.wrap').offset().top - $('#sf').height() / 2;
            if ($left <= 0) {
                $left = 0;
            } else if ($left >= $('#spic').width() - $('#sf').width()) {
                $left = $('#spic').width() - $('#sf').width();
            }


            if ($top <= 0) {
                $top = 0;
            } else if ($top >= $('#spic').height() - $('#sf').height()) {
                $top = $('#spic').height() - $('#sf').height();
            }


            $('#sf').css({
                left: $left,
                top: $top
            });

            $('#bpic').css({
                left: -$bili * $left,
                top: -$bili * $top
            })
        });
    }, function () {
        $('#sf').css('visibility', 'hidden');
        $('#bf').css('visibility', 'hidden');
    });

    //设置ul尺寸
    var $li = $('#list ul li');
    var $ul = $('#list ul');
    var $liwidth = $li.eq(0).innerWidth();
    $ul.width($li.size() * $liwidth);


    $li.on('click', function () {
        var url = $(this).find('img').attr('src');//当前点击的li下面的图片路径
        $('#spic').find('img').attr('src', url);
        $('#bpic').attr('src', url);
    });

    var $num = 6;//当前ul里面显示的个数。
    if ($li.length <= 6) {
        $('#left,#right').css('color', '#fff');
    }
    $('#right').on('click', function () {
        if ($num < $li.size()) {
            $num++;
            $('#left').css('color', '#333');
            if ($num == $li.size()) {
                $('#right').css('color', '#fff');
            }
            $ul.animate({
                left: -($num - 6) * $liwidth
            });
        }
    });

    $('#left').on('click', function () {
        if ($num > 6) {
            $num--;
            $('#right').css('color', '#333');
            if ($num == 6) {
                $('#left').css('color', '#fff');
            }
            $ul.animate({
                left: -($num - 6) * $liwidth
            });
        }
    }); */



