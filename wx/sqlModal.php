<?php
header('Content-Type:text/html;charset=UTF-8');

/**
* 
*/
class sqlModal_wx
{	
	

	public $conn="";

 	function __construct()
 	{	
 		$dbms='mysql';     //数据库类型='mysql';     //数据库类型
		$host='localhost'; //数据库主机名='localhost'; //数据库主机名
		$dbName='ac';    //使用的数据库='test';    //使用的数据库
		$user='root';      //数据库连接用户名='root';      //数据库连接用户名
		$pass='root';          //对应的密码='';          //对应的密码
		$dsn="$dbms:host=$host;dbname=$dbName";

 		try {
 			$GLOBALS['conn'] = new PDO($dsn, $user, $pass);
 			//echo "连接完成";

 		}catch (PDOException $e) {
    			die ("Error!: " . $e->getMessage() . "<br/>");
		}
	}

	//执行查询
	public function query($sql){
		foreach ($GLOBALS['conn']->query($sql) as $row) {
        $array[] = $row; //你可以用 echo($GLOBAL); 来看到这些值
   		}
   		return $array;


	}
	
	//执行请求
	private function Exec($sql){
			$res =  $GLOBALS['conn']->exec($sql);
			return $res;
	}
	//获取活动
	function getActivity($sql){
		return $this->query($sql);
	}
	
	//获取商户
	function getShopList($sql){
		return $this->query($sql);
	}
	//获取公告
	function getAcActivity($sql){
		return $this->query($sql);
	}
	
	

	function Login($sql){
		return $this->count($sql);
	}




 		

 	
}
    
	?>
