<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");
	
	$connection = openConnection();
	
	if(isset($_REQUEST["matricolaStudente"]))
	{
		$matricolaStudente = $_REQUEST["matricolaStudente"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante matricolaStudente.");
	}
	if(isset($_REQUEST["materiaSelezionata"]))
	{
		$materiaSelezionata = $_REQUEST["materiaSelezionata"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante materiaSelezionata.");
	}
	
	$sql = "select * from voti where matricola = $matricolaStudente and materia = $materiaSelezionata";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>