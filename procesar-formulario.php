<?php
// EmailFrom sería es el supuesto origen del mensaje
$EmailFrom = "felipere@casareal.es";

//EmailTo es el correo de la empresa que recibe el formulario; para la prueba pon tu correo
$EmailTo = "eduardcolmenares3434@gmail.com";

//Subject es el asunto que aparece en el mensaje que se recibe
$Subject = "Peticion de informacion";

// Obtenemos los valores de los campos del fomulario (usaremos sus name)
$Nombre = Trim(stripslashes($_POST['usuario-nombre'])); 
$Email = Trim(stripslashes($_POST['usuario-correo']));
$telefono = Trim(stripslashes($_POST['usuario-telefono']));  
$servicio = Trim(stripslashes($_POST['usuario-servicio']));
$comentario = Trim(stripslashes($_POST['usuario-comentario']));
// Datos que aparecerán en el mensaje recibido en el  EmailTo
$Body = "";
$Body .= "Nombre cliente: ";
$Body .= $Nombre;
$Body .= "\n";

$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";

$Body .= "Consulta: ";
$Body .= $telefono;
$Body .= "\n";

$Body .= "Servicio: ";
$Body .= $servicio;
$Body .= "\n";

$Body .= "Comentario: ";
$Body .= $comentario;
$Body .= "\n";

// Enviar email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// Páginas de envio correcto o error.
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=envio-correcto.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.html\">";
}
?>