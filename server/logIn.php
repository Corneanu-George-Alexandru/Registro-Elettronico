<?php
	header("content-type:application/json; charset=utf-8");
	require("MySQLi.php");

	$connection = openConnection();
	
	//Parametri
	if(isset($_REQUEST["user"]))
	{
		$user = $connection->real_escape_string($_REQUEST["user"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante user.");
	}
	if(isset($_REQUEST["pass"]))
	{
		$pass = $connection->real_escape_string($_REQUEST["pass"]);
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante pass.");
	}
	
	$sql = "select * from studenti where user = '$user'";
	// $data è un vettore enumerativo di vettori associativi
	$data = eseguiQuery($connection, $sql);

	if(count($data) > 0)
	{
		if($data[0]["pass"] == $pass)
		{
			http_response_code(200);
			echo(json_encode("Ok"));
			session_start();
			$_SESSION["user"] = $data[0]["user"];
			$_SESSION["scadenza"] = time() + TIME_OUT;
			// 1. NOME COOKIE = session_name() --> è il nome della sezione, default è PHPSESSID
			// 2. VALORE COOKIE = session_id() --> è il valore della sezione
			// 3. SCADENZA COOKIE = $_SESSION["scadenza"] --> è la scadenza della sezione
			// 4. PATH COOKIE = /
			setcookie(session_name(), session_id(), $_SESSION["scadenza"], "/");
		}
		else
		{
			http_response_code(401);
			die("Password non esistente");
		}
	}
	else
	{
		http_response_code(401);
		die("Username non esistente");
	}

	$connection->close();
?>