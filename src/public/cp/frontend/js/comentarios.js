$(document).ready(function () {

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

    var DTComentarios = $('#Comentarios').DataTable({
        language: DT_es_mxLang,
        data: {},
        columns: [
            {
                data: "_id",

            },
            {
                data: "user",
                render: function (data, y, row) {
                    return '<b>ID:</b> <p>' + data._id + '</p>' +
                        '<b>Username: </b><p>' + data.username + '</p>';
                }

            },
            {
                data: "post",
                render: function (data, y, row) {
                    var nombre = '';
                    var item = data
                    if (item.isReply == true) {
                        nombre = item.copy_title
                    } else {
                        nombre = item.post_ES + ' / ' + item.post_EN;
                    }
                    return '<b>ID:</b> <p>' + data._id + '</p>' +
                        '<b>Nombre Post: </b><p>' + nombre + '</p>';
                }

            },
            {
                data: "comment",

            },
            {
                data: "_id",
                render: function (data, y, row) {
                    return '<center>' +
                        '<button class="DeleteElement_comment btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '</center>'
                }

            },
        ]
    });

    $(document).on('click', '.DeleteElement_reply', function () {
        DELETE = $(this).val();
        alertify.confirm('Confirma eliminar', '¿Seguro que desea eliminar este elemento? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/reply/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                llenaTablaReplies(lastConfigRep);
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

    $(document).on('click', '.DeleteElement_comment', function () {
        DELETE = $(this).val();
        alertify.confirm('Confirma eliminar', '¿Seguro que desea eliminar este elemento? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/comment/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                llenaTablaComments(lastConfig);
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

    var DTReplicas = $('#Respuestas').DataTable({
        language: DT_es_mxLang,
        data: {},

        columns: [
            {
                data: "_id",

            },
            {
                data: "user",
                render: function (data, y, row) {
                    return '<b>ID:</b> <p>' + data._id + '</p>' +
                        '<b>Username: </b><p>' + data.username + '</p>';
                }

            },
            {
                data: "post",
                render: function (data, y, row) {
                    var nombre = '';
                    var item = data
                    if (item.isReply == true) {
                        nombre = item.copy_title
                    } else {
                        nombre = item.post_ES + ' / ' + item.post_EN;
                    }
                    return '<b>ID:</b> <p>' + data._id + '</p>' +
                        '<b>Nombre Post: </b><p>' + nombre + '</p>';
                }

            },
            {
                data: "comment",

            },
            {
                data: "reply",

            },
            {
                data: "_id",
                render: function (data, y, row) {
                    return '<center>' +
                        '<button class="DeleteElement_reply btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '</center>'
                }

            },
        ]

    });

    var toSelect = ['userNameComments', 'PostComments', 'userNameReply', 'PostReply']

    var inicializeSelect2 = function (el) {
        $("#" + el).select2({
            width: 'resolve',
            templateResult: formatState,
            placeholder: "Select...",
            allowClear: true,
            //dropdownParent: $("#myDataModal")
        });
        $("#" + el).select2('val', '')
    }

    var cleanCatalogues = function (el) {
        $('#' + el).val(null).trigger("change");
    }

    $.each(toSelect, function (i, item) {
        inicializeSelect2(item)
    });

    var getCatalogues = function () {

        $.each(toSelect, function (i, item) {
            cleanCatalogues(item)
        });

        $.ajax({
            url: "/api/user",
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    $.each(data.data, function (i, item) {
                        $('#userNameComments').append('<option data-image="' + item.provider_picture + '" value="' + item._id + '" >' + item.username + '</option>');
                        $('#userNameReply').append('<option data-image="' + item.provider_picture + '" value="' + item._id + '" >' + item.username + '</option>');
                    })
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });

        $.ajax({
            url: "/api/post",
        }).done(function (data) {
            HoldOn.close();

            if (data.success == true) {
                if (Number(data.count) > 0) {
                    $.each(data.data, function (i, item) {

                        var nombre = '';
                        if (item.isReply == true) {
                            nombre = item.copy_title
                        } else {
                            nombre = item.post_ES + ' / ' + item.post_EN;
                        }

                        $('#PostComments').append('<option data-image="' + item.thumbnail + '" value="' + item._id + '" >' + nombre + '</option>');
                        $('#PostReply').append('<option data-image="' + item.thumbnail + '" value="' + item._id + '" >' + nombre + '</option>');
                    })
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    }

    getCatalogues();

    $('#userNameComments').on('select2:select', function (e) {
        var data = e.params.data;
        obj = {
            strictsearch: { user: data.id },
            sort: { date_posted: 'desc' }
        }
        llenaTablaComments(obj);
    });

    $('#PostComments').on('select2:select', function (e) {
        var data = e.params.data;
        obj = {
            strictsearch: { post: data.id },
            sort: { date_posted: 'desc' }
        }
        llenaTablaComments(obj);
    });

    $('#PostIDComents').change(function () {
        var data = $(this).val();
        obj = {
            strictsearch: { post: data },
            sort: { date_posted: 'desc' }
        }
        llenaTablaComments(obj);
    });

    var lastConfig = {};
    var lastConfigRep = {};



    $('#userNameReply').on('select2:select', function (e) {
        var data = e.params.data;
        obj = {
            strictsearch: { user: data.id },
            sort: { date_posted: 'desc' }
        }
        llenaTablaReplies(obj);
    });

    $('#PostReply').on('select2:select', function (e) {
        var data = e.params.data;
        obj = {
            strictsearch: { post: data.id },
            sort: { date_posted: 'desc' }
        }
        llenaTablaReplies(obj);
    });

    $('#PostIDReply').change(function () {
        var data = $(this).val();
        obj = {
            strictsearch: { post: data },
            sort: { date_posted: 'desc' }
        }
        llenaTablaReplies(obj);
    });

    $('#commentIDReply').change(function () {
        var data = $(this).val();
        obj = {
            strictsearch: { comment: data },
            sort: { date_posted: 'desc' }
        }
        llenaTablaReplies(obj);
    });

    var llenaTablaReplies = function (params) {
        lastConfigRep = params;
        DTReplicas.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/reply",
            data: params
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    DTReplicas.clear().rows.add(data.data).draw();
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    }

    var llenaTablaComments = function (params) {
        lastConfig = params;
        DTComentarios.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/comment",
            data: params
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {

                    DTComentarios.clear().rows.add(data.data).draw();
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    }
});



