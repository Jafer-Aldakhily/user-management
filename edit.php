<?php
require_once './config.php';
$id = $_GET["id"];

$sql = "select * from users where id = :id";
$query = $conn->prepare($sql);
$query->execute([
    ":id" => $id
]);
$user = $query->fetch(PDO::FETCH_ASSOC);

print_r(json_encode($user));
