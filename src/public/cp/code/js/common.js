
SummerOptions = {
    lang: lx_i18n.config_sn_lang,
    height: 300,
    toolbar: [

        ['fontname', ['fontname']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['type', 'strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'hr']],
        ['misc', ['fullscreen', 'undo', 'redo', 'codeview']],
        ['insert', ['picture', 'link', 'video', 'table', 'hr']]

    ],
    placeholder: lx_i18n.config_sn_placeholder
};

HoldOptions = {
    theme: "sk-circle",
    message: 'Espere... ',
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
}

DT_Lang = lxDatatableLanguaje(lx_i18n.config_datatables_lang);

var initializeSMImage = function () {
    $('.note-image-input').hide();
    $('.note-image-input').parent().append('<input type="file"  class="note-new-upload-lx">');
    $('.note-new-upload-lx').change(function () {
        if ($(this).val() == '') {
            return 0;
        }
        HoldOn.open(HoldOptions);
        var data = new FormData();
        data.append('Summernote', $(this)[0].files[0]);
        $.ajax({
            url: '/upload',
            data: data,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function (data) {
                HoldOn.close();
                if (data.success) {
                    $('.note-image-url').val(data.file)
                    $('.note-image-btn').prop('disabled', false)
                    $(this).val('')
                }
            },
            error: function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            }
        });

    })
}