<?php
session_start();
require_once('db.php');

if (!isset($_SESSION['login_attempts'])) {
  $_SESSION['login_attempts'] = 0;
}

$recaptcha_required = $_SESSION['login_attempts'] >= 5;

if ($recaptcha_required) {
  $recaptcha_response = $_POST['g-recaptcha-response'] ?? '';
  $secret_key = '6LcPD0QrAAAAAF7JS2Imm1o2ShY6FB9h0QfOX5EL';

  $verify_response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret_key}&response={$recaptcha_response}");
  $response_data = json_decode($verify_response);

  if (!$response_data->success) {
    echo "Капча не пройдена";
    exit;
  }
}

$emailLog = $_POST['emailLog'];
$loginLog = $_POST['usernameLog'];
$passwordLog = $_POST['passwordLog'];

if (empty($emailLog) || empty($passwordLog) || empty($loginLog)) {
  echo "Заполните все поля";
  exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND login = ?");
$stmt->execute([$emailLog, $loginLog]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($passwordLog, $user['password'])) {
  $_SESSION['user'] = [
    'id' => $user['id'],
    'email' => $user['email'],
    'login' => $user['login']
  ];
  $_SESSION['login_attempts'] = 0;
  echo "success";
} else {
  $_SESSION['login_attempts']++;
  echo $_SESSION['login_attempts'] >= 5 ? "captcha_required" : "Неверный email или пароль";
}