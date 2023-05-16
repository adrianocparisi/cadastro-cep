var path = null;

function __getPath() {
    var prot = window.location.protocol;
    var host = window.location.host;
    var path_name = window.location.pathname;

    path = prot + "//" + host + path_name;

    return path;
}

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

function __modalClientDelete(id) {
    Swal.fire({
        title: "Parceiros de Negócios",
        text: "Deseja remover o parceiro de negócios?",
        showDenyButton: true,
        confirmButtonText: "Remover",
        denyButtonText: "Cancelar",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            __deleteClient(id);
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
    //var sobrenome = $("#sobrenome").val();
    var cep = $("#cep").val();
    var endereco = $("#endereco").val();
    var numero = $("#numero").val();
    var complemento = $("#complemento").val();
    var bairro = $("#bairro").val();
    var cidade = $("#cidade").val();
    var estado = $("#estado").val();

    $("#nome").css("border", "1px solid #008000");
    //$("#sobrenome").css("border", "1px solid #008000");
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
        html += "<p>O campo RAZÃO SOCIAL ou NOME é obrigatório.</p>";
        $("#nome").css("border", "1px solid #FF0000");
    }
    /*
    if ($.trim(sobrenome) == "") {
        error = true;
        html += "<p>O campo SOBRENOME é obrigatório.</p>";
        $("#sobrenome").css("border", "1px solid #FF0000");
    }
    */
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

function __managerClient() {
    var nome = $("#nome").val();
    var cep = $("#cep").val();
    var endereco = $("#endereco").val();
    var numero = $("#numero").val();
    var complemento = $("#complemento").val();
    var bairro = $("#bairro").val();
    var cidade = $("#cidade").val();
    var estado = $("#estado").val();

    var url = __getPath() + "lib/php/cliente.php";
    $.ajax({
        url: url,
        dataType: "JSON",
        type: "POST",
        timeout: 5000,
        data: {
            acao: 1,
            razaosocial: nome,
            cep: cep,
            logradouro: endereco,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
        },
        beforeSend: function () {
            $("#btn-cadastro-cep").css("display", "none");
            $("#ldg-cadastro-cep").css("display", "inline");
        },
        complete: function () {
            $("#btn-cadastro-cep").css("display", "inline");
            $("#ldg-cadastro-cep").css("display", "none");
        },
        success: function (data) {
            if (data.status == 200) {
                __listTableClient(data);

                Swal.fire(
                    "Parceiros de Negócios",
                    "Cadastro efetuado com sucesso",
                    "success"
                );
                $("#nome").val("");
                $("#cep").val("");
                $("#endereco").val("");
                $("#numero").val("");
                $("#complemento").val("");
                $("#bairro").val("");
                $("#cidade").val("");
                $("#estado").val("");

                $("#nome").css("border", "1px solid #999999");
                $("#cep").css("border", "1px solid #999999");
                $("#endereco").css("border", "1px solid #999999");
                $("#numero").css("border", "1px solid #999999");
                $("#complemento").css("border", "1px solid #999999");
                $("#bairro").css("border", "1px solid #999999");
                $("#cidade").css("border", "1px solid #999999");
                $("#estado").css("border", "1px solid #999999");
            } else {
                Swal.fire(
                    "Parceiros de Negócios",
                    "Erro ao Cadastrar <br>Motivo:" + data.motivo,
                    "error"
                );
            }
        },
        error: function (xhr, status, error) {
            Swal.fire(
                "Parceiros de Negócios",
                "Lamento! Ocorreu um erro interno.Entre em contato com o desenvolvedor.Erro: " +
                    xhr.responseText,
                "error"
            );
        },
    });
}

function __deleteClient(id) {
    var url = __getPath() + "lib/php/cliente.php";
    $.ajax({
        url: url,
        dataType: "JSON",
        type: "POST",
        timeout: 5000,
        data: {
            acao: 3,
            id: id,
        },
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            if (data.status == 200) {
                $($("#" + id).closest("tr")).remove();
            } else {
                Swal.fire(
                    "Parceiros de Negócios",
                    "Erro ao Cadastrar <br>Motivo:" + data.motivo,
                    "error"
                );
            }
        },
        error: function (xhr, status, error) {
            Swal.fire(
                "Parceiros de Negócios",
                "Lamento! Ocorreu um erro interno.Entre em contato com o desenvolvedor.Erro: " +
                    xhr.responseText,
                "error"
            );
        },
    });
}

function __listClient() {
    var url = __getPath() + "lib/php/cliente.php";
    $.ajax({
        url: url,
        dataType: "JSON",
        type: "POST",
        timeout: 5000,
        data: {
            acao: 2,
        },
        beforeSend: function () {},
        complete: function () {},
        success: function (data) {
            if (data.status == 200) {
                __listTableClient(data);
            } else {
                Swal.fire(
                    "Parceiros de Negócios",
                    "Erro ao Listar <br>Motivo:" + data.motivo,
                    "error"
                );
            }
        },
        error: function (xhr, status, error) {
            Swal.fire(
                "Parceiros de Negócios",
                "Lamento! Ocorreu um erro interno.Entre em contato com o desenvolvedor.Erro: " +
                    xhr.responseText,
                "error"
            );
        },
    });
}

function __listTableClient(data) {
    var len = data.cliente.length;
    for (var i = 0; i < len; i++) {
        var id = data.cliente[i].id;
        var razaosocial = data.cliente[i].razaosocial;
        var endereco = data.cliente[i].endereco;
        var created_at = data.cliente[i].created_at;

        var tr_str =
            "<tr class='small' id=" +
            id +
            ">" +
            "<td align='center'>" +
            "<button type='button' class='btn btn-danger btn-sm' alt='Remover' title='Remover' onclick='__modalClientDelete(" +
            id +
            ");'><i class='fa fa-trash'></i></button>" +
            "</td>" +
            "<td align='left'>" +
            razaosocial +
            "</td>" +
            "<td align='left'>" +
            endereco +
            "</td>" +
            "<td align='left'>" +
            created_at +
            "</td>" +
            "</tr>";

        $("#tbl-cadastro-cep tbody").append(tr_str);
    }
}

function __getCEP() {
    var cep = $("#cep").val();
    var url = __getPath() + "lib/php/cep.php";

    $("#cep").css("border", "1px solid #008000");

    if (cep == "") {
        $("#cep").css("border", "1px solid #FF0000");
        return false;
    }
    if (cep.length < 9) {
        $("#cep").css("border", "1px solid #FF0000");
        return false;
    }

    $("#endereco").val("");
    $("#complemento").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#estado").val("");

    $.ajax({
        url: url,
        dataType: "JSON",
        type: "POST",
        timeout: 5000,
        data: {
            cep: cep,
        },
        beforeSend: function () {
            $("#cep").css("display", "none");
            $("#ldg-cep").css("display", "inline");
        },
        complete: function () {
            $("#cep").css("display", "inline");
            $("#ldg-cep").css("display", "none");
        },
        success: function (data) {
            if (data.status == 200) {
                $("#endereco").val(data.logradouro);
                $("#complemento").val(data.complemento);
                $("#bairro").val(data.bairro);
                $("#cidade").val(data.cidade);
                $("#estado").val(data.uf);
                $("#numero").focus();
            } else {
                Swal.fire(
                    "Parceiros de Negócios",
                    "CEP não encontrado <br>" + data.motivo,
                    "error"
                );
                $("#cep").css("border", "1px solid #FF0000");
                $("#cep").val("");
                $("#cep").focus();
            }
        },
        error: function (xhr, status, error) {
            $("#cep").css("border", "1px solid #FF0000");
            $("#cep").focus();
            Swal.fire(
                "Parceiros de Negócios",
                "Lamento! Ocorreu um erro interno.Entre em contato com o desenvolvedor.Erro: " +
                    xhr.responseText,
                "error"
            );
        },
    });
}
