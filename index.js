"use strict";

let matricola;
let datiDB;
let btnAssenza;
let classeSelezionata;
let materiaSelezionata;

$(function () {
	let wrapper = $("#wrapper");
	let studente = $("#studente");
	let docente = $("#docente");
	let nominativoStud = $("#nominativoStud");
	let nominativoDoc = $("#nominativoDoc");
	let itemStudente = $("#itemStudente").find("a");
	let wrapperAnagrafico = $("#wrapperAnagrafico");
	let wrapperArgomenti = $("#wrapperArgomenti");
	let wrapperAssenze = $("#wrapperAssenze");
	let wrapperVoti = $("#wrapperVoti");
	let mainWrapper = $("#mainWrapper");
	let imgUser = $("#imgUser").children("img");
	let txtCognomeNome = $("#txtCognomeNome");
	let txtMatricola = $("#txtMatricola");
	let txtClasse = $("#txtClasse");
	let txtResidenza = $("#txtResidenza");
	let btnModifica = $("#btnModifica");
	let btnAnnulla = $("#btnAnnulla");
	let tableValutazioni = $("#tableValutazioni");
	let tableAssenze = $("#tableAssenze");
	let tableArgomenti = $("#tableArgomenti");
	let classiMaterie = $("#classiMaterie");
	let mainWrapperDocente = $("#mainWrapperDocente");
	let itemDocente = $("#itemDocente").find("a");
	let lstClassi = $("#lstClassi");
	let lstMaterie = $("#lstMaterie");
	let wrapperAnagraficoDocente = $("#wrapperAnagraficoDocente");
	let imgUserDoc = $("#imgUserDoc").children("img");
	let txtCognomeNomeDocente = $("#txtCognomeNomeDocente");
	let txtMatricolaDocente = $("#txtMatricolaDocente");
	let txtResidenzaDocente = $("#txtResidenzaDocente");
	let btnModificaDocente = $("#btnModificaDocente");
	let btnAnnullaDocente = $("#btnAnnullaDocente");
	let wrapperAssenzeDocente = $("#wrapperAssenzeDocente");
	let wrapperVotiDocente = $("#wrapperVotiDocente");
	let wrapperArgomentiDocente = $("#wrapperArgomentiDocente");
	let btnInserisciVoto = $("#btnInserisciVoto");
	let valutazioniDocente = $("#valutazioniDocente");
	let modificaVoto = wrapperVotiDocente.children("div");
	let assenzeDocente = $("#assenzeDocente");
	let btnInserisciAssenze = $("#btnInserisciAssenze");
	let argomentiDocente = $("#argomentiDocente");
	let btnInserisciArgomenti = $("#btnInserisciArgomenti");

	wrapper.hide();
	studente.hide();
	docente.hide();
	wrapperAssenze.hide();
	wrapperVoti.hide();
	wrapperAnagrafico.hide();
	btnModifica.prop("disabled", true);
	btnAnnulla.prop("disabled", true);
	
	let rq = inviaRichiesta("GET", "server/getInfoLogin.php");
	rq.catch(errore);
	rq.then(function (response) {
		console.log(response.data);
		wrapper.show();
		datiDB = response.data[0];
		if(response.data[0]["classe"] == "")
		{
			docente.show();
			classiMaterie.show();
			let cognomeNome = (response.data[0]["cognome"]+ " " + response.data[0]["nome"]).toUpperCase();
			nominativoDoc.html(`Benvenuto <b>${cognomeNome}</b>`);
			$("#btnLogoutDocente").on("click", logout);
			$("#btnCambiaPasswordDocente").on("click", cambiaPassword);
			mainWrapperDocente.hide();
			wrapperAnagraficoDocente.hide();
			wrapperAssenzeDocente.hide();
			wrapperArgomentiDocente.hide();
			wrapperVotiDocente.hide();
			caricaClassi();
			lstMaterie.prop("disabled", true);
			lstClassi.on("change", caricaMaterie);
			lstMaterie.on("change", function() {
				materiaSelezionata = $(this).val();
				mainWrapperDocente.show();
				itemDocente.on("click", attivaSezioneDocente);
				$(".infoAnagrafico").on("click", function() {
					mainWrapperDocente.hide();
					classiMaterie.hide();
					wrapperAnagraficoDocente.show();
					insertDatiAnagraficoDocente();
					wrapperVotiDocente.hide();
					wrapperAssenzeDocente.hide();
					wrapperArgomentiDocente.hide();
				});
				$(".infoAssenze").on("click", function() {
					mainWrapperDocente.hide();
					classiMaterie.hide();
					wrapperAssenzeDocente.show();
					insertAssenzeDocente();
					wrapperVotiDocente.hide();
					wrapperAnagraficoDocente.hide();
					wrapperArgomentiDocente.hide();
					btnInserisciAssenze.on("click", inserisciAssenza);
				});
				$(".infoVoti").on("click", function() {
					mainWrapperDocente.hide();
					classiMaterie.hide();
					wrapperVotiDocente.show();
					insertVotiDocente();
					modificaVoto.hide();
					wrapperAssenzeDocente.hide();
					wrapperAnagraficoDocente.hide();
					wrapperArgomentiDocente.hide();
					btnInserisciVoto.on("click", inserisciVoto);
				});
				$(".infoArgomenti").on("click", function() {
					mainWrapperDocente.hide();
					classiMaterie.hide();
					wrapperArgomentiDocente.show();
					insertArgomentiDocente();
					wrapperAssenzeDocente.hide();
					wrapperAnagraficoDocente.hide();
					wrapperVotiDocente.hide();
					btnInserisciArgomenti.on("click", inserisciArgomenti);
				});
			});
		}
		else
		{
			studente.show();
			let cognomeNome = (response.data[0]["cognome"]+ " " + response.data[0]["nome"]).toUpperCase();
			nominativoStud.html(`Benvenuto <b>${cognomeNome}</b>`);
			$("#btnLogoutStudente").on("click", logout);
			$("#btnCambiaPasswordStudente").on("click", cambiaPassword);
			itemStudente.on("click", attivaSezione);
			wrapperAssenze.hide();
			wrapperArgomenti.hide();
			wrapperVoti.hide();
			wrapperAnagrafico.hide();
			$(".infoAssenze").on("click", function() {
				mainWrapper.hide();
				wrapperAssenze.show();
				insertAssenze();
			});
			$(".infoVoti").on("click", function() {
				mainWrapper.hide();
				wrapperVoti.show();
				insertVoti();
			});
			$(".infoAnagrafico").on("click", function() {
				mainWrapper.hide();
				wrapperAnagrafico.show();
				insertDatiAnagrafico();
			});
			$(".infoArgomenti").on("click", function() {
				mainWrapper.hide();
				wrapperArgomenti.show();
				insertArgomenti();
			});
		}

		function logout() {
			let rq = inviaRichiesta("post", "server/logOut.php");
			rq.catch(errore);
			rq.then(function() {
				let sweetAlertOption = {
					"icon": "success",
					"title": "LOGOUT",
					"html":
						"<br>" +
						"<p>Il <b>LOGOUT</b> è avvenuto correttamente.</p>"
				}
				Swal.fire(sweetAlertOption).then(function() {
					window.location.href = "login.html";
				});
			});
		}

		function cambiaPassword() {
			let sweetAlertOptionPassword = {
				"title": "CAMBIO PASSWORD",
				"html":
					"<br>" +
					"<p>Inserisci <b>PASSWORD ATTUALE</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-key'></i></span><input type='password' class='form-control' id='txtPassAttuale' placeholder='Password Attuale'></div>"
			}
			Swal.fire(sweetAlertOptionPassword).then(function() {
				let passwordAttuale = $("#txtPassAttuale").val();
				let rq = inviaRichiesta("GET", "server/getInfoPassword.php", { passwordAttuale });
				rq.catch(errore);
				rq.then(function(response) {
					if(response.data.length == 0)
					{
						let sweetAlertOptionFail = {
							"icon": "error",
							"title": "CAMBIO PASSWORD",
							"html":
								"<br>" +
								"<p>La <b>PASSWORD</b> inserita non esiste.</p>"
						}
						Swal.fire(sweetAlertOptionFail);
					}
					else
					{
						matricola = response.data[0]["matricola"];
						let sweetAlertOptionNuovaPassword = {
							"title": "CAMBIO PASSWORD",
							"html":
								"<br>" +
								"<p>Inserisci <b>NUOVA PASSWORD</b></p>" +
								"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-key'></i></span><input type='password' class='form-control' id='txtPassNuova' placeholder='Password Nuova'></div>"
						}
						Swal.fire(sweetAlertOptionNuovaPassword).then(function() {
							let pass = $("#txtPassNuova").val();
							let rq = inviaRichiesta("POST", "server/updatePassword.php", { pass, matricola });
							rq.catch(errore);
							rq.then(function() {
								let sweetAlertOptionSuccess = {
									"icon": "success",
									"title": "CAMBIO PASSWORD",
									"html":
										"<br>" +
										"<p>Il <b>CAMBIO PASSWORD</b> è avvenuto correttamente. Riaccesso richiesto.</p>"
								}
								Swal.fire(sweetAlertOptionSuccess).then(function() {
									window.location.href = "login.html";
								});
							});
						});
					}
				});
			});
		}

		function attivaSezione() {
			switch($(this).prop("id")) {
				case 'home':
					mainWrapper.show();
					wrapperAnagrafico.hide();
					wrapperArgomenti.hide();
					wrapperAssenze.hide();
					wrapperVoti.hide();
					break;
				case 'voti':
					mainWrapper.hide();
					wrapperAnagrafico.hide();
					wrapperArgomenti.hide();
					wrapperAssenze.hide();
					wrapperVoti.show();
					insertVoti();
					break;
				case 'argomenti':
					mainWrapper.hide();
					wrapperAnagrafico.hide();
					wrapperArgomenti.show();
					wrapperAssenze.hide();
					wrapperVoti.hide();
					insertArgomenti();
					break;
				case 'assenze':
					mainWrapper.hide();
					wrapperAnagrafico.hide();
					wrapperArgomenti.hide();
					wrapperAssenze.show();
					wrapperVoti.hide();
					insertAssenze();
					break;
				case 'anagrafico':
					mainWrapper.hide();
					wrapperAnagrafico.show();
					wrapperArgomenti.hide();
					wrapperAssenze.hide();
					wrapperVoti.hide();
					insertDatiAnagrafico();
					break;
			}
		}
		
		function insertAssenze() {
			tableAssenze.children("tbody").empty();
			matricola = datiDB["matricola"];
			let rq = inviaRichiesta("GET", "server/getAssenze.php", { matricola });
			rq.catch(errore);
			rq.then(async function(response) {
				for(let assenza of response.data)
				{
					let tr = $("<tr>").appendTo(tableAssenze.children("tbody"));
					$("<td>").appendTo(tr).text(assenza["data"]);
					if(assenza["giustificato"] == 1)
					{
						let td = $("<td>").appendTo(tr).text("Giustificata");
						td.css("color", "green");
						td = $("<td>").appendTo(tr);
						$("<input type=button>").val("Giustifica").prop("id", assenza["id"]).prop("disabled", true).appendTo(td).on("click", giustificaAssenza);
					}
					else
					{
						let td = $("<td>").appendTo(tr).text("Da giustificare");
						td.css("color", "red");
						td = $("<td>").appendTo(tr);
						$("<input type=button>").val("Giustifica").prop("id", assenza["id"]).appendTo(td).on("click", await giustificaAssenza);
					}
				}
				tableAssenze.DataTable({
					order: [[0, 'desc']],
					destroy: true,
   					searching: true,
					paging: true
				});
			});
		}

		function giustificaAssenza() {
			btnAssenza = $(this); 
			let sweetAlertOptionGiustificazioneAssenza = {
				"title": "GIUSTIFICAZIONE ASSENZA",
				"html":
					"<br>" +
					"<p>Inserisci <b>PASSWORD</b> per <b>GIUSTIFICARE</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-key'></i></span><input type='password' class='form-control' id='txtPassAttuale' placeholder='Password'></div>"
			}
			Swal.fire(sweetAlertOptionGiustificazioneAssenza).then(function() {
				let passwordAttuale = $("#txtPassAttuale").val();
				let rq = inviaRichiesta("GET", "server/getInfoPassword.php", { passwordAttuale });
				rq.catch(errore);
				rq.then(function(response) {
					if(response.data.length == 0)
					{
						let sweetAlertOptionFail = {
							"icon": "error",
							"title": "GIUSTIFICAZIONE ASSENZA",
							"html":
								"<br>" +
								"<p>La <b>PASSWORD</b> inserita non esiste.</p>"
						}
						Swal.fire(sweetAlertOptionFail);
					}
					else
					{
						let idAssenza = btnAssenza.prop("id");
						let rq = inviaRichiesta("GET", "server/updateAssenza.php", { idAssenza });
						rq.catch(errore);
						rq.then(function() {
							let sweetAlertOptionSuccess = {
								"icon": "success",
								"title": "GIUSTIFICAZIONE ASSENZA",
								"html":
									"<br>" +
									"<p>La <b>GIUSTIFICAZIONE ASSENZA</b> è avvenuto correttamente.</p>"
							}
							Swal.fire(sweetAlertOptionSuccess).then(function() {
								location.reload();
							});
						});
					}
				});			
			});
		}

		function insertVoti() {
			tableValutazioni.children("tbody").empty();
			matricola = datiDB["matricola"];
			let rq = inviaRichiesta("GET", "server/getValutazioni.php", { matricola });
			rq.catch(errore);
			rq.then(async function(response) {
				for(let valutazione of response.data)
				{
					let tr = $("<tr>").appendTo(tableValutazioni.children("tbody"));
					$("<td>").appendTo(tr).text(valutazione["data"]);
					let materia = valutazione["materia"];
					await inviaRichiesta("GET", "server/getMateria.php", { materia })
					.then(function(response) {
						$("<td>").appendTo(tr).text(response.data[0]["materia"]);
					})
					.catch(errore);
					let voto = $("<td>").appendTo(tr).text(valutazione["voto"]);
					if(valutazione["voto"] >= 6)
					{
						voto.css("color", "green");
					}
					else
					{
						voto.css("color", "red");
					}
					$("<td>").appendTo(tr).text("docente");
				}
				tableValutazioni.DataTable({
					order: [[0, 'desc']],
					destroy: true,
   					searching: true,
					paging: true
				});
			});
		}

		function insertArgomenti() {
			tableArgomenti.children("tbody").empty();
			let classe = datiDB["classe"];
			let rq = inviaRichiesta("GET", "server/getArgomenti.php", { classe });
			rq.catch(errore);
			rq.then(async function(response) {
				for(let argomento of response.data)
				{
					let tr = $("<tr>").appendTo(tableArgomenti.children("tbody"));
					$("<td>").appendTo(tr).text(argomento["data"]);
					let materia = argomento["materia"];
					await inviaRichiesta("GET", "server/getMateria.php", { materia })
					.then(function(response) {
						$("<td>").appendTo(tr).html(`<b>${response.data[0]["materia"]}:</b> ${argomento["argomento"]}<br>`);
					})
					.catch(errore);
				}
				tableArgomenti.DataTable({
					order: [[0, 'desc']],
					destroy: true,
   					searching: true,
					paging: true
				});
			});
		}

		function insertDatiAnagrafico() {
			imgUser.prop("src", `img/${datiDB["immagine"]}`);
			txtCognomeNome.val(datiDB["cognome"] + " " + datiDB["nome"]);
			txtClasse.val(datiDB["classe"]);
			txtMatricola.val(datiDB["matricola"]);
			txtResidenza.val(datiDB["residenza"] + " - " + datiDB["indrizzo"]);
			txtResidenza.on("input", function() {
				btnModifica.prop("disabled", false);
				btnAnnulla.prop("disabled", false);
				btnModifica.on("click", function() {
					let location = txtResidenza.val().split(" - ");
					let residenza = location[0];
					let indirizzo = location[1];
					matricola = txtMatricola.val();
					let rq = inviaRichiesta("POST", "server/updateResidenza.php", {residenza, indirizzo, matricola });
					rq.catch(errore);
					rq.then(function() {
						let sweetAlertOptionSuccess = {
							"icon": "success",
							"title": "MODIFICA DATI ANAGRAFICO",
							"html":
								"<br>" +
								"<p>La <b>MODIFICA</b> è avvenuto correttamente.</p>"
						}
						Swal.fire(sweetAlertOptionSuccess).then(function() {
							let rq = inviaRichiesta("GET", "server/getResidenza.php", { matricola });
							rq.catch(errore);
							rq.then(function(response) {
								txtResidenza.val(response.data[0]["residenza"] + " - " + response.data[0]["indrizzo"]);
								btnModifica.prop("disabled", true);
								btnAnnulla.prop("disabled", true);
							});
						});
					});
				});
				btnAnnulla.on("click", function() {
					txtResidenza.val(datiDB["residenza"] + " - " + datiDB["indrizzo"]);
					btnModifica.prop("disabled", true);
					btnAnnulla.prop("disabled", true);
				});
			});
			imgUser.on("click", function() {
				let sweetAlertOptionCambiaFotoProfilo = {
					"title": "CAMBIA FOTO PROFILO",
					"html":
						"<br>" +
						"<p>Seleziona <b>FOTO</b></p>" +
						"<input type='file' id='txtFile'>"
				}
				Swal.fire(sweetAlertOptionCambiaFotoProfilo).then(function() {
					let filePath = $("#txtFile").val();
					let file;
					if(filePath.includes("2."))
						file = "2.jpg";
					else if(filePath.includes("1."))
						file = "1.jpg";
					matricola = datiDB["matricola"];
					let rq = inviaRichiesta("POST", "server/updateFotoProfilo.php", { file, matricola });
					rq.catch(errore);
					rq.then(function() {
						let sweetAlertOptionSuccess = {
							"icon": "success",
							"title": "CAMBIA FOTO PROFILO",
							"html":
								"<br>" +
								"<p>Il <b>CAMBIA FOTO PROFILO</b> è avvenuto correttamente.</p>"
						}
						Swal.fire(sweetAlertOptionSuccess).then(function() {
							let rq = inviaRichiesta("GET", "server/getFotoProfilo.php", { matricola });
							rq.catch(errore);
							rq.then(function(response) {
								imgUser.prop("src", `img/${response.data[0]["immagine"]}`);
							});
						});
					});
				});
			});
		}

		function attivaSezioneDocente() {
			switch($(this).prop("id")) {
				case 'home':
					mainWrapperDocente.show();
					classiMaterie.show();
					wrapperAnagraficoDocente.hide();
					wrapperAssenzeDocente.hide();
					wrapperArgomentiDocente.hide();
					wrapperVotiDocente.hide();
					break;
				case 'anagrafico':
					mainWrapperDocente.hide();
					classiMaterie.hide();
					wrapperAnagraficoDocente.show();
					wrapperAssenzeDocente.hide();
					wrapperArgomentiDocente.hide();
					wrapperVotiDocente.hide();
					insertDatiAnagraficoDocente();
					break;
			}
		}

		function caricaClassi() {
			lstClassi.empty();
			let rq = inviaRichiesta("GET", "server/getClassi.php");
			rq.catch(errore);
			rq.then(function(response) {
				for(let classe of response.data)
				{
					$("<option>").appendTo(lstClassi).val(classe["id"]).text(classe["nome"]);
				}
				lstClassi.prop("selectedIndex", "-1");
			});
		}

		function caricaMaterie() {
			lstMaterie.empty();
			let id = $(this).val();
			classeSelezionata = id;
			let rq = inviaRichiesta("GET", "server/getMaterieClasse.php", { id });
			rq.catch(errore);
			rq.then(async function(response) {
				let materie =  [];
				materie.push(response.data[0]["materie"][1]);
				materie.push(response.data[0]["materie"][4]);
				materie.push(response.data[0]["materie"][7]);
				materie.push(response.data[0]["materie"][10]);
				materie.push(response.data[0]["materie"][13]);
				materie.push(response.data[0]["materie"][16]);
				let mat = response.data[0]["materie"][19] + response.data[0]["materie"][20];
				materie.push(mat);
				mat = response.data[0]["materie"][23] + response.data[0]["materie"][24];
				materie.push(mat);
				mat = response.data[0]["materie"][27] + response.data[0]["materie"][28];
				materie.push(mat);
				mat = response.data[0]["materie"][31] + response.data[0]["materie"][32];
				materie.push(mat);
				for(let i = 0; i < materie.length; i++)
				{
					let materia = materie[i];
					await inviaRichiesta("GET", "server/getMateria.php", { materia })
					.then(function(response) {
						$("<option>").appendTo(lstMaterie).val(response.data[0]["id"]).text(response.data[0]["materia"]);
					})
					.catch(errore);
				}
				lstMaterie.prop("selectedIndex", "-1");
				lstMaterie.prop("disabled", false);
			});
		}

		function insertDatiAnagraficoDocente() {
			imgUserDoc.prop("src", `img/${datiDB["immagine"]}`);
			txtCognomeNomeDocente.val(datiDB["cognome"] + " " + datiDB["nome"]);
			txtMatricolaDocente.val(datiDB["matricola"]);
			txtResidenzaDocente.val(datiDB["residenza"] + " - " + datiDB["indrizzo"]);
			txtResidenzaDocente.on("input", function() {
				btnModificaDocente.prop("disabled", false);
				btnAnnullaDocente.prop("disabled", false);
				btnModificaDocente.on("click", function() {
					let location = txtResidenzaDocente.val().split(" - ");
					let residenza = location[0];
					let indirizzo = location[1];
					matricola = txtMatricolaDocente.val();
					let rq = inviaRichiesta("POST", "server/updateResidenza.php", {residenza, indirizzo, matricola });
					rq.catch(errore);
					rq.then(function() {
						let sweetAlertOptionSuccess = {
							"icon": "success",
							"title": "MODIFICA DATI ANAGRAFICO",
							"html":
								"<br>" +
								"<p>La <b>MODIFICA</b> è avvenuto correttamente.</p>"
						}
						Swal.fire(sweetAlertOptionSuccess).then(function() {
							let rq = inviaRichiesta("GET", "server/getResidenza.php", { matricola });
							rq.catch(errore);
							rq.then(function(response) {
								txtResidenzaDocente.val(response.data[0]["residenza"] + " - " + response.data[0]["indrizzo"]);
								btnModificaDocente.prop("disabled", true);
								btnAnnullaDocente.prop("disabled", true);
							});
						});
					});
				});
				btnAnnullaDocente.on("click", function() {
					txtResidenzaDocente.val(datiDB["residenza"] + " - " + datiDB["indrizzo"]);
					btnModificaDocente.prop("disabled", true);
					btnAnnullaDocente.prop("disabled", true);
				});
			});
			imgUserDoc.on("click", function() {
				let sweetAlertOptionCambiaFotoProfilo = {
					"title": "CAMBIA FOTO PROFILO",
					"html":
						"<br>" +
						"<p>Seleziona <b>FOTO</b></p>" +
						"<input type='file' id='txtFile'>"
				}
				Swal.fire(sweetAlertOptionCambiaFotoProfilo).then(function() {
					let filePath = $("#txtFile").val();
					let file;
					if(filePath.includes("2."))
						file = "2.jpg";
					else if(filePath.includes("1."))
						file = "1.jpg";
					matricola = datiDB["matricola"];
					let rq = inviaRichiesta("POST", "server/updateFotoProfilo.php", { file, matricola });
					rq.catch(errore);
					rq.then(function() {
						let sweetAlertOptionSuccess = {
							"icon": "success",
							"title": "CAMBIA FOTO PROFILO",
							"html":
								"<br>" +
								"<p>Il <b>CAMBIA FOTO PROFILO</b> è avvenuto correttamente.</p>"
						}
						Swal.fire(sweetAlertOptionSuccess).then(function() {
							let rq = inviaRichiesta("GET", "server/getFotoProfilo.php", { matricola });
							rq.catch(errore);
							rq.then(function(response) {
								imgUserDoc.prop("src", `img/${response.data[0]["immagine"]}`);
							});
						});
					});
				});
			});
		}

		function insertVotiDocente() {
			valutazioniDocente.children("tbody").empty();
			modificaVoto.hide();
			let rq = inviaRichiesta("GET", "server/getClasse.php", { classeSelezionata });
			rq.catch(errore);
			rq.then(function(response) {
				let classe = response.data[0]["nome"];
				rq = inviaRichiesta("GET", "server/getStudenti.php", { classe });
				rq.catch(errore);
				rq.then(function(response) {
					for(let studente of response.data)
					{
						let tr = $("<tr>").appendTo(valutazioniDocente.children("tbody"));
						$("<td>").appendTo(tr).text(studente["cognome"] + " " + studente["nome"]);
						let matricolaStudente = studente["matricola"];
						rq = inviaRichiesta("GET", "server/getValutazioniStudente.php", { matricolaStudente, materiaSelezionata });
						rq.catch(errore);
						rq.then(function(response) {
							let td = $("<td>").appendTo(tr);
							for(let valutazione of response.data)
							{
								let voto = $("<i>").appendTo(td).text(valutazione["voto"]).on("click", async function() {
									modificaVoto.show();	
									$("#btnModificaVoto").prop("disabled", true);
									$("#btnAnnullaVoto").prop("disabled", true);
									$("#txtStudente").val(studente["cognome"] + " " + studente["nome"]);
									$("#txtStudMatricola").val(studente["matricola"]);
									$("#dateVoto").val(valutazione["data"]);
									let materia = valutazione["materia"];
									await inviaRichiesta("GET", "server/getMateria.php", { materia })
									.then(function(response) {
										$("#txtMateria").val(response.data[0]["materia"]);
									})
									.catch(errore);
									$("#txtVoto").val(valutazione["voto"]);
									$("#txtVoto").on("change", function() {
										$("#btnModificaVoto").prop("disabled", false);
										$("#btnAnnullaVoto").prop("disabled", false);
										$("#btnAnnullaVoto").on("click", function() {
											$("#txtVoto").val(valutazione["voto"]);
											$("#btnModificaVoto").prop("disabled", true);
											$("#btnAnnullaVoto").prop("disabled", true);
											$("#btnEliminaVoto").prop("disabled", true);
										});
										$("#btnModificaVoto").on("click", function() {
											let voto = $("#txtVoto").val();
											let idVoto = valutazione["id"];
											let rq = inviaRichiesta("POST", "server/updateVoto.php", { idVoto, voto });
											rq.catch(errore);
											rq.then(function(response) {
												let sweetAlertOptionSuccess = {
													"icon": "success",
													"title": "MODIFICA VOTO",
													"html":
														"<br>" +
														"<p>La <b>MODIFICA VOTO</b> è avvenuta correttamente.</p>"
												}
												Swal.fire(sweetAlertOptionSuccess).then(function() {
													insertVotiDocente();
												});
											});
										});
									});
									$("#btnEliminaVoto").on("click", function() {
										let idVoto = valutazione["id"];
										let rq = inviaRichiesta("GET", "server/eliminaVoto.php", { idVoto });
										rq.catch(errore);
										rq.then(function(response) {
											let sweetAlertOptionSuccess = {
												"icon": "success",
												"title": "ELIMINAZIONE VOTO",
												"html":
													"<br>" +
													"<p>L'<b>ELIMINAZIONE VOTO</b> è avvenuta correttamente.</p>"
											}
											Swal.fire(sweetAlertOptionSuccess).then(function() {
												insertVotiDocente();
											});
										});
									});
								});
								if(valutazione["voto"] >= 6)
									voto.css("color", "green");
								else
									voto.css("color", "red");
							}
						});
					}
				});
			});
		}

		function inserisciVoto() {
			let sweetAlertOptionInserisciVoto = {
				"title": "INSERISCI VOTO",
				"html":
					"<br>" +
					"<p>Inserisci <b>MATRICOLA STUDENTE</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-id-card'></i></span><input type='text' class='form-control' id='txtMatrStud' placeholder='Matricola Studente'></div>" +
					"<br>" +
					"<p>Inserisci <b>DATA VOTO</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-calendar'></i></span><input type='date' class='form-control' id='dataVoto'></div>" +
					"<br>" +
					"<p>Inserisci <b>VOTO</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-award'></i></span><input type='text' class='form-control' id='txtVotoVal' placeholder='Voto'></div>"
			}
			Swal.fire(sweetAlertOptionInserisciVoto).then(function() {
				let matr = $("#txtMatrStud").val();
				let data = $("#dataVoto").val();
				let votoVal = $("#txtVotoVal").val();
				let rq = inviaRichiesta("POST", "server/insertVoto.php", { matr, data, materiaSelezionata, votoVal });
				rq.catch(errore);
				rq.then(function(response) {
					let sweetAlertOptionSuccess = {
						"icon": "success",
						"title": "INSERISCI VOTO",
						"html":
							"<br>" +
							"<p>L'<b>INSERISCI VOTO</b> è avvenuto correttamente.</p>"
					}
					Swal.fire(sweetAlertOptionSuccess).then(function() {
						insertVotiDocente();
					});
				});
			});
		}

		function insertAssenzeDocente() {
			assenzeDocente.children("tbody").empty();
			let rq = inviaRichiesta("GET", "server/getClasse.php", { classeSelezionata });
			rq.catch(errore);
			rq.then(function(response) {
				let classe = response.data[0]["nome"];
				rq = inviaRichiesta("GET", "server/getStudenti.php", { classe });
				rq.catch(errore);
				rq.then(function(response) {
					for(let studente of response.data)
					{
						let tr = $("<tr>").appendTo(assenzeDocente.children("tbody"));
						$("<td>").appendTo(tr).text(studente["cognome"] + " " + studente["nome"]);
						let matricolaStudente = studente["matricola"];
						rq = inviaRichiesta("GET", "server/getAssenzeStudente.php", { matricolaStudente });
						rq.catch(errore);
						rq.then(function(response) {
							let td = $("<td>").appendTo(tr);
							for(let assenza of response.data)
							{
								if(assenza["giustificato"] == 1)
								{
									$("<i>").appendTo(td).text("G").css("color", "green");
								}
								else
								{
									$("<i>").appendTo(td).text("NG").css("color", "red");
								}
							}
						});
					}
				});
			});
		}

		function inserisciAssenza() {
			let sweetAlertOptionInserisciAssenza = {
				"title": "INSERISCI ASSENZA",
				"html":
					"<br>" +
					"<p>Inserisci <b>MATRICOLA STUDENTE</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-id-card'></i></span><input type='text' class='form-control' id='txtMatrStud' placeholder='Matricola Studente'></div>" +
					"<br>" +
					"<p>Inserisci <b>DATA ASSENZA</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-calendar'></i></span><input type='date' class='form-control' id='dataAssenza'></div>" +
					"<br>" +
					"<p>Inserisci <b>ASSENZA</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-hospital'></i></span><input type='text' class='form-control' id='txtAssenzaVal' value='0'></div>"
			}
			Swal.fire(sweetAlertOptionInserisciAssenza).then(function() {
				let matr = $("#txtMatrStud").val();
				let data = $("#dataAssenza").val();
				let assenzaVal = $("#txtAssenzaVal").val();
				let rq = inviaRichiesta("POST", "server/insertAssenza.php", { matr, data, assenzaVal });
				rq.catch(errore);
				rq.then(function(response) {
					let sweetAlertOptionSuccess = {
						"icon": "success",
						"title": "INSERISCI ASSENZA",
						"html":
							"<br>" +
							"<p>L'<b>INSERISCI ASSENZA</b> è avvenuto correttamente.</p>"
					}
					Swal.fire(sweetAlertOptionSuccess).then(function() {
						insertAssenzeDocente();
					});
				});
			});
		}

		function insertArgomentiDocente() {
			argomentiDocente.children("tbody").empty();
			let rq = inviaRichiesta("GET", "server/getClasse.php", { classeSelezionata });
			rq.catch(errore);
			rq.then(function(response) {
				let classe = response.data[0]["nome"];
				rq = inviaRichiesta("GET", "server/getArgomenti.php", { classe });
				rq.catch(errore);
				rq.then(async function(response) {
					for(let argomento of response.data)
					{
						let tr = $("<tr>").appendTo(argomentiDocente.children("tbody"));
						$("<td>").appendTo(tr).text(argomento["data"]);
						let materia = argomento["materia"];
						await inviaRichiesta("GET", "server/getMateria.php", { materia })
						.then(function(response) {
							$("<td>").appendTo(tr).html(`<b>${response.data[0]["materia"]}: </b>${argomento["argomento"]}`);
						})
					}
					argomentiDocente.DataTable({
						order: [[0, 'desc']],
						destroy: true,
						   searching: true,
						paging: true
					});
				});
			});
		}

		function inserisciArgomenti() {
			let sweetAlertOptionInserisciAssenza = {
				"title": "INSERISCI ARGOMENTO",
				"html":
					"<br>" +
					"<p>Inserisci <b>DATA ARGOMENTO</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-calendar'></i></span><input type='date' class='form-control' id='dataArgomento'></div>" +
					"<br>" +
					"<p>Inserisci <b>MATERIA</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-book'></i></span><input type='text' class='form-control' id='txtMatVal' placeholder='Materia'></div>" +
					"<br>" +
					"<p>Inserisci <b>ARGOMENTO</b></p>" +
					"<div class='form-group input-group'><span class='input-group-text'><i class='fas fa-book'></i></span><input type='text' class='form-control' id='txtArgomentoVal' placeholder='Argomento'></div>"
			}
			Swal.fire(sweetAlertOptionInserisciAssenza).then(function() {
				let data = $("#dataArgomento").val();
				let mat = $("#txtMatVal").val();
				let argomento = $("#txtArgomentoVal").val();
				let rq = inviaRichiesta("GET", "server/getClasse.php", { classeSelezionata });
				rq.catch(errore);
				rq.then(function(response) {
					let classe = response.data[0]["nome"];
					rq = inviaRichiesta("POST", "server/insertArgomento.php", { data, mat, argomento, classe });
					rq.catch(errore);
					rq.then(function(response) {
						let sweetAlertOptionSuccess = {
							"icon": "success",
							"title": "INSERISCI ARGOMENTO",
							"html":
								"<br>" +
								"<p>L'<b>INSERISCI ARGOMENTO</b> è avvenuto correttamente.</p>"
						}
						Swal.fire(sweetAlertOptionSuccess).then(function() {
							insertArgomentiDocente();
						});
					});
				});
			});
		}
    });
});
