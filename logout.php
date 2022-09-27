<?php

require_once './config.php';

$id = $_GET["id"];

$sql = "update users set status = 'inactive' where id = :id";
$query = $conn->prepare($sql);
$result =  $query->execute([":id" => $id]);

echo $result;
die;

if ($result) {
    print_r(json_encode("logged out successfully"));
} else {
    echo json_encode(["message" => "Something is wrong"]);
}
