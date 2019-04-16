const PbyCharge = 12;
var Page = 0;
var nomore = false;


$(document).ready(function () {

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
                "sort": { "dte_reg": "desc" },
                "paginate": { "page": Page, "limit": PbyCharge },
            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    if (!isAppend) {
                        $('#SJ_PhotoRow_').html('');
                    }
                    

                    $.each(data.data, function (i, item) {
                        var titulo = item.post_EN
                        var brand = item.product.brand.brand_EN
                        var product = item.product.product_EN
                        var nose = item.product.nose.nose_EN
                        if (GlobalLang == 'ES') {
                            titulo = item.post_ES
                            product = item.product.product_ES
                            brand = item.product.brand.brand_ES
                            nose = item.product.nose.nose_ES
                        }
                        var line = ''
                        if (item.isReply) {
                            line = '       <a href="/profile/' + item.autor._id + '">@' + item.autor.username + '</a><br>' +
                                '       <img width="50px" class="img  img-fluid" src="' + item.autor.provider_picture + '">';
                            titulo = item.copy_title;
                        }
                        var img = item.thumbnail
                        if (item.origin == 3) {
                            img = item.product.img_url
                        }


                        var Cntnt = ' <div class="col-sm-12 col-md-4 col-lg-3 lnx_content_eqlzr">' +
                            ' <a href="/post/' + item._id + '">' +
                            ' <img id="EqualizeThis_' + item._id + '" src="' + img + '" class="lnx_eqlzr-square image " />' +
                            '<div class="middle">' +
                            '       <center>' +
                            '       <h4 class="noMargin">' + titulo.substring(0, 25) + '</h4>' +
                            '       <hr class="noMargin">' +
                            line +
                            '        </center>' +
                            '  </div>' +
                            ' </a>' +
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