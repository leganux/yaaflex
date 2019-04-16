

var newPost = {
    instagram: false,
    youtube: false,
    url: false,
    facebook: false,
    upload: false
}

$(document).ready(function () {

    $('#summernote_ES').summernote(SummerOptionsES);
    $('#summernote_EN').summernote(SummerOptionsEN);




    var inicializeSelect2 = function (el) {
        $("#" + el).select2({
            width: 'resolve',
            templateResult: formatState,
            placeholder: "Select...",
            allowClear: true
        });
        $("#" + el).val(null).trigger("change");
    }

    function formatState(opt) {
        if (!opt.id) {
            return opt.text.toUpperCase();
        }

        var optimage = $(opt.element).attr('data-image');

        if (!optimage) {
            return opt.text;
        } else {
            var $opt = $(
                '<span ><img src="' + optimage + '" width="30px" /> ' + opt.text + '</span>'
            );
            return $opt;
        }
    };

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



    $('#ImportInstagram').click(function () {
        alertify.prompt('Ingresa la url ', 'Ingresa la url de la publicacion de instagram', ''
            , function (evt, value) {
                if (!value.includes('instagram.com/p/') || !value.includes('https')) {
                    alertify.alert('Error', 'The URL provided  is not valid, try again', function () { });
                    return 0;
                }
                newPost.instagram = value;
                $('.f4disbled').prop('disabled', true);
                HoldOn.open(HoldOptions)
                $.ajax({
                    url: "https://api.instagram.com/oembed",
                    data: { url: value }
                }).done(function (data) {
                    HoldOn.close();
                    $('#txt_post_ES').val(CutAtFirstDouble(data.title).title);
                    $('#txt_post_EN').val(CutAtFirstDouble(data.title).title);
                    $('#summernote_ES').summernote('code', CutAtFirstDouble(data.title).content);
                    $('#summernote_EN').summernote('code', CutAtFirstDouble(data.title).content);
                    $('#file_ulpoad_saved').val(data.thumbnail_url);

                }).fail(function (err) {
                    HoldOn.close();
                    alertify.error('Ocurrio un error  // An error have been ocurred');
                    console.error(err);
                });
            }, function () {

            });
        $('.ajs-input').addClass('form-control').attr('placeholder', 'https://www.instagram.com/p/[ID_INSTAGRAM_POST]/');
    })
    $('#ImportYoutube').click(function () {
        alertify.prompt('Ingresa la url ', 'Ingresa la url de la publicacion de youtube', ''
            , function (evt, value) {
                if (!value.includes('youtu') || !value.includes('https')) {
                    alertify.alert('Error', 'The URL provided  is not valid, try again', function () { });
                    return 0;
                }
                newPost.youtube = value;
                alertify.alert('Video Imported correctly', 'Continue editing your tittle and copy', function () { });
                $('.f4disbled').prop('disabled', true);
                HoldOn.open(HoldOptions)
                $.ajax({
                    url: "/social/youtubeVideoData",
                    data: { yurl: value },
                    method: 'POST'
                }).done(function (data) {
                    HoldOn.close();
                    if (data.success) {
                        $('#txt_post_ES').val(data.data.title);
                        $('#txt_post_EN').val(data.data.title);
                        $('#file_ulpoad_saved').val(data.data.img);
                    }
                }).fail(function (err) {
                    HoldOn.close();
                    alertify.error('Ocurrio un error  // An error have been ocurred');
                    console.error(err);
                });



            }, function () {

            });
        $('.ajs-input').addClass('form-control').attr('placeholder', 'https://www.youtube.com/watch?v=[ID_Youtube_Video]');
    })
    $('#ImportFacebook').click(function () {
        alertify.prompt('Ingresa la url ', 'Ingresa la url de la publicacion de la imagen o video de  Facebook', ''
            , function (evt, value) {

                if (!value.includes('photo') || !value.includes('https') || !value.includes('facebook')) {
                    alertify.alert('Error', 'The URL provided  is not valid, try again. you must import a photo post', function () { });
                    return 0;
                }
                newPost.facebook = value;
                alertify.alert('Post Imported correctly', 'Continue editing your tittle and copy', function () { });
                $('.f4disbled').prop('disabled', true);
                $('#file_ulpoad_saved').val(value);
            }, function () {


            });
        $('.ajs-input').addClass('form-control').attr('placeholder', 'https://www.facebook.com/photo.php?fbid=[IDFB]&set=[ID]');
    })
    $('#ImportManual').click(function () {
        alertify.prompt('Ingresa la url ', 'Ingresa la url de tu imagen', ''
            , function (evt, value) {

                if (!value.includes('https')) {
                    alertify.alert('Error', 'The URL provided  is not valid, try again', function () { });
                    return 0;
                }
                newPost.url = value;
                $('#file_ulpoad_saved').val(value);
                alertify.alert('Post Imported correctly', 'Continue editing your tittle and copy', function () { });
                $('.f4disbled').prop('disabled', true);
            }
            , function () {
            });
        $('.ajs-input').addClass('form-control').attr('placeholder', 'https://www.mywebsite.com/amazing_photo.jpg');
    })
    $('#file_ulpoad').change(function () {
        if (ValidateFile($(this))) {
            HoldOn.open(HoldOptions);
            var data = new FormData();
            data.append('POST', $('#file_ulpoad')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {
                    HoldOn.close();
                    if (data.success) {
                        $('#file_ulpoad_saved').val(data.file);
                        newPost.upload = data.file;
                        $('.f4disbled').prop('disabled', true);
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



    $('#preview_elemento_EN').click(function () {
        $('#hidePreview').show()
        var desc = $('#summernote_EN').summernote('code');
        desc = makeHastags(desc);
        var img = $('#file_ulpoad_saved').val();
        var title = $('#txt_post_EN').val();
        if (newPost.instagram) {
            $('#content_Post').html('<center><img class="img-responsive img-thumbnail" src="' + img + '"></center>')
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
                $('#insta_data').html('<a href="https://www.instagram.com/myscentjourney/" target="_blank"> <i class="fa fa-instagram">&nbsp;</i><small> ' + coments + ' <i class="fa fa-comment"></i></small><small> ' + likes + ' <i class="fa fa-heart"></i></small></a>')

            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error  // An error have been ocurred');
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
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });

            $('#content_Post').html('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + getKeyvideoYoutube(newPost.youtube) + '?rel=0" allowfullscreen></iframe></div>')
            $('#titulo_Post').text(title)
            $('#copy_Post').html('<p align="justify">' + desc + '</p>')
        }
        else if (newPost.facebook) {

            $('#content_Post').html('<center><div style="background-color: white;" id="post"><div data-show-text="false" class="fb-post" data-href="' + newPost.facebook + '" mobile="false"></div></center>')
            $('#titulo_Post').text(title)
            $('#copy_Post').html('<p align="justify">' + desc + '</p>')
            $('#insta_data').hide();
            try {
                fbAsyncInit();
                $('#post').autoResizeFbPost();
            } catch (err) {
                CallFB();
                $('#post').autoResizeFbPost();
            }

        }
        else if (newPost.upload) {

            $('#titulo_Post').text(title)
            $('#copy_Post').html('<p align="justify">' + desc + '</p>')
            $('#insta_data').hide();
            $('#content_Post').html('<img class="img-responsive img-thumbnail" src="' + img + '">')


        }
        else if (newPost.url) {

            $('#titulo_Post').text(title)
            $('#copy_Post').html('<p align="justify">' + desc + '</p>')
            $('#insta_data').hide();
            $('#content_Post').html('<img class="img-responsive img-thumbnail" src="' + img + '">')


        }
        else {
            alertify.alert('Error', 'You must to import  post or upload a file', function () { });
        }

    })
    $('#preview_elemento_ES').click(function () {
        $('#hidePreview').show()
        var desc = $('#summernote_ES').summernote('code');
        desc = makeHastags(desc);
        var img = $('#file_ulpoad_saved').val();
        var title = $('#txt_post_ES').val();
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
                $('#insta_data').html('<a href="https://www.instagram.com/myscentjourney/" target="_blank"> <i class="fa fa-instagram">&nbsp;</i><small> ' + coments + ' <i class="fa fa-comment"></i></small><small> ' + likes + ' <i class="fa fa-heart"></i></small></a>')


            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error  // An error have been ocurred');
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
                alertify.error('Ocurrio un error  // An error have been ocurred');
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

    })

    inicializeSelect2('ListOf_products');


    $('#GuardarTodo').click(function () {

        $('#GuardarTodo').prop('disabled', true);

        var desc_ES = $('#summernote_ES').summernote('code');
        var desc_EN = $('#summernote_EN').summernote('code');
        var img = $('#file_ulpoad_saved').val();
        var title_ES = $('#txt_post_ES').val();
        var title_EN = $('#txt_post_ES').val();
        var Producto = $('#ListOf_products').select2('data');

        if (Producto.length < 1) {
            alertify.error('Seleccione el producto al que pertenece');
            $('#GuardarTodo').prop('disabled', false);
            return 0;
        }


        if (img == "") {
            alertify.error('No hay archivo de imagen o Post importado');
            return 0;
        }

        if ($('#summernote_ES').summernote('isEmpty')) {
            alertify.error('El copy en español esta vacio');
            $('#GuardarTodo').prop('disabled', false);
            return 0;
        }
        if ($('#summernote_EN').summernote('isEmpty')) {
            alertify.error('The english copy is empty');
            $('#GuardarTodo').prop('disabled', false);
            return 0;
        }
        if (title_EN == '' || title_ES == '') {
            alertify.error('Algun titulo esta vacio');
            $('#GuardarTodo').prop('disabled', false);
            return 0;
        }

        if (newPost.instagram) {
            $.ajax({
                url: "/api/post",
                data: {
                    post_ES: title_ES,
                    description_ES: desc_ES,
                    post_EN: title_EN,
                    description_EN: desc_EN,
                    copy: 'N/A',
                    copy_title: 'N/A',
                    img_url: img,
                    social_url: newPost.instagram,
                    thumbnail: img,
                    isReply: false,
                    origin: 1,
                    product: Producto[0].id,
                    active: true
                },
                method: 'POST'
            }).done(function (data) {
                HoldOn.close();
                alertify.success('guardado con exito!');
                location.reload();
            }).fail(function (err) {
                HoldOn.close();
                $('#GuardarTodo').prop('disabled', false);
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });
        }
        else if (newPost.youtube) {

            $.ajax({
                url: "/api/post",
                data: {
                    post_ES: title_ES,
                    description_ES: desc_ES,
                    post_EN: title_EN,
                    description_EN: desc_EN,
                    copy: 'N/A',
                    copy_title: 'N/A',
                    img_url: img,
                    social_url: newPost.youtube,
                    thumbnail: img,
                    isReply: false,
                    origin: 2,
                    product: Producto[0].id,
                    active: true
                },
                method: 'POST'
            }).done(function (data) {
                HoldOn.close();
                alertify.success('guardado con exito!');
                location.reload();
            }).fail(function (err) {
                HoldOn.close();
                $('#GuardarTodo').prop('disabled', false);
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });

        }
        else if (newPost.facebook) {

            $.ajax({
                url: "/api/post",
                data: {
                    post_ES: title_ES,
                    description_ES: desc_ES,
                    post_EN: title_EN,
                    description_EN: desc_EN,
                    copy: 'N/A',
                    copy_title: 'N/A',
                    img_url: img,
                    social_url: newPost.facebook,
                    thumbnail: img,
                    isReply: false,
                    origin: 3,
                    product: Producto[0].id,
                    active: true
                },
                method: 'POST'
            }).done(function (data) {
                HoldOn.close();
                alertify.success('guardado con exito!');
                location.reload();
            }).fail(function (err) {
                HoldOn.close();
                $('#GuardarTodo').prop('disabled', false);
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });

        }
        else if (newPost.url) {
            $.ajax({
                url: "/api/post",
                data: {
                    post_ES: title_ES,
                    description_ES: desc_ES,
                    post_EN: title_EN,
                    description_EN: desc_EN,
                    copy: 'N/A',
                    copy_title: 'N/A',
                    img_url: img,
                    social_url: newPost.url,
                    thumbnail: img,
                    isReply: false,
                    origin: 4,
                    product: Producto[0].id,
                    active: true
                },
                method: 'POST'
            }).done(function (data) {
                HoldOn.close();
                alertify.success('guardado con exito!');
                location.reload();
            }).fail(function (err) {
                HoldOn.close();
                $('#GuardarTodo').prop('disabled', false);
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });

        }
        else if (newPost.upload) {
            $.ajax({
                url: "/api/post",
                data: {
                    post_ES: title_ES,
                    description_ES: desc_ES,
                    post_EN: title_EN,
                    description_EN: desc_EN,
                    copy: 'N/A',
                    copy_title: 'N/A',
                    img_url: img,
                    social_url: newPost.upload,
                    thumbnail: img,
                    isReply: false,
                    origin: 5,
                    product: Producto[0].id,
                    active: true
                },
                method: 'POST'
            }).done(function (data) {
                HoldOn.close();
                alertify.success('guardado con exito!');
                location.reload();
            }).fail(function (err) {
                HoldOn.close();
                $('#GuardarTodo').prop('disabled', false);
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });
        } else {
            alertify.error('Ocurrio un error  // An error have been ocurred');
            location.reload();
        }


    })
});

