function __modalClient() {
    Swal.fire({
        title:
            "Deseja cadastrar " +
            $("#nome").val() +
            " como parceiro de negócios?",
        showDenyButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: "Cancelar",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Parceiro de Negócios salvo com sucesso!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Operação cancelada pelo usuário", "", "info");
        }
    });
}
