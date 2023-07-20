<?php
/* llegan los datos del envío por Ajax para ser procesados*/ 

if(isset($_POST['g-recaptcha-response'])){
$captcha=$_POST['g-recaptcha-response'];
}

/* Validamos con Google */
$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=tuclave=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);

/* Enviamos de vuelta las respuestas, si no es humano, envía 0 y si lo es, envía 1.*/

if($response.success==false){
echo '0';
}else{
echo '1';
}
 
?>
