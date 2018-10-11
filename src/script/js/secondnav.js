define(['config'], function () {
    require(['jquery'], function ($) {

        !function () {
            $dropli = $('.dropbox li');
            


            /* $dropli.on('click',function(ev){
                if(ev.target=$(this)){
                    $index=$(this).index();
                    $dropli.eq($index).addClass('write');
                    }
                    
                }) */
            $dropli.hover(
                
                function (ev) {
                    if (ev.target = $(this)) {
                        $index = $(this).index();
                        $dropli.eq($index).addClass('write');

                        $dropli.eq($index).children('img').addClass('hide').siblings('img').removeClass('hide');

                        $dropli.eq($index).children('div').show();
                    }
                },
                function (ev) {
                    if (ev.target = $(this)) {
                        $index = $(this).index();
                        $dropli.eq($index).removeClass('write');

                        $dropli.eq($index).children('.img2').addClass('hide').siblings('img').removeClass('hide');

                        $dropli.eq($index).children('div').hide();

                    }

                }
            )

            /* if(ev.target==this){
                if($(this).children('ul').is(':hidden')){
                    $(this).removeClass('add').addClass('reduce').children('ul').show(400);
                }else{
                    $(this).removeClass('reduce').addClass('add').children('ul').hide(400);
                }
 
            } */

        }();

    });
});