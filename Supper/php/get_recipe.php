<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once('db.php');

$id = $_GET['id'] ?? null;

if (!$id || !is_numeric($id)) {
    echo json_encode(['error' => 'Неверный ID']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, title, description, cuisine AS subtitle, image FROM recipes WHERE id = ?");
$stmt->execute([$id]);
$recipe = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$recipe) {
    echo json_encode(['error' => 'Рецепт не найден']);
    exit;
}

// Ингредиенты
$stmt = $pdo->prepare("SELECT name, amount, unit FROM recipe_ingredients WHERE recipe_id = ?");
$stmt->execute([$id]);

$recipe['products'] = array_map(function ($item) {
    return "{$item['name']} — {$item['amount']} {$item['unit']}";
}, $stmt->fetchAll(PDO::FETCH_ASSOC));

// Шаги
$stmt = $pdo->prepare("SELECT description, image FROM steps WHERE recipe_id = ? ORDER BY step_number");
$stmt->execute([$id]);
$recipe['steps'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($recipe, JSON_UNESCAPED_UNICODE);
