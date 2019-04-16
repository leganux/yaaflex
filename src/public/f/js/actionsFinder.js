var genders2 = ['F', 'M', 'U']


var MrFinder2 = function (val) {

    $('#SearchF_posts2').html('');
    $('#SearchF_ing2').html('');
    $('#SearchF_brands2').html('');
    $('#SearchF_prod2').html('');
    $('#SearchF_noses2').html('');
    $('#SearchF_articles2').html('');

    $('#_SP_INGREDIENTS').hide();
    $('#_SP_BRANDS').hide();
    $('#_SP_PRODUCTS').hide();
    $('#_SP_NOSES').hide();
    $('#_SP_USERS').hide();
    $('#_SP_POSTS').hide();
    $('#_SP_ARTICLES').hide();

    $('#SearchF_users2').html('');
    //all 
    $.ajax({
        url: "/finder/complete",
        dataType: 'json',
        data: {
            find: val,
            genders: genders2
        }
    }).done(function (data) {
        if (data.success == true) {


            if (data.data.Products.length > 0) {
                $('#_SP_PRODUCTS').show();
            }
            if (data.data.Brands.length > 0) {
                $('#_SP_BRANDS').show();
            }
            if (data.data.noses.length > 0) {
                $('#_SP_NOSES').show();
            }
            if (data.data.ingredients.length > 0) {
                $('#_SP_INGREDIENTS').show();
            }
            if (data.data.Users.length > 0) {
                $('#_SP_USERS').show();
            }
            if (data.data.Posts.length > 0) {
                $('#_SP_POSTS').show();
            }
            if (data.data.Articles.length > 0) {
                $('#_SP_ARTICLES').show();
            }

            $.each(data.data.Posts, function (i, item) {
                var title = '';
                var img = '/cdn/assets/f/images/myScentJourney.png';
                if (item.isReply) {
                    title = item.copy_title;
                } else {
                    if (GlobalLang == 'EN') {
                        title = item.post_EN
                    } else {
                        title = item.post_ES
                    }
                }

                if (item.origin !== 3) {
                    img = item.thumbnail;
                } else {
                    img = item.product.img_url
                }

                $('#SearchF_posts2').append('<a href="/post/' + item._id + '"><div class="row "><div class="col-sm-4 col-md-2"><img  id="EqualizeImage_' + item._id + '" class=" lnx_eqlzr-square image  " src="' + img + '"></div><div class="col-sm-8 col-md-10">  <p align="justify"><h4> ' + title + '</h4></p>  </div></div></a><hr>');
                llamaEqualizer('#EqualizeImage_' + item._id);

            });

            $.each(data.data.Users, function (i, item) {
                var title = item.username;

                $('#SearchF_users2').append('<a href="/user/' + title + '"><div class="row "><div class="col-sm-4 col-md-2 lnx_content_eqlzr "><img  id="EqualizeImage_' + item._id + '"   class="  lnx_eqlzr-square image  " src="' + item.provider_picture + '"></div><div class="col-sm-8 col-md-10">  <p align="justify"><h4> ' + title + '</h4></p>  </div></div></a><hr>');
                llamaEqualizer('#EqualizeImage_' + item._id);
            });

            $.each(data.data.ingredients, function (i, item) {
                var title = '';
                if (GlobalLang == 'EN') {
                    title = item.ingredient_EN
                } else {
                    title = item.ingredient_ES
                }
                $('#SearchF_ing2').append('<a href="/ingredient/' + item._id + '"><div class="row "><div class="col-sm-4 col-md-2"><img  id="EqualizeImage_' + item._id + '"   class=" lnx_eqlzr-square image  " src="' + item.img_url + '"></div><div class="col-sm-8 col-md-10">  <p align="justify"><h4> ' + title + '</h4></p>  </div></div></a><hr>');
                llamaEqualizer('#EqualizeImage_' + item._id);
            });

            $.each(data.data.Articles, function (i, item) {
                var title = '';
                if (GlobalLang == 'ES') {
                    title = item.article_ES
                } else {
                    title = item.article_EN
                }

                $('#SearchF_articles2').append('<a href="/article/' + item._id + '"><div class="row "><div class="col-sm-2"><img width="100px"  class=" img img-fluid  " src="' + item.thumbnail + '"></div><div class="col-sm-10"> <p align="justify"> ' + title + '</p>  </div></div></a>');
            });


            $.each(data.data.noses, function (i, item) {
                var title = '';
                if (GlobalLang == 'EN') {
                    title = item.nose_EN
                } else {
                    title = item.nose_ES
                }
                $('#SearchF_noses2').append('<a href="/nose/' + item._id + '"><div class="row "><div class="col-sm-4 col-md-2"><img  id="EqualizeImage_' + item._id + '"  class=" lnx_eqlzr-square image  " src="' + item.img_url + '"></div><div class="col-sm-8 col-md-10">  <p align="justify"><h4> ' + title + '</h4></p>  </div></div></a><hr>');
                llamaEqualizer('#EqualizeImage_' + item._id);
            });
            $.each(data.data.Brands, function (i, item) {
                var title = '';
                if (GlobalLang == 'EN') {
                    title = item.brand_EN
                } else {
                    title = item.brand_ES
                }
                $('#SearchF_brands2').append('<a href="/brand/' + item._id + '"><div class="row "><div class="col-sm-4 col-md-2"><img  id="EqualizeImage_' + item._id + '" class=" lnx_eqlzr-square image  " src="' + item.img_url + '"></div><div class="col-sm-8 col-md-10">  <p align="justify"><h4> ' + title + '</h4></p>  </div></div></a><hr>');
                llamaEqualizer('#EqualizeImage_' + item._id);
            });
            $.each(data.data.Products, function (i, item) {
                var title = '';
                if (GlobalLang == 'EN') {
                    title = '<br><a href="/brand/' + item.brand._id + '"><h4>' + item.brand.brand_EN + '</h4></a>' + '<a href="/product/' + item._id + '"><h2>' + item.product_EN + '</h2></a>'
                } else {
                    title = '<br><a href="/brand/' + item.brand._id + '"><h4>' + item.brand.brand_ES + '</h4></a>' + '<a href="/product/' + item._id + '"><h2>' + item.product_ES + '</h2></a>'
                }
                $('#SearchF_prod2').append('<div class="row searchElementRow"><div class="col-sm-2"> <a href="/product/' + item._id + '"> <img width="100px"  class=" img img-fluid  " src="' + item.img_url + '"></a></div><div class="col-sm-10">  ' + title + ' </div></div><hr class="noMargin">');
            });
        }
    }).fail(function (err) {
        console.error(err);
    });


}


$(document).ready(function () {

    $('#_SP_INGREDIENTS').hide();
    $('#_SP_BRANDS').hide();
    $('#_SP_PRODUCTS').hide();
    $('#_SP_NOSES').hide();
    $('#_SP_USERS').hide();
    $('#_SP_POSTS').hide();
    $('#_SP_ARTICLES').hide();

    if (localStorage.getItem('SJFinder')) {
        $('#unfindermore').val(localStorage.getItem('SJFinder'))
        MrFinder2(localStorage.getItem('SJFinder'));
    }



    $('.SelectorS2').click(function () {



        genders2 = [];
        if ($('#SwitchFemale2').prop('checked')) {
            genders2.push('F');
        }
        if ($('#SwitchMale2').prop('checked')) {
            genders2.push('M');
        }
        if ($('#SwitchUnisex2').prop('checked')) {
            genders2.push('U');
        }
        var find = $('#unfindermore').val();
        localStorage.setItem('SJFinder', find)
        if (find.length > 1) {
            MrFinder2(find);
        }
    })




    $('#unfindermore').keyup(function () {
        var find = $(this).val();
        localStorage.setItem('SJFinder', find)
        if (find.length > 1) {
            MrFinder2(find);
        }
    });
})