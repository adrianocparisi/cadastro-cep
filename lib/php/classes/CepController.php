<?php

require_once 'ConexaoController.php';
require_once 'lib/biblioteca.php';

class CepController extends ConexaoController{
    public static function getCEP(string $cep):Array
    {
        try{
            $url = "https://viacep.com.br/ws/{$cep}/json/";
	        $curl = curl_init($url);
	        curl_setopt($curl, CURLOPT_URL, $url);
	        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	        $viacep = curl_exec($curl);
	        $viacep_data = json_decode( $viacep, true );
            if(isset($viacep_data['erro'])){
                throw new Exception("O CEP {$cep} não foi encontrado.");
            }else{
                $dados['status']         = 200;
                $dados['motivo']         = 'OK';
                $dados['cep']            = str_replace('-', '', trim($viacep_data['cep']));
                $dados['logradouro']     = (trim($viacep_data['logradouro']) <> '') ? tirarAcentos($viacep_data['logradouro']):null;
                $dados['complemento']    = (trim($viacep_data['complemento']) <> '') ? tirarAcentos($viacep_data['complemento']):null;
                $dados['bairro']         = (trim($viacep_data['bairro']) <> '') ? tirarAcentos($viacep_data['bairro']):null;
                $dados['cidade']         = (trim($viacep_data['localidade']) <> '') ? tirarAcentos($viacep_data['localidade']):null;
                $dados['uf']             = $viacep_data['uf'];
                $dados['ibge_municipio'] = $viacep_data['ibge'];
                $dados['ibge_estado']    = substr($dados['ibge_municipio'],0,2);
            }

        }catch(Exception $e){
            $dados['status'] = 400;
            $dados['motivo'] = $e->getMessage();
        }finally{
            return $dados;
        }

    }
    public static function searchCEP(string $cep):Array
    {
        try{
            $conn = ConexaoController::connect();

            $dados = [];
            $cep = str_replace('-', '', trim($cep));
            $sql = "SELECT * FROM cep WHERE cep='{$cep}'";
            $res = $conn->query($sql);
            if($res->rowCount() == 0){
                $dados_cep = self::getCEP($cep);
                if($dados_cep['status'] === 200){
                    $insert_cep = self::insertCEP($dados_cep);
                    if($insert_cep['status'] === 200){
                        $sql = "SELECT * FROM cep WHERE cep='{$cep}'";
                        $res = $conn->query($sql);
                    }else{
                        throw new Exception('Erro no getCEP. Motivo: '.$insert_cep['motivo']);
                    }
                }else{
                    throw new Exception('Erro no insertCEP. Motivo: '.$dados_cep['motivo']);
                }
            }
            $row = $res->fetch(PDO::FETCH_ASSOC);

            $dados['status']      = 200;
            $dados['motivo']      = 'OK';
            $dados['logradouro']  = $row['logradouro'];
            $dados['complemento'] = $row['complemento'];
            $dados['bairro']      = $row['bairro'];
            $dados['cidade']      = $row['cidade'];
            $dados['uf']          = $row['uf'];
        }catch(Exception $e){
            $dados['status'] = 400;
            $dados['motivo'] = $e->getMessage();
        }finally{
            return $dados;
        }


    }
    public static function insertCEP(Array $cep):Array
    {
        try{
            $conn = ConexaoController::connect();
            $conn->beginTransaction();

            $dados = [];
            $created_at = date('Y-m-d H:i:s');

            $sql = "INSERT INTO cep
                    (cep,logradouro,complemento,bairro,cidade,uf,ibge_municipio,ibge_estado,created_at) VALUES
                    (:cep,:logradouro,:complemento,:bairro,:cidade,:uf,:ibge_municipio,:ibge_estado,:created_at)";
            $stmt = $conn->prepare($sql);        
            $stmt->execute(
                [
                    ':cep'            => $cep['cep'],
                    ':logradouro'     => $cep['logradouro'],
                    ':complemento'    => $cep['complemento'],
                    ':bairro'         => $cep['bairro'],
                    ':cidade'         => $cep['cidade'],
                    ':uf'             => $cep['uf'],
                    ':ibge_municipio' => $cep['ibge_municipio'],
                    ':ibge_estado'    => $cep['ibge_estado'],
                    ':created_at'     => $created_at,
                ]
            );

            $id = $conn->lastInsertId();

            if($id > 0){
                $dados['status'] = 200;
                $dados['motivo'] = 'OK';
                $conn->commit();
            }else{
                throw new Exception("Erro no SQL do insertCEP.");  
            }

        }catch(Exception $e){
            $dados['status'] = 400;
            $dados['motivo'] = $e->getMessage();
            $conn->rollback();
        }finally{
            return $dados;
        }

    }

    
}