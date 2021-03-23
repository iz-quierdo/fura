<?php

$to_email = "transzackaz@yandex.ru";
//$to_email = "alex-wd@yandex.ru";
$subject = "Заявка с сайта Фура20.рф";

$domain = "fura20.ru";

$from = "no-reply@" . $domain;
$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$post_name = $_POST['name'];
$post_phone = $_POST['phone'];
$post_city1 = $_POST['city1'];
$post_city2 = $_POST['city2'];



$template = "Имя: " . $post_name . "; Телефон: " . $post_phone . " Города: " . $post_city1 . " => " . $post_city2;

$success = mail($to_email, $subject, $template, $headers);
echo ($success) ? 'true' : 'false';
