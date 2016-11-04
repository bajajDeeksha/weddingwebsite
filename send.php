<?php

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$number = strip_tags(htmlspecialchars($_POST['number']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$cer = '';
foreach($_POST['ceremony'] as $selected){
    if( $cer ) $cer.= ',';
    $cer .= $selected;
}
$us_email = "geetbajaj20@gmail.com , nishyanth@yahoo.com , dishab16@gmail.com";
$us_subject = "RSVP by $name";
if($message === ""){
    $us_body = "Hi, \n$name is attending you wedding.\n\n"."Here are the details:\n\nName: $name\nEmail: $email_address\nNumber of people attending: $number\nCeremony: $cer\n\nAdmin";
} else {
    $us_body = "Hi, \n$name is attending you wedding.\n\n"."Here are the details:\n\nName: $name\nEmail: $email_address\nNumber of people attending: $number\nCeremony: $cer\nMessage: $message\n\nAdmin";
}
$us_headers = "From: noreply@nishandgeet.com\n";
$us_headers .= "Reply-To: $email_address";
$us = mail($us_email,$us_subject,$us_body,$us_headers);
if ($us != 1) {
    echo "error";
} else {
    $they_email= $email_address;
    $they_subject= "Nish and Geetika wedding - ThankYou";
    $they_body="Hi $name,\nThank you for being a part of our special occasion.\nSee you on 21.12.16\nBest Wishes,\nNishyanth and Geetika";
    $they_headers = "From: noreply@nishandgeet.com\n";
    $they_headers .= "Reply-To: $us_email";
    $they = mail($they_email,$they_subject,$they_body,$they_headers);
    if ($they != 1) {
        echo "error";
    } else 
    echo "success";
}
?>
