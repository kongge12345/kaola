define(['config'], function () {
    require(['jquery'], function ($) {
      
       
                var $slide_div=$('.slide_div');
                 $.ajax({
                     type: "GET",
                     url: "http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/getdata.php",
                     dataType: "json",
                     success: function(data){
                                $slide_div.empty();   //清空slide_div里面的所有内容
                                 var htmlstr = '<ul class="slide_ul clear">';
                                 for (var obj of data) {
                                     htmlstr += `<li class="slide_li">
                                             <a href="#">
                                             <img src="${obj.url}" sid="${obj.sid}" class="slide_img"/>
                                             </a>
                                           </li>`;
                                 }
                                 htmlstr += '</ul>';
                                 $slide_div.html(htmlstr);
                            }
                });
         

            var $banner = $('.slide_top');
            var $btns = $('.slide_bot li');
            var $imgs = $('.slide_ul slide_li img');
            var $leftbtn = $('.leftBut');
            var $rightbtn = $('.rightBut');
            var $li=$('.slide_ul slide_li');
            var $timer=null;

            var $index=0;

            $btns.on('click',function(ev){
                $index=$(this).index();
                imgchange();
            })
            function imgchange(){

                $btns.eq($index).addClass('red').siblings('li').removeClass('red');
                $slide_div.children().children().eq($index).css('opacity','1').siblings().css('opacity','0');      
  
            }
            $rightbtn.on('click',function(ev){
                $index++;
                if($index>3){
                    $index=0;
                }
                imgchange();
            });
            $leftbtn.on('click',function(ev){
                $index--;
                if($index<0){
                    $index=3;
                }
                imgchange();
            });
            $banner.hover(function(){
                clearInterval(Timer);
                $leftbtn.show();        
                $rightbtn.show();
            },function(){
                $leftbtn.hide();        
                $rightbtn.hide();
                Timer=setInterval(function(){
                    $rightbtn.trigger('click');
                },2000);
               
            });
            var Timer=setInterval(function(){
                $rightbtn.trigger('click');
            },2000);

           
        });
    });
            
            /* var $banner = $('.slide_top');
            var $btns = $('.slide_bot li');
            var $imgs = $('.slide_ul slide_li');
            var $leftbtn = $('.leftBut');
            var $rightbtn = $('.rightBut');

            var $index = 0;//当前的索引.
            var $qindex = 0;//前一个索引.

            $btns.on('click', function (ev) {
                $index = $(this).index();//当前的索引
                imgchange(ev);
                $qindex = $index;//当前的索引变成上一个索引.
            });

            $banner.hover(function () {
                $leftbtn.show();
                $rightbtn.show();
            }, function () {
                $leftbtn.hide();
                $rightbtn.hide();
            });

            $rightbtn.on('click', function (ev) {
                $index++;
                if ($index > 3) {
                    $qindex = 3;
                    $index = 0;
                }
                imgchange(ev);
                $qindex = $index;//当前的索引变成上一个索引.
            });

            $leftbtn.on('click', function (ev) {
                $index--;
                if ($index < 0) {
                    $qindex = 0;
                    $index = 3;
                }
                imgchange(ev);
                $qindex = $index;//当前的索引变成上一个索引.
            });
            function imgchange(ev) {
                $btns.eq($index).addClass('red').siblings('li').removeClass('red');
                $imgs.eq($index).addClass('opa').siblings('li').removeClass('noopa');

                if ($index == 0 && $qindex == 3) {
                    if (ev.target.nodeName == 'LI') {
                        $imgs.eq($qindex).animate({
                            opacity:0
                        });
                        $imgs.eq($index).css('left', '-1956px').animate({
                            left: 0
                        });
                    } else {
                        $imgs.eq($qindex).animate({
                            left: -1956
                        });
                        $imgs.eq($index).css('left', '1956px').animate({
                            left: 0
                        });
                    }

                } else if ($index == 3 && $qindex == 0) {
                    if (ev.target.nodeName == 'SPAN') {
                        $imgs.eq($qindex).animate({
                            left: -1956
                        });
                        $imgs.eq($index).css('left', '820px').animate({
                            left: 0
                        });
                    } else {
                        $imgs.eq($qindex).animate({
                            left: 1956
                        });
                        $imgs.eq($index).css('left', '-1956px').animate({
                            left: 0
                        });
                    }

                } else if ($index > $qindex) {
                    $imgs.eq($qindex).animate({
                        left: -1956
                    });
                    $imgs.eq($index).css('left', '1956px').animate({
                        left: 0
                    });
                } else if ($qindex > $index) {
                    $imgs.eq($qindex).animate({
                        left: 1956
                    });
                    $imgs.eq($index).css('left', '-1956px').animate({
                        left: 0
                    });
                }

            } */

  

    
 



        /* !function () {
            
            setInterval(function () {
                var ajax = new XMLHttpRequest();
                ajax.open('get', 'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/getdata.php', true);
                ajax.send();
                ajax.onreadystatechange = function () {
                    if (ajax.readyState === 4) {
                        if (ajax.status === 200) {
                            var arrlist = JSON.parse(ajax.responseText);
                            var htmlstr = '<ul class="slide_ul clear">';
                            for (var obj of arrlist) {
                                htmlstr += `<li>
                                        <a href="#">
                                        <img src="${obj.url}" sid="${obj.sid}" class="slide_img"/>
                                        </a>
                                      </li>`;
                            }
                            htmlstr += '</ul>';
                            $slide_div.html(htmlstr);
                           
                            // console.log($slide_div.innerHTML);
                            console.log(htmlstr);
                            
                        } else {
                            alert('接口地址有错误');
                        }
                    }
                }
            }, 1000);


            var $banner = $('.banner');
            var $btns = $('.btn span');
            var $imgs = $('.slide_ul slide_li');
            var $leftbtn = $('.leftBut');
            var $rightbtn = $('.rightBut');

            var $index = 0;//当前的索引.
            var $qindex = 0;//前一个索引.

            $btns.on('click', function (ev) {
                $index = $(this).index();//当前的索引
                imgchange(ev);
                $qindex = $index;//当前的索引变成上一个索引.
            });

            $banner.hover(function () {
                $leftbtn.show();
                $rightbtn.show();
            }, function () {
                $leftbtn.hide();
                $rightbtn.hide();
            });

            $rightbtn.on('click', function (ev) {
                $index++;
                if ($index > 5) {
                    $qindex = 5;
                    $index = 0;
                }
                imgchange(ev);
                $qindex = $index;//当前的索引变成上一个索引.
            });

            $leftbtn.on('click', function (ev) {
                $index--;
                if ($index < 0) {
                    $qindex = 0;
                    $index = 5;
                }
                imgchange(ev);
                $qindex = $index;//当前的索引变成上一个索引.
            });
            function imgchange(ev) {
                $btns.eq($index).addClass('hover').siblings('span').removeClass('hover');
                if ($index == 0 && $qindex == 5) {
                    if (ev.target.nodeName == 'SPAN') {
                        $imgs.eq($qindex).animate({
                            left: 820
                        });
                        $imgs.eq($index).css('left', '-820px').animate({
                            left: 0
                        });
                    } else {
                        $imgs.eq($qindex).animate({
                            left: -820
                        });
                        $imgs.eq($index).css('left', '820px').animate({
                            left: 0
                        });
                    }

                } else if ($index == 5 && $qindex == 0) {
                    if (ev.target.nodeName == 'SPAN') {
                        $imgs.eq($qindex).animate({
                            left: -820
                        });
                        $imgs.eq($index).css('left', '820px').animate({
                            left: 0
                        });
                    } else {
                        $imgs.eq($qindex).animate({
                            left: 820
                        });
                        $imgs.eq($index).css('left', '-820px').animate({
                            left: 0
                        });
                    }

                } else if ($index > $qindex) {
                    $imgs.eq($qindex).animate({
                        left: -820
                    });
                    $imgs.eq($index).css('left', '820px').animate({
                        left: 0
                    });
                } else if ($qindex > $index) {
                    $imgs.eq($qindex).animate({
                        left: 820
                    });
                    $imgs.eq($index).css('left', '-820px').animate({
                        left: 0
                    });
                }

            }

        }(); */
