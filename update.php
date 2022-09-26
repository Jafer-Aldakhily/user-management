<?php

require_once './config.php';

$id = $_GET['id'];

$sql = "update users set email = :email, full_name = :full_name, mobile = :mobile, password = :password, date = :date";

$query = $conn->prepare($sql);

$result = $query->execute([
    ":email" => $_POST["email"],
    ":full_name" => $_POST["full_name"],
    ":mobile" => $_POST["mobile"],
    ":password" => $_POST["password"],
    ":date" => $_POST["date"]
]);

echo $result;
die;


if ($result == 1) {
    echo json_encode(["message" => "updated successfully"]);
} else {
    echo json_encode(["message" => "Something is wrong !"]);
}
