# cadastro-cep
  Página de Cadastro Simples, ao se inserir o valor no campo CEP é feita uma consulta via API para preenchimento automático dos campos correspondentes.

## Instalação
  1. Faça o clone desse projeto.
  2. Na pasta lib\sql, rode o sql cadastro-cep.sql
  3. Na pasta lib\php\classes, abra o arquivo ConexaoController.php e no construct informe os dados de conexão (exemplo abaixo):
       
        * $db_host    = "localhost";
        * $db_nome    = "cadastro-cep";
        * $db_usuario = "root";
        * $db_senha   = "";
        * $db_driver  = "mysql";
       
  4. Execute o seu navegador.   

## Demonstração
[Demo] http://www.beptec.com.br/cadastro-cep
