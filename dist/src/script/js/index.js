/* 首页的js文件 */
define(['jquery'], function ($) {
    require(['banner', 'secondnav', 'picdata'], function () {
        return {
            basic: !function () {
                $('.topcontent').load('header.html');
                $('.footercontent').load('footer.html');
            }(),
            lefttop: !function () {
                //4.1:滚轮事件显示左侧的楼梯。
                const $louti = $('#indexleft'); //左侧楼梯
                const $loutili1 = $('#indexleft .channel li');
                const $loutili = $('#indexleft .floor li');
                const $louceng1 = $('.louceng1');
                const $louceng = $('.louceng');
                $(window).on('scroll', () => {
                    const $scrolltop = $(window).scrollTop(); //获取滚动条的top值。
                    if ($scrolltop >= 580) {
                        $louti.show();
                    } else {
                        $louti.hide();
                    }

                    //4.4:拖动滚轮，对应的楼梯添加对应的类名
                    /* $louceng.each(function (index, element) { //index:0-8
                        //通过遍历的方式获取每一个楼层的top值
                        const $top = $louceng.eq(index).offset().top + $(this).innerHeight() / 2;
                        if ($top > $scrolltop) {
                            $loutili.removeClass('active'); //清除所有的类
                            $loutili.eq($(this).index()).addClass('active');
                            return false; //阻止循环
                            //每次只能有一个满足条件添加类，其他的通过循环阻止
                        }
                    }); */
                });

                $loutili1.on('click', function() {
                    // $(this).addClass('active').siblings('li').removeClass('active');
                    const $top = $louceng1.eq($(this).index()).offset().top;
                    // alert($top);
                    // const $top2 = $louceng.eq($(this).index()).offset().top;
                    $('html,body').animate({ //赋值时考虑兼容。
                        scrollTop: $top
                    });
                });
                $loutili.on('click', function() {
                    // $(this).addClass('active').siblings('li').removeClass('active');
                    const $top = $louceng.eq($(this).index()).offset().top;
                    // const $top2 = $louceng.eq($(this).index()).offset().top;
                    $('html,body').animate({ //赋值时考虑兼容。
                        scrollTop: $top
                    });
                });
            }(),
            topfind:!function(){
                $(window).on('scroll', () => {
                    const $scrolltop = $(window).scrollTop(); //获取滚动条的top值。
                    if ($scrolltop >= 150) {
                        $('.nav_loge_wrap').addClass('topTabBoxFixed');
                        $('.nav_loge_wrap').find('.loge').addClass('loge_small').removeClass('loge');
                        $('.find').css("margin-top","13px");
                        $('.buycar').css("display","none");
                        $('.nav_loge_wrap').css("height","64px");
                    } else {
                        $('.nav_loge_wrap').removeClass('topTabBoxFixed');
                        $('.nav_loge_wrap').find('.loge_small').addClass('loge').removeClass('loge_small');
                        $('.find').css("margin-top","30px");
                        $('.buycar').css("display","block");
                        $('.nav_loge_wrap').css("height","100px");
                    }
                })
            }(),
            smallbanner:!function(){
                $('.idxicon').on('click',function(ev){
                    $(this).addClass('active').siblings().removeClass('active');
                    // console.log($(this).index());
                    // alert($('.prolist').find('.itemgroup').eq($(this).index()).html());
                    $('.prolist').find('.itemgroup').eq($(this).index()).animate({
                        "opacity":"1"
                    },1000).siblings('.itemgroup').animate({
                        "opacity":"0"
                    },1000);
                })
                var $index=0;
                var f_Timer=setInterval(function(){
                    $index++;
                    if($index==3){
                        $index=0;
                    }
                    $('.idxicon').eq($index).addClass('active').siblings().removeClass('active');
                    $('.prolist').find('.itemgroup').eq($index).animate({
                        "opacity":"1"
                    },1000).siblings('.itemgroup').animate({
                        "opacity":"0"
                    },1000);
                },2000);


                $('.itemgroup').hover(
                    function(){
                        clearInterval(f_Timer);
                    },
                    function(){

                        f_Timer=setInterval(function(){
                            $index++;
                            if($index==3){
                                $index=0;
                            }
                            $('.idxicon').eq($index).addClass('active').siblings().removeClass('active');
                            $('.prolist').find('.itemgroup').eq($index).animate({
                                "opacity":"1"
                            },1000).siblings('.itemgroup').animate({
                                "opacity":"0"
                            },1000);
                        },2000);

                    }
                )
            }(),    
        }
    });
});

/* require(['secondnav']);
require(['picdata']); */

/* define(['config'], function () {
    require(['jquery','banner','secondnav','picdata'], function ($) {
        return{
            conn:!function(){
                $('.topcontent').load('header.html');
                $('.footercontent').load('footer.html');  
        }()
        }
        
    });
}); */


