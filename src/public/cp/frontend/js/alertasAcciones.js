
var SJ_POST_USER = {};
var GlobalLang = 'ES';

var Activado = true;


var counter_S = {
    comments: 0,
    replys: 0,
    follow: 0,
    likes: 0,
    agra: 0,
    notif: 0
}

$(document).ready(function () {

    $(document.body).on('click', '.Thanks_', function () {
        var from = $(this).attr('from')
        var to = $(this).attr('to');
        var xclose = $(this).val();
        alertT_(5, from, to, false);
        $('#forclosingX_' + xclose).click();
    });

    $('#massiveSendTextBTN').click(function () {
        var TT = $('#massiveSendText').val();
        $('._MassiveResponseCommentText').val(TT)
        $('._MassiveResponseComment').click()
        $('#massiveSendText').val('')
    })

    $('#massiveSendTextBTNRSP').click(function () {
        var TT = $('#massiveSendTextRSP').val();
        $('._MassiveResponseCommentTextRSP').val(TT)
        $('._MassiveResponseCommentRSP').click()
        $('#massiveSendTextRSP').val('')
    })
    $('#massiveSendThanks_').click(function () {
        $('.massiveThanks_').click()
    })

    $('#massiveFollwos_').click(function () {
        $('.followMAssive__').click()
    })




    $(document.body).on('click', '.followthis_', function () {

        var url = '/api/actions/follow'
        var from = $(this).attr('from');
        var to = $(this).attr('to');
        var values = $(this).val();

        var data = {
            "loguser": from,
            "to_follow": to
        }
        $.post(url, data, function (data) {
            if (data.success) {
                alertT_(3, from, to, false)
                $('#forclosing_' + values).click();
            }
        })
    });


    $(document).on('click', '.deletethis_', function () {
        var del = $(this).val();
        $.ajax({
            url: '/api/useralert/' + del,
            method: 'DELETE'
        }).done(function (data) {

        }).fail(function (err) {
            console.error(err)
        })
    })

    var SaveReply = function (idParent) {
        var alerto = $('#E_Comment_' + idParent).attr('alerto')
        var postID = $('#E_Comment_' + idParent).attr('pid')
        var prodId = $('#E_Comment_' + idParent).attr('prodId')

        var msg = $('#E_Comment_' + idParent).val();

        if (!msg || msg == '') {
            return 0;
        }

        var uname = ''
        if ($('#E_Comment_' + idParent).attr('username')) {
            uname = $('#E_Comment_' + idParent).attr('username')
            msg = '@' + uname + ' ' + msg + ' ';
        }





        $.post('/api/reply', {
            user: SJ_SESSION._id,
            post: postID,
            product: prodId,
            reply: remove_Html_tags(msg),
            comment: idParent
        }, function (data) {
            if (data.success) {

                $('#EmojiTab_' + idParent).hide()
                $('#E_Comment_' + idParent).val('')
                $('#eliminate_' + idParent).click();

                alertT_(2, SJ_SESSION._id, alerto, remove_Html_tags(msg), postID, idParent);
            }
        });

    }

    var llamaAlertas = function () {
        if (!Activado) {
            return 0;
        }
        SJ_SESSION = SJ_POST_USER;
        $('#Alertas_Comentarios_').html('');
        $('#Alertas_Respuestas_').html('');
        $('#Alertas_Follow_').html('');
        $('#Alertas_LikesPost_').html('');
        $('#Alertas_Agradecio_').html('');
        $('#Alertas_Notificaciones_').html('');

        counter_S = {
            comments: 0,
            replys: 0,
            follow: 0,
            likes: 0,
            agra: 0,
            notif: 0
        }

        $.get('/api/useralert', {
            strictsearch: {
                to: SJ_POST_USER._id
            }
        }, function (data) {
            if (data.success) {
                //$('#todasAlertas_').html('');
                var extra = data.extra;
                $.each(data.data, function (i, item) {
                    switch (item.kind) {
                        case 1: //Comento en tu post
                            counter_S.comments++;
                            var txttitle = ''
                            var txtcopy = ''
                            var pic = ''
                            if (item.ref_post.isReply) {
                                txtcopy = item.ref_post.copy;
                                txttitle = item.ref_post.copy_title;
                            } else {
                                if (GlobalLang == 'ES') {
                                    txtcopy = item.ref_post.description_ES;
                                    txttitle = item.ref_post.post_ES;
                                } else {
                                    txtcopy = item.ref_post.description_EN;
                                    txttitle = item.ref_post.post_EN;
                                }
                            }
                            if (item.ref_post.origin != 3) {
                                pic = item.ref_post.thumbnail
                            } else {
                                pic = '/cdn/assets/f/images/YAAFLEX.png'
                            }


                            $('#Alertas_Comentarios_').append('<div class="alert alert-dismissible alert-info"><button id="eliminate_' + item.parent_comment._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">X</button>' +
                                '<br>' + extra[i].date_posted + '<hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + pic + '" class="img img-fuid img-thumbnail"> </center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<br>' +
                                '<a href="/user/' + item.from.username + '">' + item.from.username + '</a> comentó ' +
                                '  <h5>"' + (item.comment) + '...' + '"</h5>' +
                                'en tu post' +
                                '<a href="/post/' + item.ref_post._id + '"> ' +
                                txttitle +
                                '</a>' +
                                '<hr>' +

                                '<div  class="row" >' +
                                '   <div class="col-sm-8 " >' +
                                '           <input username="' + item.from.username + '" prodId="' + item.ref_post.product + '" pid="' + item.ref_post._id + '" alerto="' + item.from._id + '" refid="' + item.parent_comment._id + '" class="form-control _MassiveResponseCommentText" type="text" placeholder="Responder... " id="E_Comment_' + item.parent_comment._id + '">' +
                                '   </div>' +
                                '   <div class="col-sm-4 " >' +
                                '           <button class="btn btn-primary btn-block" id="ActionToggleBtn_' + item.parent_comment._id + '">' +
                                '                 emoticon' +
                                '           </button>' +
                                '           <button  username="' + item.from.username + '" prodId="' + item.ref_post.product + '"  pid="' + item.ref_post._id + '" alerto="' + item.from._id + '" class="btn btn-block btn-success _MassiveResponseComment" value="' + item.parent_comment._id + '" id="SaveComent_' + item.parent_comment._id + '"> Enviar</button>' +

                                '   </div>' +
                                '</div>' +

                                '<hr><div   class="row" >' +
                                '   <div   class="col-sm-12" >' +
                                '       <div id="EmojiTab_' + item.parent_comment._id + '" style="display:none">' +
                                '       </div>' +
                                '   </div>' +

                                '</div>' +




                                '</div>' +
                                '</div>' +
                                '</div>');

                            $('#ActionToggleBtn_' + item.parent_comment._id).click(function () {
                                $('#EmojiTab_' + item.parent_comment._id).slideToggle({ duration: 1000 });
                            });
                            llenaEmojiTab('#EmojiTab_' + item.parent_comment._id, '#E_Comment_' + item.parent_comment._id);
                            $('#SaveComent_' + item.parent_comment._id).click(function () {
                                var Value = $(this).val();
                                SaveReply(Value);
                            })
                            $('#E_Comment_' + item.parent_comment._id).keypress(function (e) {
                                var Value = $(this).attr('refid');
                                if (e.which == 13) {
                                    SaveReply(Value);
                                    return false;
                                }
                            });



                            break;
                        case 2://respondio en tu commentario
                            counter_S.replys++;
                            var txttitle = ''
                            var txtcopy = ''
                            var pic = ''
                            if (item.ref_post.isReply) {
                                txtcopy = item.ref_post.copy;
                                txttitle = item.ref_post.copy_title;
                            } else {
                                if (GlobalLang == 'ES') {
                                    txtcopy = item.ref_post.description_ES;
                                    txttitle = item.ref_post.post_ES;
                                } else {
                                    txtcopy = item.ref_post.description_EN;
                                    txttitle = item.ref_post.post_EN;
                                }
                            }
                            if (item.ref_post.origin != 3) {
                                pic = item.ref_post.thumbnail
                            } else {
                                pic = '/cdn/assets/f/images/YAAFLEX.png'
                            }


                            $('#Alertas_Respuestas_').append('<div class="alert alert-dismissible alert-info"><button id="eliminate_' + item.parent_comment._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">X</button>' +
                                '<br>' + extra[i].date_posted + '<hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + pic + '" class="img img-fuid img-thumbnail"> </center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<br>' +
                                '<a href="/user/' + item.from.username + '">' + item.from.username + '</a>' +
                                ' Respondio' + '  <h5>"' + (item.comment) + '...' + '"</h5>' +
                                'En el post ' +
                                '<a href="/post/' + item.ref_post._id + '"> ' +
                                txttitle +
                                '</a>' +
                                '<hr>' +




                                '<div  class="row" >' +
                                '   <div class="col-sm-8 " >' +
                                '           <input username="' + item.from.username + '" prodId="' + item.ref_post.product + '" pid="' + item.ref_post._id + '" alerto="' + item.from._id + '" refid="' + item.parent_comment._id + '" class="form-control _MassiveResponseCommentTextRSP" type="text" placeholder="Responder... " id="E_Comment_' + item.parent_comment._id + '">' +
                                '   </div>' +
                                '   <div class="col-sm-4 " >' +
                                '           <button class="btn btn-primary btn-block" id="ActionToggleBtn_' + item.parent_comment._id + '">' +
                                '                 emoticon' +
                                '           </button>' +
                                '           <button  username="' + item.from.username + '" prodId="' + item.ref_post.product + '"  pid="' + item.ref_post._id + '" alerto="' + item.from._id + '" class="btn btn-block btn-success _MassiveResponseCommentRSP " value="' + item.parent_comment._id + '" id="SaveComent_' + item.parent_comment._id + '"> Enviar</button>' +

                                '   </div>' +
                                '</div>' +

                                '<hr><div   class="row" >' +
                                '   <div   class="col-sm-12" >' +
                                '       <div id="EmojiTab_' + item.parent_comment._id + '" style="display:none">' +
                                '       </div>' +
                                '   </div>' +

                                '</div>' +




                                '</div>' +
                                '</div>' +
                                '</div>');

                            $('#ActionToggleBtn_' + item.parent_comment._id).click(function () {
                                $('#EmojiTab_' + item.parent_comment._id).slideToggle({ duration: 1000 });
                            });
                            llenaEmojiTab('#EmojiTab_' + item.parent_comment._id, '#E_Comment_' + item.parent_comment._id);
                            $('#SaveComent_' + item.parent_comment._id).click(function () {
                                var Value = $(this).val();
                                SaveReply(Value);
                            })
                            $('#E_Comment_' + item.parent_comment._id).keypress(function (e) {
                                var Value = $(this).attr('refid');
                                if (e.which == 13) {
                                    SaveReply(Value);
                                    return false;
                                }
                            });
                            break;


                        case 3: // follows 
                            counter_S.follow++;

                            $.getJSON('/api/actions/following/' + item.to._id, {}, function (dat) {
                                var losigo = false;
                                var lineaSocial = '';
                                if (dat.success) {
                                    $.each(dat.data, function (j, jtem) {
                                        var elem = jtem.user_id;
                                        if (elem.facebook_uri) {
                                            lineaSocial = lineaSocial + '<a href="' + elem.facebook_uri + '" target="_blank"><i class="fab fa-facebook"></i></a>'
                                        }
                                        if (elem.instagram_uri) {
                                            lineaSocial = lineaSocial + '<a href="' + elem.instagram_uri + '" target="_blank"><i class="fab fa-instagram"></i></a>'
                                        }
                                        if (elem.twitter_uri) {
                                            lineaSocial = lineaSocial + '<a href="' + elem.twitter_uri + '" target="_blank"><i class="fab fa-twitter"></i></a>'
                                        }
                                        if (elem.youtube_uri) {
                                            lineaSocial = lineaSocial + '<a href="' + elem.youtube_uri + '" target="_blank"><i class="fab fa-youtube"></i></a>'
                                        }

                                        if (item.from && elem._id === item.from._id) {
                                            console.log('entratrue', item.from, elem._id)
                                            losigo = true;
                                        }
                                    })

                                }
                                console.log('losigofinal', losigo)
                                if (losigo) {
                                    $('#Alertas_Follow_').append('<div class="alert alert-dismissible alert-info">' +

                                        '<button id="forclosing_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">X</button>' +

                                        '<br>' + extra[i].date_posted + '<hr>' +
                                        '<div class="row">' +
                                        '<div class="col-sm-3">' +
                                        '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                        '</div>' +
                                        '<div class="col-sm-9">' +
                                        '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +
                                        '<br>' + lineaSocial +
                                        '<h5>Comenzo a seguirte </h5>' +

                                        '</div>' +
                                        '</div>' +
                                        '</div>');
                                } else {
                                    $('#Alertas_Follow_').append('<div class="alert alert-dismissible alert-info">' +

                                        '<button id="forclosing_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">X</button>' +

                                        '<br>' + extra[i].date_posted + '<hr>' +
                                        '<div class="row">' +
                                        '<div class="col-sm-3">' +
                                        '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                        '</div>' +
                                        '<div class="col-sm-9">' +
                                        '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +
                                        '<br>' + lineaSocial +
                                        '<h5>Comenzo a seguirte</h5>' +

                                        '<p align="right"><button to="' + item.from._id + '" from="' + item.to._id + '" value="' + item._id + '" class=" followMAssive__ followthis_ btn btn-primary" type="button" > Seguir tambien </button></p>' +

                                        '</div>' +
                                        '</div>' +
                                        '</div>');
                                }

                            });


                            break;
                        case 4:// gusto tu pub
                            counter_S.likes++;
                            var txttitle = ''
                            var txtcopy = ''
                            var pic = ''
                            if (item.ref_post.isReply) {
                                txtcopy = item.ref_post.copy;
                                txttitle = item.ref_post.copy_title;
                            } else {
                                if (GlobalLang == 'ES') {
                                    txtcopy = item.ref_post.description_ES;
                                    txttitle = item.ref_post.post_ES;
                                } else {
                                    txtcopy = item.ref_post.description_EN;
                                    txttitle = item.ref_post.post_EN;
                                }
                            }
                            if (item.ref_post.origin != 3) {
                                pic = item.ref_post.thumbnail
                            } else {
                                pic = '/cdn/assets/f/images/YAAFLEX.png'
                            }

                            $('#Alertas_LikesPost_').append('<div class="alert alert-dismissible alert-info">' +
                                '<button id="forclosingX_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">X</button>' +
                                '<br>' + extra[i].date_posted + '<hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +

                                '<h5>Le gusto tu publicacion</h5>' +
                                '<a  targe="_blank" href="/post/' + item.ref_post._id + '">' + txttitle + '</a>' +
                                '<br><img  width="100px" class="img img-responsive img-thumbnail" src="' + pic + '">' +
                                '<p align="right"><button to="' + item.from._id + '" from="' + item.to._id + '" value="' + item._id + '" class=" massiveThanks_ Thanks_ btn btn-primary" type="button" > Agradecer</button></p>' +

                                '</div>' +
                                '</div>' +
                                '</div>');



                            break;
                        case 5:// te agradecio
                            counter_S.agra++;
                            $('#Alertas_Agradecio_').append('<div class="alert alert-dismissible alert-info">' +
                                '<button id="forc_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">X</button>' +
                                '<br>' + extra[i].date_posted + '<hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +

                                '<h5>Te agradecio</h5>' +

                                '</div>' +
                                '</div>' +
                                '</div>');

                            break;
                        case 7:// simple notificacion
                            counter_S.notif++;
                            $('#Alertas_Notificaciones_').append('<div class="alert alert-dismissible alert-info">' +
                                '<button id="forclo_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">X</button>' +
                                '<br>' + extra[i].date_posted + '<hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +

                                '<h5>Contenido de la notificacion que se envio a tu correo.</h5>' +
                                '<p>' + item.comment + '</p>' +

                                '</div>' +
                                '</div>' +
                                '</div>');

                            break;
                    }
                    //txt_on_the_post
                });
            }


            $('#countComments').text(counter_S.comments);
            $('#countResponses').text(counter_S.replys);
            $('#countFollos').text(counter_S.follow);
            $('#countLikes').text(counter_S.likes);
            $('#countAgradecimientos').text(counter_S.agra);
            $('#countNotificaciones').text(counter_S.notif);



        }).fail(function (err) {
            console.error(err);
        })

    }

    $.ajax({
        url: "/api/config",
        method: 'GET'
    }).done(function (data) {
        if (data.success && data.data._IDuserScentJourney) {
            SJ_POST_USER = data.data._IDuserScentJourney;
            llamaAlertas();
        }
        else {
            Activado = false;
            alertify.error('No se ha configurado el usuario');
        }
    }).fail(function (errn) {
        alertify.error('Ocurrio un error  // An error have been ocurred');
        console.error(errn);
    });


    setInterval(llamaAlertas, 1000 * 30);

});