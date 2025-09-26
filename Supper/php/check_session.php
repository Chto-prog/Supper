<?php
// session_start();
// require_once('db.php');

// if (isset($_SESSION['user'])) {
//     echo json_encode([
//         'status' => 'authenticated',
//         'user' => $_SESSION['user']
//     ]);
// } else {
//     echo json_encode(['status' => 'guest']);
// }

session_start();
require_once('db.php');

if (isset($_SESSION['user'])) {
    echo json_encode([
        'status' => 'authenticated',
        'user' => $_SESSION['user']
    ]);
} else {
    echo json_encode(['status' => 'guest']);
}