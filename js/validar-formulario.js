//identificación de elementos.
var formulario = document.getElementById('formulario-informacion');
var campoNombre = document.getElementById('usuario-nombre');
var campoEmail = document.getElementById('usuario-correo');
var campoTelefono = document.getElementById('usuario-telefono');
var campoServicio = document.getElementById('usuario-servicio');
var campoComentario = document.getElementById('usuario-comentario');

// variables.
var valorNombre = null;
var valorEmail = null;
var valorTelefono = null;
var valorServicio = null;
var valorComenatrio = null;

//variables de msj form
	var msjNombre = document.getElementById('msj-nombre');
    var msjCorreo = document.getElementById('msj-correo');
    var msjTel = document.getElementById('msj-telefono');
    var msjServicio = document.getElementById('msj-servicio');
    var msjComentarios = document.getElementById('msj-comentarios');
	var todosLosMsjError = document.querySelectorAll('.msj');
//patrones de validación.
var patronNombre = /^[\w\Wñáéíóú]{2,20}$/i;
var patronEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
var patronTel = /^(?:[+]?(?:[0-9]{1,5}|\\x28[0-9]{1,5}\\x29)[ ]?)?[0-9]{2}(?:[0-9][ ]?){6}[0-9]$/
var patronComentario = /^[0-9a-zA-Z\sñáéíóú]{1,1000}$/

function validar(evento) {

	//comienza bucle elimina clase
	todosLosMsjError.forEach((elemento, indice) => {
        elemento.classList.remove('mensaje-error'); 
      })
	//obtener valor de los campos.
	valorNombre = campoNombre.value;
	valorEmail = campoEmail.value;
	valorTelefono = campoTelefono.value;
	valorComenatrio = campoComentario.value;

	if (!patronNombre.test(valorNombre)) {
		msjNombre.classList.add('mensaje-error');
		campoNombre.focus();
		evento.preventDefault();
	} else if (!patronEmail.test(valorEmail)) {
		msjCorreo.classList.add('mensaje-error');
		campoEmail.focus();
		evento.preventDefault();
	} else if (!patronTel.test(valorTelefono)) {
		msjTel.classList.add('mensaje-error');
		campoTelefono.focus();
		evento.preventDefault();
	} else if (campoServicio.value == "") {
		msjServicio.classList.add('mensaje-error');
		campoServicio.focus();
		evento.preventDefault()
	} else if (!patronComentario.test(valorComenatrio)) {
		msjComentarios.classList.add('mensaje-error');
		campoComentario.focus();
		evento.preventDefault()
	}

	// por último chequeamos el CAPTCHA DE GOOGLE
	else {

		var datosSend = $(this).serialize();

		if ($('#g-recaptcha-response').val()) {

			// la siguiente programación llama a un archivo php que a su vez tiene dentro una comunicación con Google.	

			// Tras esa comunicación si el CAPTCHA está correcto se envía el formulario.
			//!!!! ES NECESARIO INCLUIR LA LIBRERÍA JQUERY EN EL HTML

			$.ajax({
				type: 'post',
				url: ('googlevalidate.php'),
				dataType: 'html',
				async: true,
				data: {
					captchaResponse: $('#g-recaptcha-response').val()
				},
				success: function (data) {
					if (data == '1') {
						// si el captcha está correcto se envía el formulario.
						alert('ok');
						formulario.submit();
					} else {
						alert('Se ha producido un error');
						console.log(data)
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log('Esperando respuesta');
				}
			});
		} else {
			// si el captcha no está marcado ejecuto las acciones que quiera.	
			alert('debes completar el captcha');
		}

		// por defecto siempre anulamos el envío del formulario.
		evento.preventDefault();
	}

}

formulario.addEventListener('submit', validar);