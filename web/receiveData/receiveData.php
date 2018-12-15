<?php

require '../sqlModal/sqlModal.php';

$modal = new sqlModal();
if(isset($_REQUEST['addDataKey'])){
		switch ($_REQUEST['addDataKey']) {
			case 'addActivity':
			$title = $_REQUEST['title'];
			$acttime = $_REQUEST['acttime'];
			$actdesc = $_REQUEST['actdesc'];
			$url = $_REQUEST['url'];
			$shopname = $_REQUEST['shopname'];
			$uploadfile = '';//图片路径
			if(is_uploaded_file($_FILES['add-activity-banner']['tmp_name'])){
                        $tenNameType=strrchr($_FILES['banner']['name'],'.');
                        $time=time();
                        if($tenNameType!='.jpg'&&$tenNameType&&'.jpeg'&&$tenNameType!='.png'){
                           echo false;
                        }else{
                              $root_dir ="../img/banner/";
                              $uploadfile = $root_dir.$time.$tenNameType;
                              
                                if (move_uploaded_file($_FILES['add-activity-banner']['tmp_name'], $uploadfile)) {
                                            echo "上传完成";
                                }else{
                                       die('移动出错');
                                }  
                            }
                                    
               
                }else{ 
                        die('上传出错');
				}
			
			$sql = 'INSERT INTO activity (title,actdesc,url,acttime,banner,shopname) values($title,$actdesc,$url,$acttime,$uploadfile,$shopname)';
			echo $modal->addActivity($sql);
		break;
	case 'addIndexActivity':
		# 添加推荐活动
		break;
	case 'addAcActivity':
		# 添加公告
		break;
	case 'deleteShopList':
		# 删除商户
		break;
	case 'addShopList':
		# 添加商户
		break;
	case 'addBanner':
		# 添加banner
		break;
	default:
		echo "error";
		break;
}

}else{
	die('error:没有请求哦');
}



?>