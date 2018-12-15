<?php
header('Content-Type:text/html;charset=UTF-8');

/**
* 
*/
class sqlModal
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


	public function query($sql){
		foreach ($GLOBALS['conn']->query($sql) as $row) {
        $array[] = $row; //你可以用 echo($GLOBAL); 来看到这些值
   		}
   		return $array;


	}
	private function Insert($sql){
			return $GLOBALS['conn']->query($sql);
	}
	private function Update($sql){

	}
	private function Delete($sql){

	}

	function getActivity($sql){
		return $this->query($sql);
	}
	function addActivity($sql){
		return $this->Insert($sql);
	}
	function getShopList($sql){
		return $this->query($sql);
	}
	function getAcActivity($sql){
		return $this->query($sql);
	}





 		

 	
}
    
	?>
