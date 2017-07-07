<?php header('refresh: 4; url=index.html'); ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
<!--   <meta http-equiv="refresh" content="5; url=http://mikellamillen.com">
 -->  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank You</title>
 <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" media="all">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link href="https://fonts.googleapis.com/css?family=Oswald|PT+Sans|Reenie+Beanie|PT+Sans+Narrow|PT+Sans"
    rel="stylesheet">
    <link rel="stylesheet" href="/bower_components/hover/css/hover.css" />
    <link rel="stylesheet" href="styles/main.css">
    <script src="/bower_components/modernizr/modernizr.js"></script>
    </head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">

        <?php

        if (isset($_POST["submit"])) {
          $name = $_POST['name'];
          $message = $_POST['message'];
          $contact = $_POST['contact'];
          $from = 'New Client Inquiry';
          $to = 'mikellamillen@gmail.com';
          $subject = 'New Client Inquiry';

          $body = "From: $name\n E-Mail or Phone: $contact\n Message:\n $message";

        //check name was entered
          if (!$_POST['name']) {
            $errName = 'Please enter your name';
          }
          if (!$_POST['message']) {
            $errMessage = 'Please enter your message';
          }
        //check contact info entered
          if (!$_POST['contact']) {
            $errContact = 'Please enter a valid contact';
          }
          //no errors, send form
          if (!$errName && !$errContact && !$errMessage) {
            if (mail ($to, $subject, $body, $from)) {
              $result = '<div class="alert alert-success">Thank you for reaching out. I will be in touch within 24-48 hours. If you don\'t hear from me within that time period, feel free to call at 917-756-5540.</div>';
            } else {
              $result = '<div class="alert alert-danger">Sorry! There was an error sending your form. Please email me at: mikellamillen@gmail.com or call 917-756-5540 </div>';
            }
          }
        }
        echo $result;
        ?>
          <p>You will be redirected in a few moments, or <a href="http://www.mikellamillen.com">click here</a>.</p>
      </div>
    </div>
  </div>
</body>
</html>

