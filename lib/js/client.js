function __modalClient() {
    Swal.fire({
        title: "Parceiros de Negócios",
        text:
            "Deseja cadastrar " +
            $("#nome").val() +
            " como parceiro de negócios?",
        showDenyButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if (__validateClient()) {
                __managerClient();
            }
        } else if (result.isDenied) {
            Swal.fire(
                "Parceiros de Negócios",
                "Operação cancelada pelo usuário",
                "info"
            );
        }
    });
}

function __validateClient() {
    $("#error").css("display", "none");
    $("#error_txt").empty();

    var nome = $("#nome").val();
    var sobrenome = $("#sobrenome").val();
    var cep = $("#cep").val();
    var endereco = $("#endereco").val();
    var numero = $("#numero").val();
    var complemento = $("#complemento").val();
    var bairro = $("#bairro").val();
    var cidade = $("#cidade").val();
    var estado = $("#estado").val();

    $("#nome").css("border", "1px solid #008000");
    $("#sobrenome").css("border", "1px solid #008000");
    $("#cep").css("border", "1px solid #008000");
    $("#endereco").css("border", "1px solid #008000");
    $("#numero").css("border", "1px solid #008000");
    $("#complemento").css("border", "1px solid #008000");
    $("#bairro").css("border", "1px solid #008000");
    $("#cidade").css("border", "1px solid #008000");
    $("#estado").css("border", "1px solid #008000");

    var error = false;
    var html = "";

    if ($.trim(nome) == "") {
        error = true;
        html += "<p>O campo NOME é obrigatório.</p>";
        $("#nome").css("border", "1px solid #FF0000");
    }
    if ($.trim(sobrenome) == "") {
        error = true;
        html += "<p>O campo SOBRENOME é obrigatório.</p>";
        $("#sobrenome").css("border", "1px solid #FF0000");
    }
    if ($.trim(cep) == "") {
        error = true;
        html += "<p>O campo CEP é obrigatório.</p>";
        $("#cep").css("border", "1px solid #FF0000");
    }
    if ($.trim(endereco) == "") {
        error = true;
        html += "<p>O campo ENDEREÇO é obrigatório.</p>";
        $("#endereco").css("border", "1px solid #FF0000");
    }
    if ($.trim(numero) == "") {
        error = true;
        html += "<p>O campo NÚMERO é obrigatório.</p>";
        $("#numero").css("border", "1px solid #FF0000");
    }
    if ($.trim(bairro) == "") {
        error = true;
        html += "<p>O campo BAIRRO é obrigatório.</p>";
        $("#bairro").css("border", "1px solid #FF0000");
    }
    if ($.trim(cidade) == "") {
        error = true;
        html += "<p>O campo CIDADE é obrigatório.</p>";
        $("#cidade").css("border", "1px solid #FF0000");
    }
    if ($.trim(estado) == "") {
        error = true;
        html += "<p>O campo ESTADO é obrigatório.</p>";
        $("#estado").css("border", "1px solid #FF0000");
    }

    if (error) {
        $("#error").css("display", "inline");
        Swal.fire("Parceiros de Negócios", html, "error");
        return false;
    }
    return true;
}

function __managerClient() {}
