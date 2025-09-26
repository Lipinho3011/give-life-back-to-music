<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'conexao.php';

$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

if (empty($email) || empty($senha)) {
  header("Location: cadastro.html?erro=Preencha+todos+os+campos!");
    exit();
    //die("Preencha todos os campos!");
}

// Ajuste: variável $conn conforme seu cadastro.php
$sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $senha);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    header("Location: HOME.html");
    exit();
} else {
     header("Location: cadastro.html?erro=Email+ou+senha+inválidos!"); 
    exit();
}

$stmt->close();
$conn->close();
?>