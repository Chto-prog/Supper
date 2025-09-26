<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once('db.php');

try {
    $stmt = $pdo->query("SELECT id, title, description, cuisine AS subtitle, image, tags FROM recipes");
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($recipes as &$recipe) {

        $stmt = $pdo->prepare("SELECT name, amount, unit FROM recipe_ingredients WHERE recipe_id = ?");
        $stmt->execute([$recipe['id']]);
        $recipe['products'] = $stmt->fetchAll(PDO::FETCH_FUNC, function ($name, $amount, $unit) {
            return "$name — $amount $unit";
        });


        $stmt = $pdo->prepare("SELECT id, title, description, cuisine AS subtitle, image, tags FROM recipes WHERE id = ?");
        $stmt->execute([$recipe['id']]);
        $steps = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
        $recipe['steps'] = $steps;


        $recipe['tags'] = $recipe['tags'] ? explode(',', $recipe['tags']) : [];
    }

    header('Content-Type: application/json');
    echo json_encode($recipes, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
