<?php
/*
function getUserId() {
    return $_SESSION['id_utilisateur'] ?? null;
}

function requireRole($role) {
    if (!isset($_SESSION['role_utilisateur']) || $_SESSION['role_utilisateur'] !== $role) {
        http_response_code(403);
        echo json_encode(["error" => "Accès interdit"]);
        exit;
    }
}
*/