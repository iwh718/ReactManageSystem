<?php 
//error_reporting(0);
session_start();
date_default_timezone_set('Asia/Shanghai');//'Asia/Shanghai'   亚洲/上海
if (!isset($_SESSION['key'])||$_SESSION['key']!=true){
 
    echo "<script>";
    echo "alert('你没有访问权限！！')";
    echo "</script>";
    die();
  

}
?>
<?php

require '../sqlModal/sqlModal.php';

$modal = new sqlModal();

if(isset($_REQUEST['getDataKey'])){
		switch ($_REQUEST['getDataKey']) {
			case 'getShopActivity':
			$sql = 'SELECT *FROM activity';
			$arr = $modal->getActivity($sql);
			echo json_encode($arr,true);
		break;
	case 'getIndexActivity':
		# code...
		break;
	case 'getAcActivity':
		$sql = 'SELECT *FROM acactivity';
			$arr = $modal->getAcActivity($sql);
			echo json_encode($arr,true);
		break;
	case 'getUserList':
		# code...
		break;
	case 'getShopList':
			$sql = 'SELECT *FROM shop';
			$arr = $modal->getShopList($sql);
			echo json_encode($arr,true);
		break;
	case 'getCookie':
		
		echo $_SESSION['user_name'];
		break;	
	
	default:
		echo "error";
		break;
}

}else{
	die('error:没有请求哦');
}

?>