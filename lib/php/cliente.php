<?php
    require_once 'classes/ClienteController.php';
    
    if($_POST['acao'] == 1){
        $cliente = ClienteController::insertCliente($_POST);
        if($cliente['status'] == 200){
            $cliente = ClienteController::listCliente($cliente['id']);
        }
    }

    if($_POST['acao'] == 2){
        $cliente = ClienteController::listCliente();
    }

    if($_POST['acao'] == 3){
        $cliente = ClienteController::deleteCliente($_POST['id']);
    }
    echo json_encode($cliente);