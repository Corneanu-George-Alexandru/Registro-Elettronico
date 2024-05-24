<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");

	$connection = openConnection();
	
	if(isset($_REQUEST["classeSelezionata"]))
	{
		$classeSelezionata = $_REQUEST["classeSelezionata"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante classeSelezionata.");
	}
	
	$sql = "select nome from classi where id = $classeSelezionata";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>