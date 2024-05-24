<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");

	$connection = openConnection();
	
	if(isset($_REQUEST["passwordAttuale"]))
	{
		$passwordAttuale = $connection->real_escape_string($_REQUEST["passwordAttuale"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante passwordAttuale.");
	}
	
	$passMd5 = md5($passwordAttuale);
	$sql = "select matricola from studenti where pass = '$passMd5'";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>