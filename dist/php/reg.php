<?php
	require "conn.php";
	if(isset($_POST['tel'])){
		$tel=@$_POST['tel'];
	}else{
		exit('非法操作');
	}

	$query="select * from login where tel='$tel'";
	$result=mysql_query($query);
	
	if(mysql_fetch_array($result)){
		echo 'false';
	}else{
		echo 'true';
	}
	
	
	if(isset($_POST['tel']) && isset($_POST['pass'])){
		$tel=@$_POST['tel'];
		$pass=md5($_POST['pass']);
		mysql_query("insert `login` values(null,'$tel','$pass',NOW())");
	}

?>