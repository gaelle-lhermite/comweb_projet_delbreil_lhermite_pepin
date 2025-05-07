<?php
function send_json($data) {
    header('Content-Type: application/json'); // JSON
    echo json_encode($data);
    exit(); 
}
