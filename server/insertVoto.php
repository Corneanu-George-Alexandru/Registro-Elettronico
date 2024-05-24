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
	if(isset($_POST["materiaSelezionata"]))
	{
		$materiaSelezionata = $_POST["materiaSelezionata"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante materiaSelezionata");
	}
	if(isset($_POST["votoVal"]))
	{
		$votoVal = $_POST["votoVal"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante votoVal");
	}

	$sql = "insert into voti (matricola, data, materia, voto) values ($matr, '$data', $materiaSelezionata, $votoVal)";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>