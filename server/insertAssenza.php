<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");

	$connection = openConnection();

	if(isset($_POST["matr"]))
	{
		$matr = $_POST["matr"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante matr");
	}
	if(isset($_POST["data"]))
	{
		$data = $_POST["data"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante data");
	}
	if(isset($_POST["assenzaVal"]))
	{
		$assenzaVal = $_POST["assenzaVal"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante assenzaVal");
	}

	$sql = "insert into assenze (matricola, data, giustificato) values ($matr, '$data', $assenzaVal)";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>