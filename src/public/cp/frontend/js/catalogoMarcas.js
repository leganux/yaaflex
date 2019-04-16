
$(document).ready(function () {

    var UPDATE = '';
    $('#summernote_ES').summernote(SummerOptionsES);
    $('#summernote_EN').summernote(SummerOptionsEN);

    var DTingred = $('#marcas').DataTable({
        language: DT_es_mxLang,
        data: {},
        columns: [
            {
                data: "brand_es",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + row.brand_ES + '<hr> <span class="badge badge-dark">EN</span> <br>' + row.brand_EN;
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
        $('#txt_brand_ES').val('')
        $('#summernote_ES').summernote('code', '')
        $('#txt_brand_EN').val('')
        $('#summernote_EN').summernote('code', '')
        $('#img_brand_save').val('')
        $('#img_brand').val('')
    });


    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/brand/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_brand_ES').val(data.brand_ES)
                $('#summernote_ES').summernote('code', data.description_ES)
                $('#txt_brand_EN').val(data.brand_EN)
                $('#summernote_EN').summernote('code', data.description_EN)
                $('#img_brand_save').val(data.img_url);
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
                url: "/api/brand/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeMarcas();
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


    var traeMarcas = function () {
        DTingred.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/brand",
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


    $('#img_brand').change(function () {
        if (ValidateFile($(this))) {
            HoldOn.open(HoldOptions);
            var data = new FormData();
            data.append('Marca', $('#img_brand')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {
                    HoldOn.close();
                    if (data.success) {
                        $('#img_brand_save').val(data.file);
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
        if ($('#txt_brand_ES').val() !== '' && !$('#summernote_ES').summernote('isEmpty') && $('#txt_brand_EN').val() !== '' && !$('#summernote_EN').summernote('isEmpty')) {
            var data = {
                brand_ES: $('#txt_brand_ES').val(),
                description_ES: $('#summernote_ES').summernote('code'),
                brand_EN: $('#txt_brand_EN').val(),
                description_EN: $('#summernote_EN').summernote('code'),
                img_url: $('#img_brand_save').val()
            }
            var url = "/api/brand";
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
                traeMarcas();
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

    $('#txt_brand_ES').change(function () {
        var value = $(this).val();
        if ($('#txt_brand_EN').val() == "") {
            $('#txt_brand_EN').val(value);
        }
    });

    $('#txt_brand_EN').change(function () {
        var value = $(this).val();
        if ($('#txt_brand_ES').val() == "") {
            $('#txt_brand_ES').val(value);
        }
    });


    traeMarcas();
});
