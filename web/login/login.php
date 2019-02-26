<?php 
error_reporting(0);
session_start();
date_default_timezone_set('Asia/Shanghai');//'Asia/Shanghai'   亚洲/上海

   
header("Content-type:text/html;charset=utf-8");

if(isset($_POST['name'])&&isset($_POST['password'])){
    $name=$_POST['name'];
    $password=$_POST['password'];
    $tem_data = $password.$name;
    if(preg_match('/[-_`~@#\$\^\/%()]/',$tem_data)){
        die('false');
    }
    if(strlen($name) < 2 && strlen($password) < 2){
        die('不可以为空');
    }
    require '../sqlModal/sqlModal.php';
    $modal = new sqlModal();
    $sql="SELECT *FROM manage WHERE name='$name' AND password='$password'";
    $result=$modal->Login($sql);

	if($result == 1)
    {       
         
         $_SESSION['key']=true;
         $_SESSION['user_name'] = $name;
         
         echo "ok";
        
        
	}else{
		 echo "bad";
	}
	
}else{
		echo "不可以为空哦";
   }



?>