<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");

	$connection = openConnection();

	if(isset($_POST["data"]))
	{
		$data = $_POST["data"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante data");
	}
	if(isset($_POST["mat"]))
	{
		$mat = $_POST["mat"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante mat");
	}
	if(isset($_POST["argomento"]))
	{
		$argomento = $connection->real_escape_string($_REQUEST["argomento"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante argomento");
	}
	if(isset($_POST["classe"]))
	{
		$classe = $connection->real_escape_string($_REQUEST["classe"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante classe");
	}

	$sql = "insert into argomenti (classe, data, materia, argomento) values ('$classe', '$data', $mat, '$argomento')";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>