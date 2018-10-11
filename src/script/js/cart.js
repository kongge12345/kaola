define(['config','registor'], function () {
    require(['jquery','jqueryvalidate','jquerycookie'], function ($) {
            $('.topcontent').load('header.html');
            $('.footercontent').load('footer.html');
        });
     });