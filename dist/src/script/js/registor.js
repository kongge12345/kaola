/* 注册页面的js */
define(['config'], function () {
    require(['jquery','jqueryvalidate','jquerycookie'], function ($,jv,jc) {
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
                        equalTo:'#reg_password'
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
      
            /* $.validator.setDefaults({
                // 添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)
			    success: function(label){
			        label.text('√').css({'color':'green'}).addClass('valid');
			    }
            }); */


            

            $('#submit').on('click',function(){
                var $tel=$('#reg_tel').val();
                var $password=$('#reg_password').val();
                console.log($tel);
                console.log($password);
                $.ajax({
                    type:'POST',
                    url: 'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/reg.php',
                    data:{
                        tel:$tel,
                        pass:$password
                    }
                }).done(function (data) {
                    if(!data){//用户名或者密码错误
                        $('#error').html('用户名或者密码错误');
                        $('#password').val('');
                    }else{//成功,存cookie,跳转到首页
                        alert(22222);
                        // addCookie('tel',$tel,7);
                        location.href='index.html';
                    }
                });

                /* $.ajax({
                    type:'post',
                    url:'http://10.31.162.50/phpdome/new%20webproject/www.kaola.com/php/reg.php',
                    data:{//将用户名和密码传输给后端
                        tel:$tel,
                        pass:$password
                    },
                    success:function(data){//请求成功，接收后端返回的值
                        alert(data);
                        if(!data){//用户名或者密码错误
                            alert(111111);
                            $('#error').html('用户名或者密码错误');
                            $('#password').val('');
                        }else{//成功,存cookie,跳转到首页
                            alert(22222);
                            // addCookie('UserName',$username,7);
                            location.href='index.html';
                        }
                    }
                }) */
            });




        }();
    });
 });
