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
if(isset($_REQUEST['addDataKey'])){
		switch ($_REQUEST['addDataKey']) {
			case 'addActivity':
			$title = $_REQUEST['title'];
			$acttime = $_REQUEST['acttime'];
			$actdesc = $_REQUEST['actdesc'];
			$url = $_REQUEST['url'];
			$logo = $_REQUEST['logo'];
			$actsort = $_REQUEST['actsort'];
			$shopname = $_REQUEST['shopname'];
			$uploadfile = '';//图片路径
			if(is_uploaded_file($_FILES['banner']['tmp_name'])){
                        $tenNameType=strrchr($_FILES['banner']['name'],'.');
                        $time=time();
                        if($tenNameType!='.jpg'&&$tenNameType&&'.jpeg'&&$tenNameType!='.png'){
                           echo "图片格式有误";
                        }else{
                              $root_dir ="../img/banner/";
                              $uploadfile = $root_dir.$time.$tenNameType;
                              
                                if (move_uploaded_file($_FILES['banner']['tmp_name'], $uploadfile)) {
                                	$uploadfile = "img/banner/".$time.$tenNameType;
                                           $sql = "INSERT INTO activity (title,actdesc,url,acttime,banner,shopId,actsort,shoplogo) values('$title','$actdesc','$url','$acttime','$uploadfile','$shopname','$actsort','$logo')";
									echo $modal->addActivity($sql);
                                }else{
                                       die('移动出错');
                                }  
                            }
                                    
               
                }else{ 
                        die('上传出错');
				}
			
			
		break;
	case 'addIndexActivity':
		# 添加推荐活动
		break;
	case 'addAcActivity':
		# 添加公告
		$title = $_REQUEST['title'];
		$url  = $_REQUEST['url'];
		$datatime = date("Y-m-d");
		$sql = "INSERT INTO acactivity (title,datetimes,url) values('$title','$datatime','$url')";
		echo $modal->addAcActivity($sql);
		break;
	case 'removeShopList':
		# 删除商户
		$id = $_REQUEST['id'];
		$sql = "DELETE FROM shop WHERE Id ='$id'";
		echo $modal->removeShopList($sql);
		break;
	case 'addShopList':

		    $name = $_REQUEST['name'];
			$phone = $_REQUEST['phone'];
			$desc = $_REQUEST['desc'];
			$address = $_REQUEST['address'];
		
			$uploadfile = '';//图片路径
			if(is_uploaded_file($_FILES['logo']['tmp_name'])){
                        $tenNameType=strrchr($_FILES['logo']['name'],'.');
                        $time=time();
                        if($tenNameType!='.jpg'&&$tenNameType&&'.jpeg'&&$tenNameType!='.png'){
                           echo "图片格式有误";
                        }else{
                              $root_dir ="../img/logo/";
                              $uploadfile = $root_dir.$time.$tenNameType;
                              
                                if (move_uploaded_file($_FILES['logo']['tmp_name'], $uploadfile)) {
                                	$uploadfile = "img/logo/".$time.$tenNameType;
                                           $sql = "INSERT INTO shop (name,phone,shopdesc,address,logo) values('$name','$phone','$desc','$address','$uploadfile')";
									echo $modal->addShopList($sql);
									
                                }else{
                                       die('移动出错');
                                }  
                            }
                                    
               
                }else{ 
                        die('上传出错');
				}
			
		break;
	case 'removeActivity':
		$id = $_REQUEST['Id'];
		$sql = "DELETE FROM activity WHERE Id ='$id'";
		echo $modal->removeActivity($sql);
		break;
	case 'outSign':
		$_SESSION['key']=false;
		session_destroy();
		echo "ok";
		break;	
	case 'removeAcActivity':
	$id = $_REQUEST['id'];
		$sql ="DELETE FROM acactivity WHERE Id ='$id'";
		echo $modal->removeAcActivity($sql);
		break;	
	default:
		echo "error";
		break;
}

}else{
	die('error:没有请求哦');
}



?>