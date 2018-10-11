/* 首页的js文件 */
define(['jquery'], function ($) {
    require(['banner','secondnav','picdata'],function(){
        $('.topcontent').load('header.html');
        $('.footercontent').load('footer.html');
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


