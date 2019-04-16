var nomore = false;
var Page = 0; var PbyCharge = 5;
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
            url: "/api/articulo",
            dataType: 'json',
            data: {
                "sort": { "dte_reg": "desc" },
                "paginate": { "page": Page, "limit": PbyCharge },

            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    if (!isAppend) {
                        $('#SpaceToADD_').html('');
                    }




                    $.each(data.data, function (i, item) {
                        var titulo = item.article_EN
                        var cntenido = item.content_EN
                        var more = 'More...'

                        if (GlobalLang == 'ES') {
                            titulo = item.article_ES
                            cntenido = item.content_ES
                            more = 'Mas...';
                        }


                        var Cntnt = '<div class="card border-light mb-3">' +
                            '<div class="card-header">' +
                            '<p class="noMargin" align="right">' + moment(item.dte_reg).format('DD/MM/YYYY') + '</p>' +
                            '<a href="/article/' + item._id + '"><h2 class="noMargin">' + titulo + '</h2></a>' +
                            '</div>' +
                            '<div class="card-body" >' +
                            '<div class="row">' +
                            '   <div class="col-sm-6 col-md-4 col-lg-2 ">' +
                            '       <div class="lnx_content_eqlzr">' +
                            '           <a href="/article/' + item._id + '">' +
                            '               <img class="lnx_eqlzr-square image " id="EqualizeThis_' + item._id + '" src="' + item.thumbnail + '">' +
                            '           </a>' +
                            '       </div>' +
                            '   </div>' +
                            '   <div class="col-sm-6 col-md-8 col-lg-10">' +
                            '  <br>     <p align="justify">' + TableDescription(cntenido) + '<p>' +
                            '<hr><p align="right">' +
                            '<a href="/article/' + item._id + '">' + more + '</a>' +
                            '</p>' +
                            '   </div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        $('#SpaceToADD_').append(Cntnt);
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