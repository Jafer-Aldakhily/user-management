<?php
require_once './config.php';
$id = $_GET["id"];
$sql = "delete from users where id = :id";

$query = $conn->prepare($sql);
$result = $query->execute([
    ":id" => $id
]);

if ($result == 1) {
    echo "Deleted successfully";
} else {
    echo "Error delete page does not work";
}
