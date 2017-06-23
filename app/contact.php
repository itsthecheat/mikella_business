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
      $result='<div class="alert alert-success">Thanks! I will be in touch.</div>';
    } else {
      $result= '<div class="alert alert-danger">Sorry! There was an error sending your form. Please email me at: mikellamillen@gmail.com or call 917-756-5540 </div>';
    }
  }
}
?>

<?php echo $result; ?>
