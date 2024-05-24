<?php
	header("content-type:application/json; charset=utf-8");
	require("PHPMailer.php");
	require("SMTP.php");
	require("environment.php");

	//Parametri di lavoro
	if(isset($_REQUEST["indirizzoDestinatario"]))
	{
		$indirizzoDestinatario = $_REQUEST["indirizzoDestinatario"];
	}
	else
	{
		http_response_code(400);
		die("Parametro mancante indirizzoDestinatario.");
	}

	// Generazione nuova password
	$newPassword = rand(10000000, 99999999);

	// Gestione invio mail
	$mailer = new PHPMailer\PHPMailer\PHPMailer();
	// Abilita il protocollo SMTP
	$mailer->IsSMTP();
	// 0 --> DISABILITA LA VISUALIZZA DEI MESSAGGI DI STATO
	// 1 --> ABILITA LA VISUALIZZA DEI MESSAGGI DI STATO
	$mailer->SMTPDebug = 1;
	// Configurazione protocollo SMTP
	$mailer->Host = "smtp.gmail.com";
	$mailer->SMTPSecure = "tls";
	$mailer->Port = 587;
	// Configurazione credenziali d'accesso al SMTP server
	$mailer->SMTPAuth = true;
	$mailer->Username = MAIL_ADDRESS;
	$mailer->Password = MAIL_PASSWORD;

	// Setting mail
	$mailer->setFrom(MAIL_ADDRESS);
	$mailer->addAddress($indirizzoDestinatario);
	// CC --> conoscenza
	// BCC --> conoscenza nascosta
	//$mailer->addCC();
	$mailer->Subject = "New password";
	$fileName = "./message.html";
	$fh = fopen($fileName, "r");
	$body = "This is your new password: <b>$newPassword</b>";
	if($fh)
	{
		$body = fread($fh, filesize($fileName));
		// Vai dentro $body, cerchi __password e lo sostituisci con $newPassword creando una nuova stringa che vai ad assegnare a $body
		$body = str_replace("__password", $newPassword, $body);
		fclose($fh);
	}
	$mailer->Body = $body;
	$mailer->isHTML(true);

	// Spedizione mail
	// send restituisce TRUE se l'ha inviata, FALSE in caso di errore
	if($mailer->send())
	{
		http_response_code(200);
		echo(json_encode($newPassword));
	}
	else
	{
		http_response_code(550);
		echo(json_encode("Errore invio mail " . $mailer->ErrorInfo));
	}
?>