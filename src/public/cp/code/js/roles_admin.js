
$(document).ready(function () {

    var UPDATE = '';

    var DT = $('#roles_admin').DataTable({
        language: DT_Lang,
        data: {},
        columns: [
            {
                data: "username",

            },
            {
                data: "dt_reg",

            },
            {
                data: "_id",
                render: function (data) {
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fas fa-edit"></i></button>'
                        + '</center>'
                }
            },

        ]
    });

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_name').val('')
        $('#txt_description').val('')
    });


    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/admin/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_username').val(data.username)
                $('#txt_email').val(data.email)
                $('#txt_password').val(data.password)
                $('#txt_active').val(data.active.toString())
                $('#txt_role').val(data.role)
                $('#myDataModal').modal('show');
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    });

    $(document).on('click', '.DeleteElement', function () {
        DELETE = $(this).val();
        alertify.confirm('Confirma eliminar', '¿Seguro que desea eliminar este elemento? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/admin/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeAdministradores();
                alertify.success('Eliminado correctamente // Delete success ')
            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });
        }, function () {
            HoldOn.close();
        });

    });


    var traeAdministradores = function () {
        DT.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/admin",
        }).done(function (data) {

            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {

                    DT.clear().rows.add(data.data).draw();
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    }




    $('#SaveChanges').click(function () {
        if ($('#txt_username').val() !== '' && $('#txt_email').val() && $('#txt_password').val()) {
            var data = {
                username: $('#txt_username').val(),
                email: $('#txt_email').val(),
                password: $('#txt_password').val(),
                active: $('#txt_active').val(),
                role: $('#txt_role').val(),
            }
            var url = "/api/admin";
            var method = 'POST';
            if (UPDATE !== '') {
                url = url + '/' + UPDATE;
                method = 'PUT'
            }
            $.ajax({
                url: url,
                method: method,
                data: data
            }).done(function (data) {
                HoldOn.close();
                $('#myDataModal').modal('hide');
                traeAdministradores();
                alertify.success('Guardado con exito! // Saved correctly');
            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error con  // An error have been ocurred ');
                console.error(err);
            });

        } else {
            alertify.error('Ingrese todos los datos / Insert all data');
            console.error(err);
        }

    });


    traeAdministradores();
});
