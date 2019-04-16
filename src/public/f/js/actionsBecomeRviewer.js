GlobalLang = 'EN';

if (getCookie('SJ_lang_client')) {
    GlobalLang = getCookie('SJ_lang_client');
}
else {
    GlobalLang = 'EN';
    setCookie('SJ_lang_client', 'EN');
}




$('#SendRquest').click(function () {
    var fullName = $('#B_R_Full_Name').val();
    var email = $('#B_R_email').val();
    var why = $('#B_R_whyc').val();
    var example = $('#B_R_example').val();
    var phone = $('#B_R_phone').val();
    var complement = $('#complementRequest').val();


    if (fullName == '' || email == "" || why == '' || example == '' || phone == '' || complement == '') {
        return 0;
    }

    var html = '<br>El usuario  <b>' + fullName + '</b> con el ID : <b> ' + SJ_SESSION._id + '</b>' +
        '<br>Solicita convertirse en  reviewer.' +
        '<br>Email: <b>' + email + '</b>' +
        '<br>Porque desea ser reviewer?: <b>' + why + '</b>' +
        '<br>Ejemplo de su contenido: <a href="' + example + '" target="_blank">' + example + '</a>' +
        '<br>Telefono de contacto: <b>' + phone + '</b>' +
        '<br> <b>Descripcion del usuario :</b>  <br>' + complement;

    $.post('/api/email', {
        "to": SJ_NOTIF_MAIL,
        "subject": 'ScentJourney - Notificación de ' + fullName + '  para convertirse en Colaborador',
        "text": html,
    }, function (data) {
        if (data.success) {
            $('#ThnksNotifyRequest').modal('show');
            alertT_(7, SJ_SESSION._id, SJ_POST_USER._id, html)
        }
        $('#myDataModalRequest').modal('hide');
    }).fail(function (err) {
        console.error(err)
        $('#myDataModalRequest').modal('hide');
    })


})

$('#openModalREQUEST_REVWR').click(function () {
    $('#myDataModalRequest').modal('show');

    $('#B_R_Full_Name').val('');
    $('#B_R_email').val('');
    $('#B_R_whyc').val('');
    $('#B_R_example').val('');
    $('#B_R_phone').val('');
    $('#complementRequest').val('');
})
$('#CancelRequest').click(function () {
    $('#myDataModalRequest').modal('hide');
})
$('#CloseThanksRequest').click(function () {
    $('#ThnksNotifyRequest').modal('hide');
})




if (SJ_SESSION && SJ_SESSION._id && SJ_SESSION.rieviewer == false) {
    $('#levantRequest_').show();
}

