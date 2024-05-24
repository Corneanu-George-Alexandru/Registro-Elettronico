"use strict";

const _URL = "" // "http://localhost/4B"
// Se vuota viene assegnata in automatico l'origine da cui è stata scaricata la pagina

function inviaRichiesta(method, url, parameters={}) {
		let config={
		"baseURL":_URL,
		"url":  url, 
		"method": method.toUpperCase(),
		"headers": {
			"Accept": "application/json",
		},
		"timeout": 15000,
		"responseType": "json",
	}
	if(parameters instanceof FormData){
		// Prende il formData così com'è e lo salva nel body dell'http request
		config.headers["Content-Type"]='multipart/form-data;' 
		config["data"]=parameters     // Accept FormData, File, Blob
	}	
	else if(method.toUpperCase()=="GET"){
		// Converte in formato urlencoded e li concatena alla url
		config.headers["Content-Type"]='application/x-www-form-urlencoded;charset=utf-8' 
		config["params"]=parameters   
	}
	else{
		// In PHP anche i parametri body devono essere convertiti in urlencoded
		// Converte in urlencoded e li mette nel body dell'http request
	    config.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=utf-8' 
		// Viceversa in JSON-SERVER e NODEJS i parametri body devono essere passati in JSON SERIALIZZATO
		// Serializza i parametri json e li mette nel body dell'http request
		//config.headers["Content-Type"] = 'application/json; charset=utf-8' 
	    config["data"]=parameters     
	}	
	return axios(config)             
}

function errore(err) {
	if(!err.response) 
		alert("Connection Refused or Server timeout");	
	else if (err.response.status == 200)
        alert("Formato dei dati non corretto : " + err.response.data);
	else if(err.response.status == 403){
		//alert(err.response.data);
		window.location.href="login.html";
	}
    else{
        alert("Server Error: " + err.response.status + " - " + err.response.data);
	}
}

