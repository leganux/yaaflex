
var allEmails = []
$(document).ready(function () {

    var UPDATE = '';
    var Medal4 = '';




    var DT = $('#usuarios').DataTable({
        language: DT_es_mxLang,
        data: {},
        "drawCallback": function (settings) {
            var api = this.api();
            $.getJSON('/api/cat/getCountry', {}, function (data) {
                if (data.success) {
                    $.each(data.data, function (i, item) {
                        $('.country_' + item.id).html(item.name);
                    });
                }
            });
            $.getJSON('/cdn/assets/catalogs/states.json', {}, function (data) {
                $.each(data, function (i, item) {
                    $('.state_' + item.id).html(item.name);
                });
            });


            var rows = api.rows({ page: 'current' }).data()

            $.each(rows, function (j, jtem) {
                $.getJSON('/api/medalsbyuser', {
                    strictsearch: {
                        user: jtem._id
                    }
                }, function (datas) {
                    if (datas.success) {
                        $.each(datas.data, function (i, item) {

                            $('#medalSPace_' + item.user._id).append('<hr> ' +
                                '<label>' + item.medal.medal_ES + ' / ' + item.medal.medal_EN + '</label>' +
                                '<img class="img-responsive " src="' + item.medal.img_url + '"><br>' +
                                '<button class=" DeleteMedal btn btn-danger btn-block" value="' + item._id + '"><i class="fa fa-trash"></i></button>' +
                                '<hr>');


                        })
                    }
                });
            });

        },
        columns: [
            {
                data: "_id",

            },
            {
                data: "username",

            },
            {
                data: "full_name",

            },
            {
                data: "email",

            },
            {
                data: "dt_reg",

            },
            {
                data: "provider",
                render: function (data, s, row) {
                    elem = row;
                    var lineaSocial = '';
                    if (elem.facebook_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.facebook_uri + '" target="_blank"><i class="fa fa-facebook"></i></a>'
                    }
                    if (elem.instagram_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.instagram_uri + '" target="_blank"><i class="fa fa-instagram"></i></a>'
                    }
                    if (elem.twitter_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.twitter_uri + '" target="_blank"><i class="fa fa-twitter"></i></a>'
                    }
                    if (elem.youtube_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.youtube_uri + '" target="_blank"><i class="fa fa-youtube"></i></a>'
                    }

                    return data + '<hr>' + lineaSocial;
                }

            },
            {
                data: "provider_picture",
                render: function (data) {
                    return '<img width="50px" src="' + data + '">'
                }

            },
            {
                data: "_id",
                render: function (data, s, row) {
                    return '<ul>' +
                        '<li><strong>Lenguaje/Lang:</strong>' + row.lang + '</li>' +
                        '<li><strong>Edad/Age:</strong>' + row.age + '</li>' +
                        '<li><strong>Genero / Gender:</strong>' + row.gender + '</li>' +
                        '<li><strong>Telefono/Phone:</strong>' + row.phone + '</li>' +
                        '<li><strong>Celeular/Cellphone:</strong>' + row.cellphone + '</li>' +
                        '<li><strong>Direccion/Address:</strong> ' + row.adress + '</li>' +
                        '<li><strong>Ciudad/City:</strong> ' + row.city + '</li>' +
                        '<li><strong>Estado/State:</strong><p class="state_' + row.state + '"></p></li>' +
                        '<li><strong>Pais/Country:</strong><p class="country_' + row.country + '"></p></li>' +
                        '<li><strong>CP/Zip:</strong>' + row.zip_code + '</li>' +

                        '</ul>'
                }

            },
            {
                data: "active",
                render: function (data, type, row) {
                    if (data) {
                        return '<center> <div class="checkbox"> <label> <input checked class="activo_user" type="checkbox" value="' + row._id + '"></label> </div></center> '
                    }
                    return '<center> <div class="checkbox"> <label> <input  class="activo_user" type="checkbox" value="' + row._id + '"></label> </div></center> '

                }
            },
            {
                data: "isNonUserEdited",
                render: function (data, type, row) {
                    if (data) {
                        return '<center> <div class="checkbox"> <label> <input checked class="usernameedited_" type="checkbox" value="' + row._id + '"></label> </div></center> '
                    }
                    return '<center> <div class="checkbox"> <label> <input  class="usernameedited_" type="checkbox" value="' + row._id + '"></label> </div></center> '

                }
            },
            {
                data: "rieviewer",
                render: function (data, type, row) {
                    if (data) {
                        return '<center> <div class="checkbox"> <label> <input checked class="isreviewer_" type="checkbox" value="' + row._id + '"></label> </div></center> '
                    }
                    return '<center> <div class="checkbox"> <label> <input  class="isreviewer_" type="checkbox" value="' + row._id + '"></label> </div></center> '

                }
            },
            {
                data: "_id",
                render: function (data, s, row) {
                    if (row.bio)
                        return row.bio;
                    else
                        return ''
                }


            },
            {
                data: "_id",
                render: function (data, y, row) {
                    var bntMail = ''
                    if (row.email && row.email != 'undefinied') {
                        if (!allEmails.includes(row.email)) {
                            allEmails.push(row.email)
                        }
                        bntMail = '<button class=" EmailUser_ btn btn-primary" value="' + row.email + '"><i class="fa fa-envelope"></i></button>';
                    }
                    return '<center>' +
                        '<button class=" DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>' +
                        bntMail
                        + '</center>'
                }
            },
            {
                data: "_id",
                render: function (data) {







                    return '<center>' +
                        '<button class=" ADDMedal btn btn-success" value="' + data + '"><i class="fa fa-plus"></i></button>'
                        + '</center> <hr> <div id="medalSPace_' + data + '"></div>'
                }
            },

        ]
    });




    $(document).on('click', '.DeleteElement', function () {
        DELETE = $(this).val();
        alertify.confirm('Confirma eliminar', '¿Seguro que desea eliminar este elemento? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/user/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeUsuarios();
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


    $(document).on('click', '.DeleteMedal', function () {
        DELETE = $(this).val();
        alertify.confirm('Confirma eliminar', '¿Seguro que desea eliminar este elemento? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/medalsbyuser/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeUsuarios();
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


    var traeUsuarios = function () {
        DT.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/user",
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


    $(document.body).on('click', '.ADDMedal', function () {
        Medal4 = $(this).val();
        $('#MyData_addMedal').modal('show');
    });



    function formatState(opt) {
        if (!opt.id) {
            return opt.text.toUpperCase();
        }

        var optimage = $(opt.element).attr('data-image');

        if (!optimage) {
            return opt.text;
        } else {
            var $opt = $(
                '<span ><img src="' + optimage + '" width="60px" /> ' + opt.text + '</span>'
            );
            return $opt;
        }
    };

    var toSelect = ['SelectorMedal']

    var inicializeSelect2 = function (el) {
        $("#" + el).select2({
            width: '100%',
            templateResult: formatState,
            placeholder: "Select...",
            allowClear: true,
            dropdownParent: $("#MyData_addMedal")
        });
        $("#" + el).select2('val', '')
    }


    $.each(toSelect, function (i, item) {
        inicializeSelect2(item)
    });


    $.get('/api/medal', {
        strictsearch: {
            trigger: 6
        }
    }, function (data) {
        if (data.success) {
            $.each(data.data, function (i, item) {
                $('#SelectorMedal').append('<option data-image="' + item.img_url + '" value="' + item._id + '" >' + item.medal_ES + '/' + item.medal_EN + '</option>');
            });
        }
    });

    $('#SaveChangesMEDAL').click(function () {
        var dt = $('#SelectorMedal').select2('data')[0].id;
        $.post('/api/medalsbyuser', { user: Medal4, medal: dt }, function (data) {
            if (data.success) {
                traeUsuarios();
            }
        });
    });

    $(document.body).on('change', '.activo_user', function () {
        isActive = $(this).prop('checked');
        vaule = $(this).val();
        $.ajax({
            url: '/api/user/' + vaule,
            method: 'PUT',
            data: { active: isActive }
        }).done(function (data) {
            HoldOn.close();

            traeUsuarios();
            alertify.success('Guardado con exito! // Saved correctly');
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error con  // An error have been ocurred ');
            console.error(err);
        });

    });

    $(document.body).on('change', '.usernameedited_', function () {
        isActive = $(this).prop('checked');
        vaule = $(this).val();
        $.ajax({
            url: '/api/user/' + vaule,
            method: 'PUT',
            data: { isNonUserEdited: isActive }
        }).done(function (data) {
            HoldOn.close();

            traeUsuarios();
            alertify.success('Guardado con exito! // Saved correctly');
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error con  // An error have been ocurred ');
            console.error(err);
        });

    });

    $(document.body).on('change', '.isreviewer_', function () {
        isActive = $(this).prop('checked');
        vaule = $(this).val();
        $.ajax({
            url: '/api/user/' + vaule,
            method: 'PUT',
            data: { rieviewer: isActive }
        }).done(function (data) {
            HoldOn.close();

            traeUsuarios();
            alertify.success('Guardado con exito! // Saved correctly');
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error con  // An error have been ocurred ');
            console.error(err);
        });

    });

    $(document.body).on('click', '.EmailUser_', function () {
        var value = $(this).val()
        $('#Modal_Mail').modal('show');
        $('#MailTo_').val(value);
    });
   
    $(document.body).on('click', '#massiveEmail_', function () {
        $('#Modal_Mail').modal('show');
        $('#MailTo_').val(allEmails.join(','));
    });


    traeUsuarios();
});
