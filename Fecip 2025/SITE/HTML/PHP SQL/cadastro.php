<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include("conexao.php");

//Recebe os dados do fomulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

// Valida
if(empty($nome) || empty($email) || empty($senha)){
   header("Location: cadastro.html?erro=Preencha+todos+os+campos."); // Redireciona para a página de cadastro
   exit();
}

// Prepara e executa inserção
$sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nome, $email, $senha);

try {
    if ($stmt->execute()) {
        header("Location: cadastro.html"); // Redireciona para a página de login
        exit();
    }
} catch (mysqli_sql_exception $e) {
    if ($e->getCode() == 1062) { // Código de erro para duplicata
         header("Location: cadastro.html?erro=Este+email+ja+esta+cadastrado!"); // Redireciona para a página de cadastro
        exit();
    } else {  
        header("Location: cadastro.html?erro=Erro+ao+cadastrar:+".urlencode($e->getMessage())); 
        exit();
    }
}

$stmt->close();
$conn->close();


?>