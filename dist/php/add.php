<?php  
	
	require "conn.php";


	$content=$_GET['sid'];
	$where=$_GET['url'];
	


	mysql_query("insert infomation values(null,'$content','$where','$idea',NOW())");

	echo '数据添加成功';

?>