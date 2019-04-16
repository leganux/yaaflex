$('#summernote_ES').summernote(SummerOptionsES);
$('#summernote_EN').summernote(SummerOptionsEN);

$('#summernote_priv_EN').summernote(SummerOptionsEN);
$('#summernote_priv_ES').summernote(SummerOptionsES);
$('#summernote_term_ES').summernote(SummerOptionsES);
$('#summernote_term_EN').summernote(SummerOptionsEN);
$('#summernote_faq_EN').summernote(SummerOptionsEN);
$('#summernote_faq_ES').summernote(SummerOptionsES);
$('#summernote_become_EN').summernote(SummerOptionsEN);
$('#summernote_become_ES').summernote(SummerOptionsES);


$('#summernote_who_ES').summernote(SummerOptionsESimg);
$('#summernote_who_EN').summernote(SummerOptionsENimg);


var UPDTAE = '';

$('#save_about').click(function () {
    var data = {}

    if ($('#txt_username_Id').val() !== '') {
        data._IDuserScentJourney = $('#txt_username_Id').val()
    }


    if (!$('#summernote_who_ES').summernote('isEmpty')) {
        data.whoiam_es = $('#summernote_who_ES').summernote('code')
    }
    if (!$('#summernote_who_EN').summernote('isEmpty')) {
        data.whoiam_en = $('#summernote_who_EN').summernote('code')
    }




    if (!$('#summernote_ES').summernote('isEmpty')) {
        data.about_me_es = $('#summernote_ES').summernote('code')
    }
    if (!$('#summernote_EN').summernote('isEmpty')) {
        data.about_me_en = $('#summernote_EN').summernote('code')
    }
    if (!$('#summernote_priv_EN').summernote('isEmpty')) {
        data.priv_en = $('#summernote_priv_EN').summernote('code')
    }
    if (!$('#summernote_priv_ES').summernote('isEmpty')) {
        data.priv_es = $('#summernote_priv_ES').summernote('code')
    }
    if (!$('#summernote_term_ES').summernote('isEmpty')) {
        data.terms_es = $('#summernote_term_ES').summernote('code')
    }
    if (!$('#summernote_term_EN').summernote('isEmpty')) {
        data.terms_en = $('#summernote_term_EN').summernote('code')
    }
    if (!$('#summernote_faq_EN').summernote('isEmpty')) {
        data.faq_en = $('#summernote_faq_EN').summernote('code')
    }
    if (!$('#summernote_faq_ES').summernote('isEmpty')) {
        data.faq_es = $('#summernote_faq_ES').summernote('code')
    }
    if (!$('#summernote_become_EN').summernote('isEmpty')) {
        data.become_en = $('#summernote_become_EN').summernote('code')
    }
    if (!$('#summernote_become_ES').summernote('isEmpty')) {
        data.become_es = $('#summernote_become_ES').summernote('code')
    }


    if ($('#img_thumb_save').val() != '') {
        data.whoiam_img = $('#img_thumb_save').val()
    }

    HoldOn.open(HoldOptions);
    $.ajax({
        url: "/api/config/" + UPDTAE,
        method: "PUT",
        data: data
    }).done(function (data) {
        HoldOn.close();
        if (data.success == true) {

            UPDTAE = data._id;
            traedatos();

        }
    }).fail(function (err) {
        HoldOn.close();
        alertify.error('Ocurrio un error  // An error have been ocurred');
        console.error(err);
    });


})

function traedatos() {
    HoldOn.open(HoldOptions);
    $.ajax({
        url: "/api/config",
    }).done(function (data) {
        HoldOn.close();
        if (data.success == true) {
            data = data.data;
            if (data._IDuserScentJourney && data._IDuserScentJourney._id) {
                var str = data._IDuserScentJourney._id;
                str = str.toString();
                $('#txt_username_Id').val(str)

            }

            $('#summernote_ES').summernote('code', data.about_me_es ? data.about_me_es : "")
            $('#summernote_EN').summernote('code', data.about_me_en ? data.about_me_en : "")
            $('#summernote_priv_EN').summernote('code', data.priv_en ? data.priv_en : "")
            $('#summernote_priv_ES').summernote('code', data.priv_es ? data.priv_es : "")

            $('#summernote_term_ES').summernote('code', data.terms_es ? data.terms_es : "")
            $('#summernote_term_EN').summernote('code', data.terms_en ? data.terms_en : "")

            $('#summernote_faq_EN').summernote('code', data.faq_en ? data.faq_en : "")
            $('#summernote_faq_ES').summernote('code', data.faq_es ? data.faq_es : "")

            $('#summernote_become_EN').summernote('code', data.become_en ? data.become_en : "")
            $('#summernote_become_ES').summernote('code', data.become_es ? data.become_es : "")

            $('#summernote_who_EN').summernote('code', data.whoiam_en ? data.whoiam_en : "")
            $('#summernote_who_ES').summernote('code', data.whoiam_es ? data.whoiam_es : "")

            UPDTAE = data._id;

        }
    }).fail(function (err) {
        HoldOn.close();
        alertify.error('Ocurrio un error  // An error have been ocurred');
        console.error(err);
    });

}

$('.note-image-input').hide();

traedatos();


$('#img_').change(function () {
    if (ValidateFile($(this))) {
        HoldOn.open(HoldOptions);
        var data = new FormData();
        data.append('Config_image', $('#img_')[0].files[0]);
        $.ajax({
            url: '/upload/image',
            data: data,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function (data) {
                HoldOn.close();
                if (data.success) {
                    $('#img_save').val(data.file);
                    $('#img_').val('');
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



$('#img_thumb').change(function () {
    if (ValidateFile($(this))) {
        HoldOn.open(HoldOptions);
        var data = new FormData();
        data.append('Config_image', $('#img_thumb')[0].files[0]);
        $.ajax({
            url: '/upload/image',
            data: data,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function (data) {
                HoldOn.close();
                if (data.success) {
                    $('#img_thumb_save').val(data.file);
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