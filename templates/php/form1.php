<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    extract(array_map('trim', $_POST));
    if (!$name || !$email || !$message) $error = "All fields are required.";
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $error = "Enter a valid email.";
    else die('
      <form id="proforms" action="https://app.proforms.top/f/your_api_key" method="POST">
        <input type="hidden" name="name" value="'.htmlspecialchars($name).'">
        <input type="hidden" name="email" value="'.htmlspecialchars($email).'">
        <input type="hidden" name="message" value="'.htmlspecialchars($message).'">
      </form><script>document.getElementById("proforms").submit();</script>');
}
?><!DOCTYPE html>
<html>
<head><title>Contact Us</title><style>
body{font-family:sans-serif;max-width:500px;margin:auto;padding:2rem}
input,textarea,button{width:100%;margin-bottom:1rem;padding:10px}
.error{color:red;margin-bottom:1rem}
</style></head>
<body>
<h2>Contact Us</h2>
<?php if(!empty($error)):?><div class="error"><?=$error?></div><?php endif?>
<form method="POST"><input name="name" placeholder="Your Name" value="<?=htmlspecialchars($_POST['name']??'')?>" required>
<input type="email" name="email" placeholder="Your Email" value="<?=htmlspecialchars($_POST['email']??'')?>" required>
<textarea name="message" placeholder="Your Message" rows="5" required><?=htmlspecialchars($_POST['message']??'')?></textarea>
<button type="submit">Send Message</button></form></body></html>
