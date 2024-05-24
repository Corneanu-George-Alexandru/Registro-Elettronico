<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");

	$connection = openConnection();

	checkSession();
	if(isset($_SESSION["user"]))
	{
		$user = $connection->real_escape_string($_SESSION["user"]);
	}
	else
	{
		http_response_code(403);
		die("Variabile di sessione mancante: user.");
	}

	$sql = "select matricola, cognome, nome, classe, residenza, indrizzo, immagine from studenti where user = '$user'";
	$data = eseguiQuery($connection, $sql);

	http_response_code(200);
	echo(json_encode($data));

	$connection->close();
?>