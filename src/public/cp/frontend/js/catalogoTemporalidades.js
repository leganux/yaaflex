
$(document).ready(function () {

    var UPDATE = '';
    var AdImg = '';


    $('#summernote_ES').summernote(SummerOptionsES);
    $('#summernote_EN').summernote(SummerOptionsEN);

    var DTingred = $('#temporalidades').DataTable({
        language: DT_es_mxLang,
        data: {},
        columns: [
            {
                data: "temp_es",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + row.temp_ES + '<hr> <span class="badge badge-dark">EN</span> <br>' + row.temp_EN;
                }
            },
            {
                data: "description",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + TableDescription(row.description_ES) + '<hr> <span class="badge badge-dark">EN</span> <br>' + TableDescription(row.description_EN)
                }
            },
            {
                data: "_id",
                render: function (data) {

                    return '<button value="' + data + '" class="btn btn-primary btn-sm ADDIMG_EMOTION" ><i class="fa fa-plus"></i></button> <div id="ImgSpaceEm_' + data + '"></div>'
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

        ],
        drawCallback: function (settings) {
            var api = this.api();

            // Output the data for the visible rows to the browser's console
            var rows = api.rows({ page: 'current' }).data()

            $.each(rows, function (i, item) {

                $.ajax({
                    url: '/api/temp/emotion/' + item._id,
                    method: 'GET'
                }).done(function (data) {
                    $.each(data.data, function (j, jtem) {
                        $('#ImgSpaceEm_' + item._id).append('<center><img alt="' + jtem.emotion_ES + '/' + jtem.emotion_EN + '" width="60px" src="' + jtem.img_url + '"><button value="' + jtem._id + '" class=" EliminaEm_ btn btn-danger btn-block btn-sm">Eliminar imagen</button></center>')
                    });
                }).fail(function (err) {
                    alertify.error('Ocurrio un error con  // An error have been ocurred ');
                    console.error(err);
                });

            });


        }
    });

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_temp_ES').val('')
        $('#summernote_ES').summernote('code', '')
        $('#txt_temp_EN').val('')
        $('#summernote_EN').summernote('code', '')
        $('#img_temp_save').val('')
        $('#img_temp').val('')
    });

    $('#SaveChangesImage').click(function () {
        var data = {
            temporalidad: AdImg,
            order: $('#img_order_temp').val(),
            emotion_ES: $('#img_text_ES_temp').val(),
            emotion_EN: $('#img_text_EN_temp').val(),
            img_url: $('#img_temp_save').val(),
        }
        if (data.order == "" || data.emotion_EN == "" || data.emotion_ES == "") {
            alertify.error('Debe llenar todos los datos');
        }
        else {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: '/api/temp/emotion/',
                method: 'POST',
                data: data
            }).done(function (data) {
                HoldOn.close();
                $('#myDataIMG').modal('hide');
                traeTemporalidades();
                alertify.success('Guardado con exito! // Saved correctly');
            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error con  // An error have been ocurred ');
                console.error(err);
            });
        }
    })


    $(document.body).on('click', '.ADDIMG_EMOTION', function () {
        AdImg = $(this).val();
        $('#myDataIMG').modal('show');
    })

    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/temp/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_temp_ES').val(data.temp_ES)
                $('#summernote_ES').summernote('code', data.description_ES)
                $('#txt_temp_EN').val(data.temp_EN)
                $('#summernote_EN').summernote('code', data.description_EN)
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
                url: "/api/temp/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeTemporalidades();
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
   
    $(document).on('click', '.EliminaEm_', function () {
        DELETE = $(this).val();
        alertify.confirm('Confirma eliminar', '¿Seguro que desea eliminar este elemento? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/temp/emotion/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeTemporalidades();
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


    var traeTemporalidades = function () {
        DTingred.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/temp",
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


    $('#img_temp').change(function () {
        if (ValidateFile($(this))) {
            HoldOn.open(HoldOptions);
            var data = new FormData();
            data.append('Emocion', $('#img_temp')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {
                    HoldOn.close();
                    if (data.success) {
                        $('#img_temp_save').val(data.file);
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
        if ($('#txt_temp_ES').val() !== '' && !$('#summernote_ES').summernote('isEmpty') && $('#txt_temp_EN').val() !== '' && !$('#summernote_EN').summernote('isEmpty')) {
            var data = {
                temp_ES: $('#txt_temp_ES').val(),
                description_ES: $('#summernote_ES').summernote('code'),
                temp_EN: $('#txt_temp_EN').val(),
                description_EN: $('#summernote_EN').summernote('code')
            }
            var url = "/api/temp";
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
                traeTemporalidades();
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


    traeTemporalidades();
});
