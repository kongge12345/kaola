define(['config'], function () {


    require(['jquery'], function ($) {
        !function () {
            setInterval(function () {
                var ajax = new XMLHttpRequest();
                ajax.open('get', 'http:// 10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/getdata.php', true);
                ajax.send();
                ajax.onreadystatechange = function () {
                    if (ajax.readyState === 4) {
                        if (ajax.status === 200) {
                            var arrlist = JSON.parse(ajax.responseText);
                            var htmlstr = '<ul>';
                            for (var obj of arrlist) {
                                htmlstr += `<li>
                                        <a href="#">
                                        <img src="${obj.url}" sid="${obj.sid}" class="slide_img"/>
                                        </a>
                                      </li>`;
                            }
                            htmlstr += '</ul>';
                            document.body.innerHTML = htmlstr;
                        } else {
                            alert('接口地址有错误');
                        }
                    }
                }
            }, 1000);


            var $banner = $('.banner');
            var $btns = $('.btn span');
            var $imgs = $('.scroll img');
            var $leftbtn = $('.prev');
            var $rightbtn = $('.next');

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

        }();
    });
});