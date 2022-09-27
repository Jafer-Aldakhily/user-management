<?php
require "./config.php";

$email =  $_POST["email"];
$password =  $_POST["password"];

$sql = "select * from users where email = :email and password = :password";

$query = $conn->prepare($sql);

$query->execute([
    ":email" => $email,
    ":password" => $password,
]);

$result = $query->fetch(PDO::FETCH_ASSOC);
// print_r(json_encode(count($result)));
// die;

$sql2 = "update users set status = 'active' where id = :id";
$query2 = $conn->prepare($sql2);
$query2->execute([":id" => $result["id"]]);

if (count($result) > 0) {
    print_r(json_encode($result));
    // $_SESSION["email"] = $result["email"];
} else {
    echo json_encode(["message" => "Something is wrong"]);
}
