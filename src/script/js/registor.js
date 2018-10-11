/* 注册页面的js */
define(['config'], function () {
    require(['jquery','jqueryvalidate','jquerycookie'], function ($) {
        !function(){
            $('#registor_from').validate({
                rules:{
                    tel:{
                        required:true,
                        rangelength:[11,11],
                        remote:{
                            url: "http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/reg.php",     //后台处理程序
                            type: "post"   
                        }
                    },
                    password:{
                        required:true,
                        rangelength:[3,10]
                    },
                    repass:{
                        required:true,
                        equalTo:'#password'
                    }

                },
                messages:{
                    tel:{
                        required:'用户名不能为空',
                        rangelength:'输入长度必须为11',
                        remote:'用户名已存在'

                    },
                    password:{
                        required:'密码不能为空',
                        rangelength:'密码不对'
                    },
                    repass:{
                        required:'密码重复不能为空',
                        equalTo:'请输入相同的密码'
                    }
                }
            });
      
            $.validator.setDefaults({
                // 添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)
			    success: function(label){
			        label.text('√').css({'color':'green'}).addClass('valid');
			    }
            });
        }();
    });
 });
