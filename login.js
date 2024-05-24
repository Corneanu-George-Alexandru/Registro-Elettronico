"use strict"

let matricola;

$(document).ready(function() {	
	let _username = $("#usr");
	let _password = $("#pwd");
	let _lblErrore = $("#lblError");
	
	// all'avvio apriamo subito il jumbotron
	$(".jumbotron").trigger("click");
    _lblErrore.hide();

	$("#btnLogin").on("click", controllaLogin);
	
	// il submit deve partire anche senza click 
	// ma con il solo tasto INVIO
	// EVENT --> viene iniettato automaticamente a tutte le funzioni di evento js, contiene informazioni sull'evento generiche
	// event.target è un puntatore js a chi scatena l'evento, è uguale al this
	// event.keycode solo per tastiera contiene il codice del tasto premuto, in questo caso 13 è INVIO
	$(document).on('keydown', function(event) {	
	   if (event.keyCode == 13)  
		   controllaLogin();
	});
	
	
	function controllaLogin(){
		
        _username.removeClass("is-invalid");  // bordo rosso textbox
		_username.prev().removeClass("icona-rossa");  // colore icona				
        _password.removeClass("is-invalid");
		_password.prev().removeClass("icona-rossa"); 

		_lblErrore.hide();		
		
        if (_username.val() == "") {
            _username.addClass("is-invalid"); // bordo rosso textbox
			_username.prev().addClass("icona-rossa"); // colore icona
        } 
		else if (_password.val() == "") {
            _password.addClass("is-invalid"); // bordo rosso textbox
			_password.prev().addClass("icona-rossa"); // colore icona
        }
		else{
			let user=_username.val();
			// md5 restituisce una word esadecimale, quindi occorre .toString()
			let pass=CryptoJS.MD5(_password.val()).toString();
			let _richiestaLogin= inviaRichiesta("POST", "server/logIn.php", 
			                                               { user, pass })
			_richiestaLogin.catch(function(err) {
				if (err.response && err.response.status == 401) { // unauthorized
					_lblErrore.show();
					_lblErrore.children("span").text(err.response.data);
				} 
				else
					errore(err);
			});
			_richiestaLogin.then(function() {
				// if(response.data.ris=="ok")
				window.location.href = "index.html";
			});
		}
	}
	
	_lblErrore.children("button").on("click", function(){
		_lblErrore.hide();
	});

	$("#btnPassDimenticata").on("click", function() {
		let sweetAlertOptionUsername = {
			"title": "RECUPERO PASSWORD",
			"html":
				"<br>" +
				"<p>Inserisci <b>USERNAME</b></p>" +
				"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-user'></i></span><input type='text' class='form-control' id='txtUsername' placeholder='Username'></div>"
		}
		Swal.fire(sweetAlertOptionUsername).then(function() {
			let username = $("#txtUsername").val();
			let rq = inviaRichiesta("GET", "server/getInfoUsername.php", { username });
			rq.catch(errore);
			rq.then(function(response) {
				if(response.data.length == 0)
				{
					let sweetAlertOptionFail = {
						"icon": "error",
						"title": "RECUPERO PASSWORD",
						"html":
							"<br>" +
							"<p>Lo <b>USERNAME</b> inserito non esiste.</p>"
					}
					Swal.fire(sweetAlertOptionFail);
				}
				else
				{
					matricola = response.data[0]["matricola"];
					let sweetAlertOptionMailAddress = {
						"title": "RECUPERO PASSWORD",
						"html":
							"<br>" +
							"<p>Inserisci <b>INDIRIZZO MAIL</b></p>" +
							"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-envelope'></i></span><input type='text' class='form-control' id='txtIndirizzoMail' placeholder='Indirizzo Mail'></div>"
					}
					Swal.fire(sweetAlertOptionMailAddress).then(function() {
						let indirizzoDestinatario = $("#txtIndirizzoMail").val();
						if(indirizzoDestinatario == "" || !indirizzoDestinatario.includes('@') || indirizzoDestinatario.includes("'"))
						{
							let sweetAlertOptionFail = {
								"icon": "error",
								"title": "RECUPERO PASSWORD",
								"html":
									"<br>" +
									"<p>L'<b>INDIRIZZO MAIL</b> inserito non è valido.</p>"
							}
							Swal.fire(sweetAlertOptionFail);
						}
						else
						{
							let rq = inviaRichiesta("POST", "server/inviaMail.php", { indirizzoDestinatario });
							rq.then(function(response) {
								let pass = response.data.slice(response.data.length - 8, response.data.length);
								let rq = inviaRichiesta("POST", "server/updatePassword.php", { pass, matricola });
								rq.catch(errore);
								rq.then(function() {
									let sweetAlertOptionSuccess = {
										"icon": "success",
										"title": "RECUPERO PASSWORD",
										"html":
											"<br>" +
											"<p>Il <b>RECUPERO PASSWORD</b> è avvenuto correttamente, controllare la propria mail per visualizzare la nuova password.</p>"
									}
									Swal.fire(sweetAlertOptionSuccess);
								});
							});
							rq.catch(errore);
						}
					});
				}
			});
		});
	});
});