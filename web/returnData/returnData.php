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
	
	default:
		echo "error";
		break;
}

}else{
	die('error:没有请求哦');
}

?>