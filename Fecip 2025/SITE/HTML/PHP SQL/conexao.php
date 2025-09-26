<?php

//Conexão com o banco

$hostname = "localhost";
$bancodedados = "pontos";
$usuario = "root";
$senha = "mysql";

$conn = new mysqli($hostname, $usuario, $senha, $bancodedados);

//Verifica se deu erro
//if($mysqli->connect_errno){
  //  echo "falha ao conectar:(" . $mysqli->connect_errno . ")" . $mysqli->connect_errno;
//}
//else
  //      echo "Conectado ao banco de dados";

?>