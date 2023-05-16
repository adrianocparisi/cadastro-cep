<?php
class ConexaoController
{
   
    protected static $db;
    private function __construct()
    {
        # Informações sobre o banco de dados:
        $db_host    = "localhost";
        $db_nome    = "cadastro-cep";
        $db_usuario = "root";
        $db_senha   = "";
        $db_driver  = "mysql";
        # Informações sobre o banco de dados:

        try{
            self::$db = new PDO("$db_driver:host=$db_host; dbname=$db_nome", $db_usuario, $db_senha);
            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$db->exec('SET NAMES utf8');
        }catch (PDOException $e){
            die("Connection Error: " . $e->getMessage());
        }
    }
    public static function connect()
    {
        if (!self::$db)
        {
            new ConexaoController();
        }
        return self::$db;
    }

}