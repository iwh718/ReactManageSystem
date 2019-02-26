<!DOCTYPE html>
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
<html lang="en">
<head>
    <title>AC管理页面</title>
    <meta charset="UTF-8">
        <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <link href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="css/AC.css" rel="stylesheet">

</head>
<body>
<div class="bg">
    <div id="app"></div>
    </div>

</body>

<script type="text/javascript" src="./bundle.js"></script>

</html>