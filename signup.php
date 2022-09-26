<?php
require_once './config.php';


$email = $_POST["email"];
$full_name = $_POST["full_name"];
$password = $_POST["password"];
$mobile = $_POST["mobile"];
$date = $_POST["date"];

$sql = "insert into users (email,full_name,password,mobile,date) values(:email,:full_name,:password,:mobile,:date)";

$query = $conn->prepare($sql);

$result = $query->execute([
    ":email" => $email,
    ":full_name" => $full_name,
    ":mobile" => $mobile,
    ":password" => $password,
    ":date" => $date
]);

if ($result == 1) {
    print_r(json_encode(["status" => 200, "message" => "Added user successfully"]));
}
