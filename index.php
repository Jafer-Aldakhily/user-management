<?php

require_once './config.php';

$sql = "select * from users";
$query = $conn->prepare($sql);
$query->execute();
$users = $query->fetchAll(PDO::FETCH_ASSOC);

print_r(json_encode($users));
