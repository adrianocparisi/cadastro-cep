<?php
require_once 'classes/CepController.php';
$cep = CepController::searchCEP($_POST['cep']);
echo json_encode($cep);