<?php

define('EMAIL_FOR_REPORTS', '');
define('RECAPTCHA_PRIVATE_KEY', '@privatekey@');
define('FINISH_URI', 'http://');
define('FINISH_ACTION', 'message');
define('FINISH_MESSAGE', 'Thanks for filling out my form!');
define('UPLOAD_ALLOWED_FILE_TYPES', 'doc, docx, xls, csv, txt, rtf, html, zip, jpg, jpeg, png, gif');

require_once str_replace('\\', '/', __DIR__) . '/handler.php';

?>

<?php if (frmd_message()): ?>
<link rel="stylesheet" href="<?=dirname($form_path)?>/formoid-default-skyblue.css" type="text/css" />
<span class="alert alert-success"><?=FINISH_MESSAGE;?></span>
<?php else: ?>
<!-- Start Formoid form-->
<link rel="stylesheet" href="<?=dirname($form_path)?>/formoid-default-skyblue.css" type="text/css" />
<script type="text/javascript" src="<?=dirname($form_path)?>/jquery.min.js"></script>
<form class="formoid-default-skyblue" style="background-color:#ffffff;font-size:14px;font-family:'Open Sans','Helvetica Neue','Helvetica',Arial,Verdana,sans-serif;color:#666666;max-width:800px;min-width:150px" method="post"><div class="title"><h2>Sobre el uso del móvil</h2></div>
	<div class="element-select<?frmd_add_class("select")?>"><label class="title">Indica tu edad<span class="required">*</span></label><div class="large"><span><select name="select" required="required">

		<option value="menor de 20 años">menor de 20 años</option>
		<option value="menor de 30 años">menor de 30 años</option>
		<option value="menor de 40 años">menor de 40 años</option>
		<option value="menor de 50 años">menor de 50 años</option>
		<option value="menor de 60 años">menor de 60 años</option></select><i></i></span></div></div>
	<div class="element-select<?frmd_add_class("select1")?>"><label class="title">Sexo<span class="required">*</span></label><div class="large"><span><select name="select1" required="required">

		<option value="Mujer">Mujer</option>
		<option value="Varón">Varón</option></select><i></i></span></div></div>
	<div class="element-select<?frmd_add_class("select2")?>"><label class="title">Dedicación</label><div class="large"><span><select name="select2" >

		<option value="Estudiante">Estudiante</option>
		<option value="Profesional">Profesional</option></select><i></i></span></div></div>
<div class="submit"><input type="submit" value="Enviar"/></div></form><script type="text/javascript" src="<?=dirname($form_path)?>/formoid-default-skyblue.js"></script>

<!-- Stop Formoid form-->
<?php endif; ?>

<?php frmd_end_form(); ?>