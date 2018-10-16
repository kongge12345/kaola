<?php
    include "conn.php";
    
    $result=mysql_query("select * from carts");

    $picarr=array();

    for($i=0; $i < mysql_num_rows($result); $i++){
        $picarr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
    }

    echo json_encode($picarr);

?>