
$(document).ready(function () {

    var UPDATE = '';
    var isReply = '';
    $('#summernote_ES').summernote(SummerOptionsES);
    $('#summernote_EN').summernote(SummerOptionsEN);
    $('#summernote_EXT').summernote(SummerOptionsEN);

    var DT = $('#post').DataTable({
        language: DT_es_mxLang,
        responsive: true,
        data: {},
        columnDefs: [
            { "width": "10%", "targets": [0, 2, 3, 4, 5, 6, 9] },
            { "width": "20%", "targets": [1] },
            { "width": "5%", "targets": [7, 8] }
        ],
        columns: [
            {
                data: "_id"
            },
            {
                data: "_id",
                render: function (data, type, row) {
                    if (row.isReply) {
                        return row.copy_title;
                    } else {
                        return '<span class="badge badge-dark">ES</span> <br>' + row.post_ES + '<hr> <span class="badge badge-dark">EN</span> <br>' + row.post_EN;
                    }
                }
            },
            {
                data: "_id",
                render: function (data, type, row) {
                    if (row.isReply) {
                        return row.copy;
                    } else {
                        return '<span class="badge badge-dark">ES</span> <br>' + TableDescription(row.description_ES) + '<hr> <span class="badge badge-dark">EN</span> <br>' + TableDescription(row.description_EN)
                    }
                }
            },
            {
                data: "thumbnail",
                render: function (data, type, row) {
                    if (Number(row.origin) === 3) {
                        return "N/A"
                    } else {
                        return '<img width="60px" class="img-responsive img-thumbnail" src="' + data + '">'

                    }
                }
            },
            {
                data: "origin",
                render: function (data, type, row) {
                    switch (Number(data)) {
                        case 1:
                            return 'Instagram'
                            break;
                        case 2:
                            return 'Youtube'
                            break;
                        case 3:
                            return 'Facebook'
                            break;
                        case 4:
                            return 'Image Url'
                            break;
                        case 5:
                            return 'Upload'
                            break;
                        default:
                            return "error"
                            break;

                    }
                }

            },
            {
                data: "social_url"
            },
            {
                data: "product",
                render: function (data, type, row) {
                    return '<center> <h5> ' + data.product_ES + '</h5> <br>  <img width="50%" src="' + data.img_url + '"> </center>'
                }
            },
            {
                data: "dte_reg",

            },
            {
                data: "_id",
                render: function (data, type, row) {
                    if (!row.autor) {
                        return 'YAAFLEX'
                    } else {
                        return row.autor.username
                    }
                }
            },
            {
                data: "active",
                render: function (data, type, row) {
                    if (data) {
                        return '<center> <div class="checkbox"> <label> <input checked class="active_post" type="checkbox" value="' + row._id + '"></label> </div><c/enter> '
                    }
                    return '<center> <div class="checkbox"> <label> <input  class="active_post" type="checkbox" value="' + row._id + '"></label> </div></center> '

                }
            },

            {
                data: "_id",
                render: function (data) {
                    return '<center>' +
                        '<button class="DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fa fa-pencil"></i></button>'
                        + '<button class="PreviewElement btn btn-info" value="' + data + '"><i class="fa fa-eye"></i></button>'
                        + '</center>'
                }
            },

        ]
    });


    //5c5a0b6cdab19c26cb951503  $("#nose_product").val('5c5a0b6cdab19c26cb951503').trigger("change");  --for select
    // $('#nose_product').select2('data'); -- For get



    $(document).on('click', '.EditElement', function () {
        $('.nolanG').show()
        $('.lanG').show()

        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/post/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                isReply = data.isReply;
                if (data.isReply) {
                    $('.nolanG').click()
                    $('.lanG').hide()
                    $('#txt_post_EXT').val(data.copy_title)
                    $('#summernote_EXT').summernote('code', data.copy)
                } else {
                    $('#txt_post_ES').val(data.post_ES)
                    $('#txt_post_EN').val(data.post_EN)
                    $('#summernote_ES').summernote('code', data.description_ES)
                    $('#summernote_EN').summernote('code', data.description_EN)
                    $('.nolanG').hide()
                }
                $("#ListOf_products").val(data.product._id).trigger("change");
                $('#myDataModal').modal('show');
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    });

    $(document).on('click', '.PreviewElement', function (e) {
        e.preventDefault();
        var newPost = {
            instagram: false,
            youtube: false,
            url: false,
            facebook: false,
            upload: false
        }
        PREV = $(this).val();
        //window.open('/post/' + PREV, "Preview", "toolbar=no,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,incognito=yes")






        $.ajax({
            url: "/api/post/" + PREV,
        }).done(function (data) {
            var desc = '';
            var title = '';
            var img = '';
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                isReply = data.isReply;

                if (data.isReply) {
                    desc = data.copy;
                    title = data.copy_title;
                } else {
                    desc = data.description_EN;
                    title = data.post_EN;
                }

                switch (Number(data.origin)) {
                    case 1:
                        newPost.instagram = data.social_url
                        break;
                    case 2:
                        newPost.youtube = data.social_url
                        break;
                    case 3:
                        newPost.facebook = data.social_url
                        break;
                    case 4:
                        newPost.url = data.social_url
                        break;
                    case 5:
                        newPost.upload = data.social_url
                        break;
                }
                $('#hidePreview').show()
                desc = makeHastags(desc);
                img = data.thumbnail;


                if (newPost.instagram) {
                    $('#content_Post').html('<img class="img-responsive img-thumbnail" src="' + img + '">')
                    $('#titulo_Post').text(title)
                    $('#copy_Post').html('<p align="justify">' + desc + '</p>')

                    $.ajax({
                        url: "/social/instagramPost",
                        data: { iurl: newPost.instagram },
                        method: 'POST'
                    }).done(function (data) {
                        HoldOn.close();
                        var coments = data.data[1].replace('Comments', '').trim()
                        var likes = data.data[0].replace('Likes', '').trim()
                        $('#insta_data').html('<a href="https://www.instagram.com/YAAFLEX/" target="_blank"> <i class="fa fa-instagram">&nbsp;</i><small> ' + coments + ' <i class="fa fa-comment"></i></small><small> ' + likes + ' <i class="fa fa-heart"></i></small></a>')


                    }).fail(function (err) {
                        HoldOn.close();
                        //alertify.error('Ocurrio un error  // An error have been ocurred');
                        console.error(err);
                    });

                }
                else if (newPost.youtube) {

                    $.ajax({
                        url: "/social/youtubeVideoData",
                        data: { yurl: newPost.youtube },
                        method: 'POST'
                    }).done(function (data) {
                        HoldOn.close();
                        $('#insta_data').html('<a href="' + newPost.youtube + '" target="_blank"> <i class="fa fa-youtube">&nbsp;</i><small> ' + data.data.countViewers + ' <i class="fa fa-eye"></i></small></a>')
                    }).fail(function (err) {
                        HoldOn.close();
                       // alertify.error('Ocurrio un error  // An error have been ocurred');
                        console.error(err);
                    });

                    $('#content_Post').html('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + getKeyvideoYoutube(newPost.youtube) + '?rel=0" allowfullscreen></iframe></div>')
                    $('#titulo_Post').text(title)
                    $('#copy_Post').html('<p align="justify">' + desc + '</p>')
                }
                else if (newPost.facebook) {
                    $('#content_Post').html('<center><div  style="background-color: white;" id="post"><div class="fb-post" data-show-text="false" data-href="' + newPost.facebook + '" mobile="false"></div></center>')
                    $('#titulo_Post').text(title)
                    $('#copy_Post').html('<p align="justify">' + desc + '</p>')
                    $('#insta_data').hide();
                    try { fbAsyncInit(); } catch (err) {
                        CallFB();
                    }
                }
                else if (newPost.url) {

                    $('#titulo_Post').text(title)
                    $('#copy_Post').html('<p align="justify">' + desc + '</p>')
                    $('#insta_data').hide();
                    $('#content_Post').html('<img class="img-responsive img-thumbnail" src="' + img + '">')


                }
                else if (newPost.upload) {

                    $('#titulo_Post').text(title)
                    $('#copy_Post').html('<p align="justify">' + desc + '</p>')
                    $('#insta_data').hide();
                    $('#content_Post').html('<img class="img-responsive img-thumbnail" src="' + img + '">')


                } else {
                    alertify.alert('Error', 'You must to import  post or upload a file', function () { });
                }


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
                url: "/api/post/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traePost();
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


    var traePost = function () {
        DT.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/post",
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

    //catalogo de productos
    $.ajax({
        url: "/api/product",
    }).done(function (data) {
        HoldOn.close();
        if (data.success == true) {
            if (Number(data.count) > 0) {
                $.each(data.data, function (i, item) {
                    $('#ListOf_products').append('<option data-image="' + item.img_url + '" value="' + item._id + '" > ' + item.brand.brand_ES + '/' + item.brand.brand_EN + ' : ' + item.product_ES + ' / ' + item.product_EN + '</option>');
                })
                $("#ListOf_products").val(null).trigger("change");
            }
        }
    }).fail(function (err) {
        HoldOn.close();
        alertify.error('Ocurrio un error  // An error have been ocurred');
        console.error(err);
    });



    $('#SaveChanges').click(function () {

        var data = {}
        if (isReply) {
            data.copy_title = $('#txt_post_EXT').val()
            data.copy = $('#summernote_EXT').summernote('code')
        } else {
            data.post_ES = $('#txt_post_ES').val()
            data.post_EN = $('#txt_post_EN').val()
            data.description_ES = $('#summernote_ES').summernote('code')
            data.description_EN = $('#summernote_EN').summernote('code')
        }
        data.product = $('#ListOf_products').select2('data')[0].id;


        if (data.product && ((isReply && data.copy !== '' && data.copy_title !== '') || (!isReply && data.post_EN !== '' && data.post_ES !== ''))) {

            var url = "/api/post";
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
                traePost();
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

    traePost();


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



    var inicializeSelect2 = function (el) {
        $("#" + el).select2({
            width: '100%',
            templateResult: formatState,
            placeholder: "Select...",
            allowClear: true,
            dropdownParent: $("#myDataModal")
        });
        $("#" + el).select2('val', '')
        $(".select2-container").css('width', '100%')
    }
    inicializeSelect2('ListOf_products');

    $(document.body).on('change', '.active_post', function () {
        isActive = $(this).prop('checked');
        vaule = $(this).val();
        $.ajax({
            url: '/api/post/' + vaule,
            method: 'PUT',
            data: { active: isActive }
        }).done(function (data) {
            HoldOn.close();

            traePost();
            alertify.success('Guardado con exito! // Saved correctly');
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error con  // An error have been ocurred ');
            console.error(err);
        });

    });


});
