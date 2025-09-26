<?php
session_start();
require_once('db.php');



$emailReg = $_POST['emailReg'];
$loginReg = $_POST['usernameReg'];
$passwordReg = $_POST['passwordReg'];

$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
$stmt->execute([$emailReg]);
$count = $stmt->fetchColumn();

if ($count > 0) {
    echo "Пользователь с такой почтой уже зарегистрирован";
    exit;
}

$hashedPassword = password_hash($passwordReg, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO users (login, password, email) VALUES (?, ?, ?)");
if ($stmt->execute([$loginReg, $hashedPassword, $emailReg])) {
    echo "success";
} else {
    echo "Ошибка регистрации";
}