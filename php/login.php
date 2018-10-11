<?php
require "conn.php";

if(isset($_POST['tel'])){//前端ajax传输过来的额
	$tel=$_POST['tel'];
	$password=md5($_POST['password']);
	// echo $tel;
	// echo $_POST['password'];
}else{
	exit('非法操作');
}

$query="select * from login where tel = '$tel' and password = '$password'";

$result=mysql_query($query);

if(mysql_fetch_array($result)){
	echo true;
}else{
	echo false;
}






	
	
