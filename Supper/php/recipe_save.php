<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once('db.php');


$recipeName = $_POST['title'] ?? '';
$recipeDesc = $_POST['description'] ?? '';
$recipeCuisine = $_POST['cuisine'] ?? '';


$stmt = $pdo->prepare("INSERT INTO recipes (title, description, cuisine) VALUES (?, ?, ?)");
$stmt->execute([$recipeName, $recipeDesc, $recipeCuisine]);
$recipeId = $pdo->lastInsertId();


if (isset($_FILES['coverImage']) && $_FILES['coverImage']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

    $tmp_name = $_FILES['coverImage']['tmp_name'];
    $name = basename($_FILES['coverImage']['name']);
    $targetPathInDB = 'php/uploads/' . uniqid() . '-' . $name;

    if (move_uploaded_file($tmp_name, $uploadDir . basename($targetPathInDB))) {

        $stmt = $pdo->prepare("UPDATE recipes SET image = ? WHERE id = ?");
        $stmt->execute([$targetPathInDB, $recipeId]);
    }
}


if (!empty($_POST['tags'])) {
    $tags = json_decode($_POST['tags'], true);

    if (is_array($tags)) {
        $tagsString = implode(',', $tags);
        $stmt = $pdo->prepare("UPDATE recipes SET tags = ? WHERE id = ?");
        $stmt->execute([$tagsString, $recipeId]);
    }
}


if (!empty($_POST['ingredients'])) {
    $ingredients = json_decode($_POST['ingredients'], true);

    foreach ($ingredients as $ingredient) {
        $name = $ingredient['name'];
        $amount = $ingredient['amount'];
        $unit = $ingredient['unit'];

        $stmt = $pdo->prepare("INSERT INTO recipe_ingredients (recipe_id, name, amount, unit) VALUES (?, ?, ?, ?)");
        $stmt->execute([$recipeId, $name, $amount, $unit]);
    }
}

// Обработка шагов
$stepDescriptions = $_POST['stepDescription'] ?? [];
$stepImages = $_FILES['stepImage'] ?? [];

foreach ($stepDescriptions as $index => $description) {
    $stepNumber = $index + 1;
    $imagePath = null;

    if (!empty($stepImages['name'][$index]) && $stepImages['error'][$index] === UPLOAD_ERR_OK) {
        $tmp_name = $stepImages['tmp_name'][$index];
        $name = basename($stepImages['name'][$index]);
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
        $targetPathInDB = 'php/uploads/' . uniqid() . '-' . $name;

        if (move_uploaded_file($tmp_name, $uploadDir . basename($targetPathInDB))) {
            $imagePath = $targetPathInDB;
        }
    }

    $stmt = $pdo->prepare("INSERT INTO steps (recipe_id, step_number, description, image) VALUES (?, ?, ?, ?)");
    $stmt->execute([$recipeId, $stepNumber, $description, $imagePath]);
}

header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'recipeId' => $recipeId,
    'recipeName' => $recipeName,
    'stepsCount' => count($stepDescriptions),
    'ingredientsCount' => count($ingredients ?? []),
]);

exit;
