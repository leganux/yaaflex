
$(document).ready(function () {

    var UPDATE = '';
    $('#summernote_ES').summernote(SummerOptionsESimg);
    $('#summernote_EN').summernote(SummerOptionsENimg);

    var DTingred = $('#articulos').DataTable({
        language: DT_es_mxLang,
        data: {},
        columns: [
            {
                data: "article_ES",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + row.article_ES + '<hr> <span class="badge badge-dark">EN</span> <br>' + row.article_EN;
                }
            },
            {
                data: "content_ES",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + TableDescription(row.content_ES) + '<hr> <span class="badge badge-dark">EN</span> <br>' + TableDescription(row.content_EN)
                }
            },
            {
                data: "thumbnail",
                render: function (data) {
                    return '<img width="200px" class="img-responsive img-thumbnail" src="' + data + '">'
                }
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
        $('#txt_art_ES').val('')
        $('#summernote_ES').summernote('code', '')
        $('#txt_art_EN').val('')
        $('#summernote_EN').summernote('code', '')
        $('#img_art_save').val('')
        $('#img_art').val('')
    });


    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/articulo/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_art_ES').val(data.article_ES)
                $('#summernote_ES').summernote('code', data.content_ES)
                $('#txt_art_EN').val(data.article_EN)
                $('#summernote_EN').summernote('code', data.content_EN)
                $('#img_art_save').val(data.thumbnail);
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
                url: "/api/articulo/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeArticulos();
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


    var traeArticulos = function () {
        DTingred.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/articulo",
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


    $('#img_art').change(function () {
        if (ValidateFile($(this))) {
            HoldOn.open(HoldOptions);
            var data = new FormData();
            data.append('Articulo', $('#img_art')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {
                    HoldOn.close();
                    if (data.success) {
                        $('#img_art_save').val(data.file);
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
        if ($('#txt_art_ES').val() !== '' && !$('#summernote_ES').summernote('isEmpty') && $('#txt_art_EN').val() !== '' && !$('#summernote_EN').summernote('isEmpty')) {
            var data = {
                article_ES: $('#txt_art_ES').val(),
                content_ES: $('#summernote_ES').summernote('code'),
                article_EN: $('#txt_art_EN').val(),
                content_EN: $('#summernote_EN').summernote('code'),
                thumbnail: $('#img_art_save').val(),
                active: true
            }
            var url = "/api/articulo";
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
                traeArticulos();
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

    $('#txt_art_ES').change(function () {
        var value = $(this).val();
        if ($('#txt_art_EN').val() == "") {
            $('#txt_art_EN').val(value);
        }
    });

    $('#txt_art_EN').change(function () {
        var value = $(this).val();
        if ($('#txt_art_ES').val() == "") {
            $('#txt_art_ES').val(value);
        }
    });


    traeArticulos();


    $('.note-image-input').hide();

    $('#img_').change(function () {
        if (ValidateFile($(this))) {
            HoldOn.open(HoldOptions);
            var data = new FormData();
            data.append('Articulo_image', $('#img_')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {
                    HoldOn.close();
                    if (data.success) {
                        $('#img_save').val(data.file);
                        $('#img_').val('');
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


});
