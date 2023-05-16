<?php

require_once 'ConexaoController.php';
require_once 'lib/biblioteca.php';

class ClienteController extends ConexaoController{

    public static function insertCliente(Array $cliente):Array
    {
        try{
            $conn = ConexaoController::connect();
            $conn->beginTransaction();

            $dados = [];
            $created_at = date('Y-m-d H:i:s');

            $sql = "INSERT INTO cliente
                    (razaosocial,logradouro,numero,complemento,bairro,cidade,uf,cep,created_at) VALUES
                    (:razaosocial,:logradouro,:numero,:complemento,:bairro,:cidade,:uf,:cep,:created_at)";
            $stmt = $conn->prepare($sql);        
            $stmt->execute(
                [
                    ':razaosocial'    => tirarAcentos($cliente['razaosocial']),
                    ':logradouro'     => $cliente['logradouro'],
                    ':numero'         => $cliente['numero'],
                    ':complemento'    => $cliente['complemento'],
                    ':bairro'         => $cliente['bairro'],
                    ':cidade'         => $cliente['cidade'],
                    ':uf'             => $cliente['estado'],
                    ':cep'            => str_replace('-', '', trim($cliente['cep'])),
                    ':created_at'     => $created_at,
                ]
            );

            $id = $conn->lastInsertId();

            if($id > 0){
                $dados['status'] = 200;
                $dados['motivo'] = 'OK';
                $dados['id']     = $id;
                $conn->commit();
            }else{
                throw new Exception("Erro no SQL do insertCliente.");  
            }

        }catch(Exception $e){
            $dados['status'] = 400;
            $dados['motivo'] = $e->getMessage();
            $conn->rollback();
        }finally{
            return $dados;
        }
    }

        public static function deleteCliente(int $id = null):Array
    {
        try{
            $conn  = ConexaoController::connect();
            $conn->beginTransaction();
            $dados = [];

            $data = [
                'id' => $id
            ];

            $sql = "DELETE FROM cliente WHERE id = :id";
            $stmt = $conn->prepare($sql);        
            $stmt->execute(
                [
                    ':id'    => $id,
                ]
            );

            $dados['status']  = 200;
            $dados['motivo']  = 'OK';
            $conn->commit();
        }catch(Exception $e){
            $dados['status'] = 400;
            $dados['motivo'] = $e->getMessage();
            $conn->rollback();
        }finally{
            return $dados;
        }
    }


    public static function listCliente(int $id = null):Array
    {
        try{
            $conn  = ConexaoController::connect();
            $dados = [];

            $sql = "SELECT * FROM cliente ";
            if($id > 0){
                $sql .= "WHERE id = {$id} ";
            }
            $sql .= "ORDER BY id";
            $res = $conn->query($sql);
            while($row = $res->fetch(PDO::FETCH_ASSOC)){

              $endereco = $row['logradouro'];
              if($row['numero'] != ''){
                 $endereco .= ', '.$row['numero'];
              }
              if($row['complemento'] != ''){
                 $endereco .= ', '.$row['complemento'];
              }
              if($row['bairro'] != ''){
                 $endereco .= ', '.$row['bairro'];
              }
              if($row['cidade'] != ''){
                 $endereco .= ', '.$row['cidade'];
              }
              if($row['uf'] != ''){
                 $endereco .= ', '.$row['uf'];
              }
              if($row['cep'] != ''){
                 $endereco .= ', '.$row['cep'];
              }
                
              $cliente_lst[] = array(
                                'id' => $row['id'],
                                'razaosocial' => $row['razaosocial'],
                                'logradouro' => $row['logradouro'],
                                'numero' => $row['numero'],
                                'complemento' => $row['complemento'],
                                'bairro' => $row['bairro'],
                                'cidade' => $row['cidade'],
                                'uf' => $row['uf'],
                                'cep' => $row['cep'],
                                'endereco' => $endereco,
                                'created_at' => date('d/m/Y H:i:s',strtotime($row['created_at'])),
                            );
            }
            $dados['status']  = 200;
            $dados['motivo']  = 'OK';
            $dados['cliente'] = $cliente_lst;
        
        }catch(Exception $e){
            $dados['status'] = 400;
            $dados['motivo'] = $e->getMessage();
        }finally{
            return $dados;
        }
    }

    
}