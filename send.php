<?php

$name = !empty($_POST['name']) ? strip_tags$_POST['name']) : '';
$email = !empty($_POST['email']) ? strip_tags$_POST['email']) : '';
$comment = !empty($_POST['comment']) ? strip_tags($_POST['comment']) : '';
$url = !empty($_POST['url']) ? strip_tags($_POST['url']) : '';

$url = !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$ip = !empty($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
$browser = !empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';

$subject="Callback request";

$message.="<b>Name: ".$name." </b><br>Email|Phone: ".$email."<BR>Comment: ".$comment."<BR>IP:".$ip."<BR>"."<BR>URL:".$url."<BR>";
$headers="From: <info@example.com>\n";
$headers.="X-Sender: <info@example.com>\n";
$headers.="X-Mailer: PHP\n";
$headers.="X-Priority: 1\n";
$headers.="Return-Path: <info@example.com>\n";
$headers.="Content-Type: text/html; charset=utf-8\n";

if(mail("mebatua@gmail.com", $subject, $message, $headers))
    echo '<span>Thank you!</span>'; 
