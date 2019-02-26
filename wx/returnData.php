
<?php

require './sqlModal.php';

$modal = new sqlModal_wx();

if(isset($_REQUEST['getDataKey'])){
		switch ($_REQUEST['getDataKey']) {
			case 'getShopActivity':

			$actsort = $_REQUEST['acsort'];
			switch ($actsort) {
				case '游玩':
				case '学习':				
				case '驾考':	
				case '生活':
					$sql = "SELECT *FROM activity WHERE actsort = '$actsort' ORDER BY Id DESC";		
					break;
				
				default:
					$sql = 'SELECT *FROM activity ORDER BY Id DESC';
			
					break;
			}
			
			$arr = $modal->getActivity($sql);
			echo json_encode($arr,true);
		break;
	case 'getIndexActivity':
		# code...
		break;
	case 'getAcActivity':
		$sql = 'SELECT *FROM acactivity ORDER BY  Id DESC limit 1';
			$arr = $modal->getAcActivity($sql);
			echo json_encode($arr,true);
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