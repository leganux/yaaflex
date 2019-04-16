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
                "search": { "isReply": false, active: true },
                "paginate": { "page": Page, "limit": PbyCharge },
                avoid: { origin: 3 }

            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    if (!isAppend) {
                        $('#SJ_PhotoRow_').html('');
                    }
                    // OBJ.col1 = OBJ.col1 + '<a href="/post/' + item._id + '"><img data-src="' + item.thumbnail + '" class="img-thumbnail  img-center lazy"></a>'




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


                        var Cntnt = ' <div class="col-sm-12 col-md-4 col-lg-3 lnx_content_eqlzr">' +
                            ' <a href="/post/' + item._id + '">' +
                            ' <img id="EqualizeThis_' + item._id + '" src="' + item.thumbnail + '" class="lnx_eqlzr-square image " />' +
                            '<div class="middle">' +
                            '<center class="noMargin">' +
                            '<h5 class="noMargin">' + titulo + '</h5>' +
                            '<br>' +
                            '<a href="/brand/' + item.product.brand._id + '">' + brand + '</a>' +
                            ' <br> ' +
                            '<a href="/product/' + item.product._id + '">' + product + '</a>' +
                            ' <br>  ' +
                            '<a href="/nose/' + item.product.nose._id + '">' + nose + '</a>' +
                            '</center>' +
                            '</div>' +
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