
/* (function($){
    alert(11);
        $('.topcontent').load('header.html');
        $('.footercontent').load('footer.html');

        $('.nav_loge_wrap').children('div').removeClass('.find').addClass('#topimg');
 })(jQuery); */

 define(['config','registor','secondnav'], function () {
    require(['jquery','jqueryvalidate','jquerycookie'], function ($) {
            /* return {
                $('.topcontent').load('header.html')
                $('.footercontent').load('footer.html')
            }; */

          
               
                    // $(document).ready(function(){

                        $('.topcontent').load('header.html')
                        $('.footercontent').load('footer.html')
        
    
                        $('.login_name').on('click',function(ev){
                            // alert($(this).index());
                            $index=$(this).index();
                            $('.login_name').eq($index).addClass('red').siblings('div').removeClass('red');
        
                            $('.login_lwra').eq($index).removeClass('hide').siblings('.login_lwra').addClass('hide');
                        })
        
                        $('#login-form').validate({
                        rules:{
                            tel:{
                                required:true,
                                rangelength:[11,11]
                                /* remote:{
                                    url: "http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/reg.php",     //后台处理程序
                                    type: "post"   
                                } */
                            },
                            password:{
                                required:true,
                                rangelength:[3,10]
                            }
        
                        },
                        messages:{
                            tel:{
                                required:'用户名不能为空',
                                rangelength:'输入长度必须为11'
                               /*  remote:'用户名已存在' */
        
                            },
                            password:{
                                required:'密码不能为空',
                                rangelength:'密码不对'
                            }
                        }
                        });
    
                        $('#btn').on('click',function(){
                            var $tel=$('#phoneipt').val();
                            console.log($tel);
                            var $password=$('#password').val();
                            $.ajax({
                                type:'POST',
                                url:'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/login.php',
                                data:{//将用户名和密码传输给后端
                                    tel:$tel,
                                    password:$password
                                },
                                success:function(data){//请求成功，接收后端返回的值
                                    alert(data);
                                    if(!data){//用户名或者密码错误
                                        // $('.error').html('手机号或者密码错误');
                                        // $('.password').val('');
                                        alert(222222);
                                    }else{//成功,存cookie,跳转到首页
                                        // addCookie('tel',$tel,10);
                                        location.href='http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/src';
                                    }
                                }
                            })
                        });
                    // });
                
                /* $.validator.setDefaults({
                    添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)
                    success: function(label){
                        label.text('√').css('color','green').addClass('valid');
                    }
                }); */
              
          
          
            
    });
});