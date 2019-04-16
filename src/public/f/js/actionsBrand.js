$(document).ready(function () {

    $.ajax({
        url: "/api/product",
        data: {
            "strictsearch": {
                "brand": SJ_B_ID
            }
        },
    }).done(function (data) {
        if (data.success) {
            $('#Nose_rel_pefumes').html('')
            $('#Nose_rel_posts').html('')
            $.each(data.data, function (i, item) {

                var title = ''
                var description = ''
                var img = item.img_url
                var id = item._id
                var imgprod = item.img_url


                var brand = ''
                var brand_id = item.brand._id;

                if (GlobalLang == 'ES') {
                    title = item.product_ES
                    description = item.description_ES
                    brand = item.brand.brand_ES
                } else {
                    title = item.product_ES
                    description = item.description_ES
                    brand = item.brand.brand_EN
                }
                description = TableDescription(description).substring(0, 120) + '...'
                $('#Nose_rel_pefumes').append('<div class="row"><div class="col-sm-2"><img class="img img-fluid img-thumbnail lazy" data-src="' + img + '"></div><div class="col-sm-10">' +
                    '<h4 class="title_s"><a href="/brand/' + brand_id + '">' + brand + '</a>  >>' +
                    '<a href="/product/' + id + '">' + title + '</a></h4>' +
                    '<p align="justify">' + description + '<br><a href="/product/' + id + '">More...</a></p></div></div><hr >')

                llenaPost(id, imgprod, brand, brand_id, title);

            })

        }
    }).fail(function (errn) {
        console.error(errn);
    });



    var llenaPost = function (id, pImage, brand, brand_id, product) {

        prod_id = id;
        $.ajax({
            url: "/api/post",
            data: {
                "strictsearch": {
                    "product": id
                }
            },
        }).done(function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {

                    var title = ''
                    var description = ''
                    var imgprod = pImage;
                    var id = item._id


                    if (item.isReply) {
                        title = item.copy_title
                        description = item.copy
                    } else {
                        if (GlobalLang == 'ES') {
                            title = item.post_ES
                            description = item.description_ES
                        } else {
                            title = item.post_ES
                            description = item.description_ES
                        }
                    }
                    if (item.origin != 3) {
                        imgprod = item.img_url;
                    }


                    description = TableDescription(description).substring(0, 120) + '...'
                    // $('#Nose_rel_posts').append('<div class="row"><div class="col-sm-2"><img class="img img-fluid img-thumbnail lazy" data-src="' + imgprod + '"></div><div class="col-sm-10"><a href="/post/' + id + '"><h4>' + title + '</h4></a><p align="justify">' + description + '<br><a href="/post/' + id + '">More...</a></p></div></div><hr >')

                    $('#Nose_rel_posts').append('<div class="row"><div class="col-sm-2"><img class="img img-fluid img-thumbnail lazy" data-src="' + imgprod + '"></div><div class="col-sm-10">' +
                        '<h4 class="title_s"><a href="/brand/' + brand_id + '">' + brand + '</a>  >>' +
                        '<a href="/product/' + prod_id + '">' + product + '</a> >>' +
                        '<a href="/post/' + id + '">' + title + '</a></h4>' +
                        '<p align="justify">' + description + '<br><a href="/post/' + id + '">More...</a></p></div></div><hr >')


                    $('.lazy').lazy({
                        placeholder: 'https://loading.io/spinners/typing/lg.-text-entering-comment-loader.gif'
                    });


                })

            }
        }).fail(function (errn) {
            console.error(errn);
        });

    }






    var num = Math.floor(Math.random() * 4) + 1;
    var Oss = {};
    switch (num) {
        case 1:
            Oss = {
                "description_EN": "desc"
            };
            break;
        case 2:
            Oss = {
                "description_ES": "asc"
            };
            break;
        case 3:
            Oss = {
                "brand_ES": "asc"
            };
            break;
        case 4:
            Oss = {
                "brand_EN": "desc"
            };
            break;

    }


    $.ajax({
        url: "/api/brand",
        data: {
            sort: Oss,
            "paginate": {
                "page": 0,
                "limit": 8
            }, avoid: {
                _id: SJ_B_ID
            }
        },
    }).done(function (data) {
        if (data.success) {
            $('#other_more_same').html('');
            $.each(data.data, function (i, item) {
                $('#other_more_same').append('<div class="col"><a href="/brand/' + item._id + '"><img  id="EqualizeImage_' + item._id + '"  src="' + item.img_url + '" class="lnx_eqlzr-square image"></a> </div>');
                llamaEqualizer('#EqualizeImage_' + item._id);
            });
        }
    }).fail(function (err) {
        console.error(err)
    })

})
