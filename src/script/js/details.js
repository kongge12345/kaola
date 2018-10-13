define(['jquery'], function ($) {
    require(['secondnav'], function (sec) {
        return {

            //3.放大镜
            basin: !function () {
                $('.topcontent').load('header.html');
                $('.footercontent').load('footer.html');

            }(),
            detaildata:!function(){
                $.ajax({
                    post:'GET',
                    url:'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/details.php',
                    data:{
                        sid:location.search.substring(1).split('=')[1]
                    },
                    dataType:'json'
                }).done(function(data){

                    var $strs='<img src="'+data[0].url.split(',')[0]+'">'+
                        '<b class="shadow" style="top: 155px; left: 11.5px; display: none;"></b>';
                    var $strb=
                    '<img src="'+data[0].url.split(',')[0]+'" id="showImgBig" style="top: -310px; left: -23px;">';
                    
                    var $ul='<ul id="litimgUl" class="clearfix" style="left: 0px; width: '+80*data[0].url.split(',').length+'px;"></ul>';
                    var $lis='';
                    $.each(data[0].url.split(','),function(key,value){
                        if(key==0){
                            $li=
                            '<li class="active lit_li">'+
                            '<a href="javascript:;">'+
                            '<img src="'+value+'" id="auto-id-1539246444523">'+
                            '</a>'+
                            '</li>';
                            
                        }else{

                            $li=
                            '<li>'+
                            '<a href="javascript:;">'+
                            '<img src="'+value+'" id="auto-id-1539246444523">'+
                            '</a>'+
                            '</li>';
                        }
                        $lis+=$li;

                        $title='<span>'+data[0].title+'</span>';
                        $titles='<dt class="subTit">'+data[0].title+'</dt>';

                        $price=
                        '<span class="PInfo_r currentPrice">¥<span>'+(data[0].price-10)+'</span></span>'+
                        '<span class="m-memberLabel">包邮</span>'+
                        '<span class="PInfo_r marketPrice addprice j-marketprice">'+
                            '参考价&nbsp;&nbsp;¥<span>'+(data[0].price)+'</span>'+
                        '</span>';

                        $homework=
                        '<a class="shopname" target="_blank" href="http://mall.kaola.com/13155">'+data[0].homework+'</a>';

                        
                     });
                    /* console.log(data[0].url.split(','));*/
                    $ul=+$lis+'</ul>';
                    console.log($lis); 
                    $('#showImgBox').html($strs);
                    $('#showDetails').html($strb);
                    $('#litimgUl').html($lis);
                    $('.product-title').html($title);
                    $('.titles').html($titles);
                    $('.m-price-cnt').html($price);
                    $('.send').html($homework);

                    secnav()

                })

                function secnav(){

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
                                $('.scrollleft').css("color","#333");
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
        }
    });
});


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



