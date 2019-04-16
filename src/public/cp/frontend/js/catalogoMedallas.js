
$(document).ready(function () {

    var UPDATE = '';
    $('#summernote_ES').summernote(SummerOptionsES);
    $('#summernote_EN').summernote(SummerOptionsEN);

    var DTingred = $('#medallas').DataTable({
        language: DT_es_mxLang,
        data: {},
        columns: [
            {
                data: "medal_es",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + row.medal_ES + '<hr> <span class="badge badge-dark">EN</span> <br>' + row.medal_EN;
                }
            },
            {
                data: "description",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + TableDescription(row.description_ES) + '<hr> <span class="badge badge-dark">EN</span> <br>' + TableDescription(row.description_EN)
                }
            },
            {
                data: "img_url",
                render: function (data) {
                    return '<img width="200px" class="img-responsive img-thumbnail" src="' + data + '">'
                }
            },
            {
                data: "trigger",
                render: function (data, type, row) {
                    switch (Number(data)) {
                        case 1:
                            return '<center><h3> Publicaciones / Post  </h3></center>';
                            break;
                        case 2:
                            return '<center><h3> Comentarios realizados/Comments maked  </h3></center>';
                            break;
                        case 3:
                            return '<center><h3> Comentarios obtenidos /Comments recived  </h3></center>';
                            break;
                        case 4:
                            return '<center><h3>  Follows </h3></center>';
                            break;
                        case 5:
                            return '<center><h3> Followers   </h3></center>';
                            break;
                        case 6:
                            return '<center><h3> Manual  </h3></center>';
                            break;
                    }
                }

            },
            {
                data: "trigger_min",

            },
            {
                data: "_id",
                render: function (data) {
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fa fa-pencil"></i></button>'
                        + '</center>'
                }
            },

        ]
    });

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_medal_ES').val('')
        $('#summernote_ES').summernote('code', '')
        $('#txt_medal_EN').val('')
        $('#summernote_EN').summernote('code', '')
        $('#img_medal_save').val('')
        $('#img_medal').val('')
        $('#trigger_medal').val(-1)
        $('#trigger_medal_count').val('')
    });


    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/medal/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_medal_ES').val(data.medal_ES)
                $('#summernote_ES').summernote('code', data.description_ES)
                $('#txt_medal_EN').val(data.medal_EN)
                $('#summernote_EN').summernote('code', data.description_EN)
                $('#img_medal_save').val(data.img_url);
                $('#trigger_medal').val(data.trigger);
                $('#trigger_medal_count').val(data.trigger_min);
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
                url: "/api/medal/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeMedallas();
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


    var traeMedallas = function () {
        DTingred.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/medal",
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                   
                    DTingred.clear().rows.add(data.data).draw();
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    }


    $('#img_medal').change(function () {
        if (ValidateFile($(this))) {
            HoldOn.open(HoldOptions);
            var data = new FormData();
            data.append('Medalla', $('#img_medal')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {
                    HoldOn.close();
                    if (data.success) {
                        $('#img_medal_save').val(data.file);
                    }
                },
                error: function (err) {
                    HoldOn.close();
                    alertify.error('Ocurrio un error con la imagen  // An error have been ocurred with the picture');
                    console.error(err);
                }
            });
        }
    })

    $('#SaveChanges').click(function () {
        if (
            $('#txt_medal_ES').val() !== ''
            && !$('#summernote_ES').summernote('isEmpty')
            && $('#txt_medal_EN').val() !== ''
            && !$('#summernote_EN').summernote('isEmpty')
            && Number($('#trigger_medal').val()) !== -1
            && Number($('#trigger_medal_count').val()) > 0
        ) {
            var data = {
                medal_ES: $('#txt_medal_ES').val(),
                description_ES: $('#summernote_ES').summernote('code'),
                medal_EN: $('#txt_medal_EN').val(),
                description_EN: $('#summernote_EN').summernote('code'),
                img_url: $('#img_medal_save').val(),
                trigger: $('#trigger_medal').val(),
                trigger_min: $('#trigger_medal_count').val(),
            }
            var url = "/api/medal";
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
                traeMedallas();
                alertify.success('Guardado con exito! // Saved correctly');
            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error con  // An error have been ocurred ');
                console.error(err);
            });

        } else {
            alertify.error('Ingrese todos los datos / Insert all data');
        }

    });


    traeMedallas();
});
