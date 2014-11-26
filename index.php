<!DOCTYPE html>
<html>

<head>

	<meta charset="UTF-8">

	<title>Hello World</title>

	<link rel="stylesheet" type="text/css" medio="screen" href="css/style.css" />
	<script type="text/javascript" src="js/smooth.js"></script>

</head>
<body style="background-attachment: fixed">
<!--	<header class="myheader">
		<div>
            <p>心愿墙</p>
		</div>
	</header>
<!-- 	<form>
		<input type="text" class="text" name="name" placeholder="Name">
	</form>
 -->
	<div id="page" />

    <?php
        $link = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
        mysql_select_db('app_yuzero',$link);


		if ($_POST["name"] != ""){
        	$sql = "insert into girlinfo values (null,'".$_POST["name"]."','".$_POST["phone"]."','".$_POST["wish"]."');";
        	$result = mysql_query($sql);
    	}



        $result = mysql_query("select id,wish,name from girlinfo");


        while ($row = mysql_fetch_row($result)){
            echo '<ul class="live" onmouseover="playSound(event)" onmouseout="ulOut(event)">';
            $tmp = 1;
            foreach ($row as $data){
                if ($tmp == 1){
                	echo '<li onmouseover="liOut(event)">这是第'.$data.'条愿望</li>';
                    echo '<li onmouseover="liOut(event)">我想...</li>';
                } else if ($tmp == 2){
                	echo '<li onmouseover="liOut(event)">'.$data.'</li>';
                } else if ($tmp == 3){
                    echo '<li onmouseover="liOut(event)">By：'.$data.'</li>';
                }
                
                $tmp ++;
            }
            echo '</ul>';
        }
    ?>

    <br>
	<br>
    <br>
    <br>
    <br>
    <br>
    <br>

	<div id="girl" />

	<form class="contact_form" action="" method="post" name="contact_form">
		<ul>
			<li><h2><b>写下一个愿望</b></h2></li>
			<li><label for="Name">姓名:</label>
                <input style="background-color:transparent" type="Name" name="name" required/></li>
            <li><label for="Tel">电话:</label>
                <input style="background-color:transparent" type="Tel" name="phone"required/></li>
            <li><label for="Dream">愿望:</label>
                <textarea style="background-color:transparent;"name="wish" cols="27" rows="5" type="Dream"required></textarea></li>
            <li><button class="submit" type="submit">提交</button></li>
        </ul>
</form>

	<br>
	<br>
    <br>
    <br>
    <br>
    <br>
    <br>

	<div id="boy" />


   	<form class="contact_form" action="" method="post" name="contact_form">
		<ul>
			<li><h2><b>领取一个愿望</b></h2></li>
			<li><label for="Name">姓名:</label>
                <input style="background-color:transparent" type="Name" name="Name" required/></li>
            <li><label for="QQ">愿望id:</label>
                <input style="background-color:transparent" type="QQ" name="QQ" required/></li>
            <li><label for="Tel">电话:</label>
                <input style="background-color:transparent" type="Tel" name="Tel"required/></li>
            <li><button class="submit" type="submit">确定</button></li>
        </ul>
   </form>
	<!-- <a id="gototop" href="js:void(0);" onclick="goTop();return false;">Top of Page</a> -->
	<a class="backtop" id="gototop" onclick="goTop();">
		<img src="res/image/backtop.png"/>
	</a>
	<a class="togirl" id="gotogirl" href="#girl">
		<img src="res/image/girl.png"/>
	</a>
	<a class="toboy" id="gotoboy" href="#boy">
		<img src="res/image/boy.png"/>
	</a>
	<a class="page" id="gotopage" href="#page">
		<img src="res/image/page.png"/>
	</a>
	<div id="sounds"></div>
</body>

</html>