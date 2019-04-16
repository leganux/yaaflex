const PbyCharge = 12;
var Page = 0;
var nomore = false;
var PostOrigin = -1;

$(document).ready(function () {




    $('#NEW_POST_USER').click(function () {
        $('#ModalAddNew_').modal('show');
    });

    $('#nextStep_').click(function () {

        switch (PostOrigin) {
            case 1:
                var value = $('#URL_instagram').val();
                if (!value.includes('instagram.com/p/') || !value.includes('https')) {
                    alertInModal(SJ_LANG.error_invalid_url);
                    return 0;
                }
                $.ajax({
                    url: "https://api.instagram.com/oembed",
                    data: { url: value }
                }).done(function (data) {
                    $('#i_post_title').val(CutAtFirstDouble(data.title).title.replace(/[^\x00-\x7F]/g, "").trim());
                    $('#i_post_description').val(CutAtFirstDouble(data.title).content.replace(/[^\x00-\x7F]/g, "").trim());
                    $('#URL_url').val(data.thumbnail_url);
                    NEXTSTEP();
                }).fail(function (err) {
                    alertInModal(SJ_LANG.error_default);
                    console.error(err);
                });
                break;
            case 2:
                var value = $('#URL_youtube').val();
                if (!value.includes('youtu') || !value.includes('https')) {
                    alertInModal(SJ_LANG.error_invalid_url);
                    return 0;
                }
                $.ajax({
                    url: "/social/youtubeVideoData",
                    data: { yurl: value },
                    method: 'POST'
                }).done(function (data) {
                    if (data.success) {
                        $('#i_post_title').val(data.data.title.replace(/[^\x00-\x7F]/g, "").trim());
                        $('#URL_url').val(data.data.img);
                        NEXTSTEP();
                    }
                }).fail(function (err) {
                    alertInModal(SJ_LANG.error_default);
                    console.error(err);
                });
                break;
            case 3:
                var value = $('#URL_facebook').val();
                if (!value.includes('https') || !value.includes('facebook')) {
                    alertInModal(SJ_LANG.error_invalid_url);
                    return 0;
                }
                NEXTSTEP();
                break;
            case 4:
                var value = $('#URL_url').val();
                if (!value.includes('https')) {
                    alertInModal(SJ_LANG.error_invalid_url);
                    return 0;
                }
                NEXTSTEP();
                break;
            case 5:
                var value = $('#URL_url').val();
                if (value == '' || !value.includes('cdn')) {
                    alertInModal(SJ_LANG.error_default);
                    return 0;
                }
                NEXTSTEP();
                break;
            default:
                alertInModal(SJ_LANG.error_default)
                break;

        }

    });

    var NEXTSTEP = function () {
        $('.disabled4_').prop('disabled', true);
        $('#nextStep_').prop('disabled', true);
        $('#MBTNSaveNEW_').prop('disabled', false);
        $('#ContinueEditing_').show();
    }

    $('#MBTNSaveNEW_').click(function () {
        var title = $('#i_post_title').val();
        var description = $('#i_post_description').val();

        title = remove_Html_tags(title).replace(/[^\x00-\x7F]/g, "").toUpperCase().trim();
        description = remove_Html_tags(description).replace(/[^\x00-\x7F]/g, "").trim();

        if (title == '' || description == '') {
            alertInModal(SJ_LANG.error_fill_desc_title)
            return 0;
        }
        var social = '';
        var img = '';
        switch (PostOrigin) {
            case 1:
                social = $('#URL_instagram').val();
                img = $('#URL_url').val();
                break;
            case 2:
                social = $('#URL_youtube').val();
                img = $('#URL_url').val();
                break;
            case 3:
                social = $('#URL_facebook').val();
                img = $('#URL_facebook').val();

                break;
            case 4:
                img = $('#URL_url').val();
                social = $('#URL_url').val();
                break;
            case 5:
                img = $('#URL_url').val();
                social = $('#URL_url').val();
                break;
            default:
                alertInModal(SJ_LANG.error_default)
                break;
        }


        $.ajax({
            url: "/api/post",
            data: {
                post_ES: 'N/A',
                description_ES: 'N/A',
                post_EN: 'N/A',
                description_EN: 'N/A',
                copy: description,
                copy_title: title,
                img_url: img,
                social_url: social,
                thumbnail: img,
                isReply: true,
                origin: PostOrigin,
                product: SJ_PRODUCT_ID,
                active: true,
                autor: SJ_SESSION._id
            },
            method: 'POST'
        }).done(function (data) {
            location.reload();
        }).fail(function (err) {
            alertInModal(SJ_LANG.error_default)
            console.error(err);
        });
    });

    $('#URL_upload').change(function () {
        if (ValidateFile2($(this))) {
            var data = new FormData();
            data.append('UserPostImg_', $('#URL_upload')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {

                    if (data.success) {
                        $('#URL_url').val(data.file);
                    }
                },
                error: function (err) {
                    console.error(err);
                }
            });
        }
    })

    $('#bntFromInsta').click(function () {
        $('.hideALLS_').hide();
        $('#Space_i_instagram').show();
        $('#Space_i_done').show();
        PostOrigin = 1;
    });

    $('#bntFromYoutube').click(function () {
        $('.hideALLS_').hide();
        $('#Space_i_youtube').show();
        $('#Space_i_done').show();
        PostOrigin = 2;
    });

    $('#bntFromFacebook').click(function () {
        $('.hideALLS_').hide();
        $('#Space_i_facebook').show();
        $('#Space_i_done').show();
        PostOrigin = 3;
    });

    $('#bntFromImageURL').click(function () {
        $('.hideALLS_').hide();
        $('#Space_i_url').show();
        $('#Space_i_done').show();
        PostOrigin = 4;
    });

    $('#bntFromUpload').click(function () {
        $('.hideALLS_').hide();
        $('#Space_i_upload').show();
        $('#Space_i_done').show();
        PostOrigin = 5;
    });

    $('#MBTNCancelNEW_').click(function () {
        location.reload();
    });

    $(window).scroll(function () {
        const offset = 200;
        if ($(window).scrollTop() + $(window).height() > $(document).height() - offset) {
            Page++;
            traePost(true);
        }
    });
    var traePost = function (isAppend) {
        if (nomore) {
            return 0;
        }

        $.ajax({
            url: "/api/post",
            dataType: 'json',
            data: {
                strictsearch: { product: SJ_PRODUCT_ID },
                "sort": {
                    likes_count: "desc",
                    dte_reg: "desc",
                },
                "search": { isReply: true, active: true },
                "paginate": { page: Page, "limit": PbyCharge },


            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    if (!isAppend) {
                        $('#SJ_PhotoRow_').html('');
                    }
                    $.each(data.data, function (i, item) {
                        var img = item.thumbnail
                        if (item.origin === 3) {
                            img = item.product.img_url
                        }
                        var Cntnt = ' <div class="col-sm-12 col-md-4 col-lg-3 lnx_content_eqlzr">' +
                            ' <a href="/post/' + item._id + '">' +
                            ' <img id="EqualizeThis_' + item._id + '" src="' + img + '" class="lnx_eqlzr-square image " />' +
                            '<div class="middle">' +
                            '   <div class="">' +
                            '       <center>' +
                            '       <h4 class="noMargin">' + item.copy_title.substring(0, 10) + '</h4>' +
                            '       <hr class="noMargin">' +
                            '       <a href="/profile/' + item.autor._id + '">@' + item.autor.username + '</a><br>' +
                            '       <img width="50px" class="img  img-fluid" src="' + item.autor.provider_picture + '">' +
                            '        </center>' +
                            '   </div></div>' +
                            '   </a>' +
                            '</div>';

                        $('#SJ_PhotoRow_').append(Cntnt);
                        llamaEqualizer('#EqualizeThis_' + item._id);
                    });

                } else {
                    nomore = true;
                }

            }

        }).fail(function (err) {
            console.error(err);
        });
    }
    traePost();
});