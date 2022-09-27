<?php
require_once './config.php';
$id = $_GET["id"];

$sql = "select * from users where id = :id";

$query = $conn->prepare($sql);

$query->execute([":id" => $id]);

$result = $query->fetch(PDO::FETCH_ASSOC);

if ($result > 0) {
    print_r(json_encode($result));
} else {
    echo "Something is wrong";
}
