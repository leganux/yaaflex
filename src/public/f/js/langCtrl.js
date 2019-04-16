GlobalLang = 'EN';
var genders = ['F', 'M', 'U'];

$(document).ready(function () {
    if (getCookie('SJ_lang_client')) {
        GlobalLang = getCookie('SJ_lang_client');
    }
    else {
        GlobalLang = 'EN';
        setCookie('SJ_lang_client', 'EN');
    }
    RdrawText(GlobalLang);

    $('#LangToEs').click(function () {
        setCookie('SJ_lang_client', 'ES');
        window.location.reload();
    });
    $('#LangToEn').click(function () {
        setCookie('SJ_lang_client', 'EN');
        window.location.reload();
    });

    var isInChange = false;

    $('.SelectorS').focus(function () {
        $(".SearchSpace").show();
        isInChange = true;
    })
    $('.SelectorS').click(function () {
        $(".SearchSpace").show();
        isInChange = true;

        genders = [];
        if ($('#SwitchFemale').prop('checked')) {
            genders.push('F');
        }
        if ($('#SwitchMale').prop('checked')) {
            genders.push('M');
        }
        if ($('#SwitchUnisex').prop('checked')) {
            genders.push('U');
        }
        var find = $('#GlobalSearch_').val();
        localStorage.setItem('SJFinder', find)
        if (find.length > 1) {
            MrFinder(find);
        }
    })


    $('#GlobalSearch_').keyup(function () {
        var find = $(this).val();
        localStorage.setItem('SJFinder', find)
        if (find.length > 1) {
            $(".SearchSpace").slideDown("700");
            MrFinder(find);
        } else {
            $(".SearchSpace").slideUp("700");
        }
    });

    $('#GlobalSearch_').focusout(function () {
        setTimeout(function () {
            if (!isInChange) {
                $(".SearchSpace").slideUp("700");
            }
            isInChange = false;
        }, 300);
    });

    $('.SelectorS').focusout(function () {
        setTimeout(function () {
            if (!isInChange) {
                $(".SearchSpace").slideUp("700");
            }
            isInChange = false;
        }, 300);
    });

    $('#SJ_StartLogin_').click(function () {
        $('#ModalLogin_').modal('show')
    })





});

var MrFinder = function (val) {

    $('#SearchF_posts').html('');
    $('#SearchF_ing').html('');
    $('#SearchF_brands').html('');
    $('#SearchF_prod').html('');
    $('#SearchF_noses').html('');
    $('#SearchF_articles').html('');

    $('#SearchF_users').html('');


    //all 
    $.ajax({
        url: "/finder",
        dataType: 'json',
        data: {
            find: val,
            genders
        }
    }).done(function (data) {
        if (data.success == true) {

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

                $('#SearchF_posts').append('<a href="/post/' + item._id + '"><div class="row searchElementRow"><div class="col-sm-2"><img width="50px"  class=" img img-fluid  " src="' + img + '"></div><div class="col-sm-10"> <p align="justify"> ' + title + '</p>  </div></div></a>');
            });

            $.each(data.data.Users, function (i, item) {
                var title = item.username;

                $('#SearchF_users').append('<a href="/user/' + title + '"><div class="row searchElementRow"><div class="col-sm-2"><img width="100px"  class=" img img-fluid  " src="' + item.provider_picture + '"></div><div class="col-sm-10"> <p align="justify"> ' + title + '</p>  </div></div></a>');
            });

            $.each(data.data.Articles, function (i, item) {
                var title = '';
                if (GlobalLang == 'ES') {
                    title = item.article_ES
                } else {
                    title = item.article_EN
                }

                $('#SearchF_articles').append('<a href="/article/' + item._id + '"><div class="row searchElementRow"><div class="col-sm-2"><img width="100px"  class=" img img-fluid  " src="' + item.thumbnail + '"></div><div class="col-sm-10"> <p align="justify"> ' + title + '</p>  </div></div></a>');
            });

            $.each(data.data.ingredients, function (i, item) {
                var title = '';
                if (GlobalLang == 'EN') {
                    title = item.ingredient_EN
                } else {
                    title = item.ingredient_ES
                }
                $('#SearchF_ing').append('<a href="/ingredient/' + item._id + '"><div class="row searchElementRow"><div class="col-sm-2"><img width="100px"  class=" img img-fluid  " src="' + item.img_url + '"></div><div class="col-sm-10"> <p align="justify"> ' + title + '</p>  </div></div></a>');
            });



            $.each(data.data.noses, function (i, item) {
                var title = '';
                if (GlobalLang == 'EN') {
                    title = item.nose_EN
                } else {
                    title = item.nose_ES
                }
                $('#SearchF_noses').append('<a href="/nose/' + item._id + '"><div class="row searchElementRow"><div class="col-sm-2"><img width="100px"  class=" img img-fluid  " src="' + item.img_url + '"></div><div class="col-sm-10"> <p align="justify"> ' + title + '</p>  </div></div></a>');
            });
            $.each(data.data.Brands, function (i, item) {
                var title = '';
                if (GlobalLang == 'EN') {
                    title = item.brand_EN
                } else {
                    title = item.brand_ES
                }
                $('#SearchF_brands').append('<a href="/brand/' + item._id + '"><div class="row searchElementRow"><div class="col-sm-2"><img width="100px"  class=" img img-fluid  " src="' + item.img_url + '"></div><div class="col-sm-10"> <p align="justify"> ' + title + '</p>  </div></div></a>');
            });
            $.each(data.data.Products, function (i, item) {
                var title = '';
                if (GlobalLang == 'EN') {
                    title = '<br><a href="/brand/' + item.brand._id + '"><h4>' + item.brand.brand_EN + '</h4></a>' + '<a href="/product/' + item._id + '"><h2>' + item.product_EN + '</h2></a>'
                } else {
                    title = '<br><a href="/brand/' + item.brand._id + '"><h4>' + item.brand.brand_ES + '</h4></a>' + '<a href="/product/' + item._id + '"><h2>' + item.product_ES + '</h2></a>'
                }
                $('#SearchF_prod').append('<div class="row searchElementRow"><div class="col-sm-2"> <a href="/product/' + item._id + '"> <img width="100px"  class=" img img-fluid  " src="' + item.img_url + '"></a></div><div class="col-sm-10">  ' + title + ' </div></div><hr class="noMargin">');
            });
        }
    }).fail(function (err) {
        console.error(err);
    });


}

var RdrawText = function (lang) {
    return true;
}





$(document).on('change', '#logeableSS_', function () {
    var chk = $('#logeableSS_').prop('checked');
    if (chk) {
        $('#LoginHide').show()
    } else {
        $('#LoginHide').hide()
    }
})